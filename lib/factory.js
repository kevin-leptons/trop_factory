const {AsyncQueue, error} = require('@trop/gear')
const {find_cycles, DirectedGraph} = require('@trop/graph')
const {TaskExecutor} = require('@trop/engine')

const Config = require('./config')
const IService = require('./i_service')

class Factory {
    // Description
    // * A way to define and initialize services with dependency, in parallel
    //
    // Input
    // * types / Array<IService> / [] - List of service types
    // * conf / Config - It contains primitive configurations for other
    //   services
    // * size / Number / 8 - Number of initialization at the same time
    //
    // Exception
    // * TypeError - Conf must be an instance of Config
    // * TypeError - Services must be an instance of Array
    // * TypeError - A service must be an implement of IService
    // * TypeError - Size must be a possitive integer
    // * Conflict - Duplicated service
    // * Conflict - Duplicated dependency
    // * InfiniteLoop - There is cycle dependency between services
    constructor(types, conf=new Config(), size=8) {
        this._verify_constructor_input(types, conf, size)
        this._conf = conf
        this._size = size
        this._types = [...types, Config]

        this._build_service_type_graph()
    }

    // Description
    // * Start to initialize services
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    async open() {
        this._instances = new Map([
            [Config, this._conf]
        ])
        if (this._types.length === 1) {
            return
        }

        let ready_types = new AsyncQueue([], this._types.length)
        let executor = new TaskExecutor(this._size)

        await this._index_service_graph(this._instances, ready_types)
        this._pending_count = this._types.length - ready_types.size - this._instances.size

        this._setup_executor_event(executor, this._instances, ready_types)
        await this._pop_ready_types(ready_types, executor, this._instances)
        await executor.finish()

        if (this._open_error) {
            throw this._open_error
        }
    }

    // Description
    // * Do not allow perform operations on hub anymore
    // * Close all of services
    //
    // Input - none
    //
    // Output
    // * Promise<undefined>
    async close() {
        for (let instance of this._instances.values()) {
            await instance.close()
        }
    }

    // Description
    // * Retrieve an instance of service from hub
    // * It returns the same instance of service for all of request
    //
    // Input
    // * service_type / IService - Type of service
    //
    // Output
    // * IService - Instance of service
    get(service_type) {
        return this._instances.get(service_type)
    }

    // PRIVATE MEMBERS

    // Description
    // * Verify constructor input
    //
    // Input - It is similar like input of constructor()
    //
    // Output - none
    //
    // Exception
    // * TypeError - Conf must be an instance of Config
    // * TypeError - Services must be an instance of Array
    // * TypeError - A service must be an implement of IService
    // * TypeError - Size must be a possitive integer
    _verify_constructor_input(types, conf, size) {
        if (!(conf instanceof Config)) {
            throw TypeError('Conf must be an instance of Config')
        }
        if (!Array.isArray(types)) {
            throw TypeError('Services must be an instance of Array')
        }
        for (let type of types) {
            if (!type || !(type.prototype instanceof IService)) {
                throw new TypeError('A service must be an implement of IService')
            }
        }
        if (!Number.isInteger(size) || size <= 0) {
            throw TypeError('Size must be a possitive integer')
        }
    }

    // Description
    // * Build a directred graph represents for dependency between
    //   services
    //
    // Input -  none
    //
    // Output - none
    //
    // Exception
    // * Conflict - Duplicated service
    // * Conflict - Duplicated dependency
    // * InfiniteLoop - There is cycle dependency between services
    _build_service_type_graph() {
        this._service_graph = new DirectedGraph()

        this._add_service_graph_vertexes(this._service_graph)
        this._add_service_graph_edges(this._service_graph)

        let cycles = find_cycles(this._service_graph)
        if (cycles.size > 0) {
            let err = new error.InfiniteLoop('There is cycle dependency between services')
            err.cycles = cycles
            throw err
        }
    }

    // Description
    // * Add services as vertexes to graph
    //
    // Input
    // * g / DirectedGraph
    //
    // Output - none
    //
    // * Conflict - Duplicated service
    _add_service_graph_vertexes(g) {
        for (let type of this._types) {
            try {
                g.add_vertex(type)
            } catch (e) {
                if (e instanceof error.Conflict
                    && e.message === 'Vertex is already existed'
                ) {
                    let new_err = new error.Conflict('Duplicated service')
                    new_err.service_type = type
                    throw new_err
                }
                throw e
            }
        }
    }

    // Description
    // * Add dependency as edges to graph
    //
    // Input
    // * g / DirectedGraph
    //
    // Output - none
    //
    // Exception
    // * Conflict - Duplicated dependency
    _add_service_graph_edges(g) {
        for (let type of this._types) {
            for (let neighbour of type.dependency) {
                try {
                    g.add_edge(neighbour, type)
                } catch (e) {
                    if (e instanceof error.Conflict
                        && e.message === 'Edge is already existed'
                    ) {
                        let new_err = new error.Conflict('Duplicated dependency')
                        new_err.dependency = [type, neighbour]
                        throw new_err
                    }
                    throw e
                }
            }
        }
    }

    // Description
    // * Create attribute data.ready_dependency for each vertexes
    // * data.ready_dependency is a unsigned integer represents for
    //   number of initialized services which it depends on
    // * if data.ready_dependency is equal number of dependency of
    //   service then push it to ready_types
    //
    // Input
    // * instances / Map<type, instance> - Instance of services
    // * ready_types / AsyncQueue<type> - Contains service type is
    //   already to be initialize
    //
    // Output - none
    async _index_service_graph(instances, ready_types) {
        for (let type of this._types) {
            let v = this._service_graph.vertex(type)

            v.data = {
                ready_dependency: 0
            }
            for (let dependency of type.dependency) {
                if (instances.has(dependency)) {
                    v.data.ready_dependency += 1
                }
            }

            if (v.data.ready_dependency === type.dependency.length) {
                if (!instances.has(type)) {
                    await ready_types.push(type)
                }
            }
        }

    }

    // Description
    // * Handle on initialization is done
    _setup_executor_event(executor, instances, ready_types) {
        executor.on('task-success', ({type, instance}) => {
            this._on_service_success(type, instance, instances, ready_types).
            catch(e => {
                this._open_error = e
                return ready_types.push(null)
            }).
            catch(e => {
                console.error(e)
                process.exit(1)
            })
        })
        executor.on('task-failure', e => {
            this._on_service_failure(e, ready_types).
            catch(e => {
                this._open_error = e
                return ready_types.push(null)
            }).
            catch(e => {
                console.error(e)
                process.exit(1)
            })
        })
    }

    // Description
    // * Handle for succeed initialization of a service
    async _on_service_success(type, instance, instances, ready_types) {
        if (this._open_error) {
            return
        }

        instances.set(type, instance)
        await this._update_ready_dependency(type, ready_types)
        if (this._pending_count === 0) {
            await ready_types.push(null)
        }
    }

    // Description
    // * Handle for failed initialization of a service
    async _on_service_failure(e, ready_types) {
        if (this._open_error) {
            return
        }

        await ready_types.push(null)
        this._open_error = e
    }

    // Description
    // * Increase data.ready_dependency by one
    // * If data.ready_dependency is equal number of dependency
    //   service then push it to ready_types
    async _update_ready_dependency(type, ready_types) {
        let neighbours = this._service_graph.neighbours(type)

        for (let neighbour of neighbours) {
            let v = this._service_graph.vertex(neighbour)
            v.data.ready_dependency += 1
            if (v.data.ready_dependency === neighbour.dependency.length) {
                await ready_types.push(neighbour)
                this._pending_count -= 1
            }
        }
    }

    // Description
    // * Pop a service type from ready_types
    // * Push initialize function for that service to executor
    async _pop_ready_types(ready_types, executor, instances) {
        for (;;) {
            let type = await ready_types.pop()

            if (this._open_error || !type) {
                break
            }

            if (instances.has(type)) {
                continue
            }

            await executor.push(async () => {
                let dependency_instances = this._get_dependency_instances(type, instances)
                let instance = new type(...dependency_instances)
                await instance.open()

                return {
                    type: type,
                    instance: instance
                }
            })
        }
    }

    // Description
    // * Get list of dependency instance of services
    _get_dependency_instances(type, instances) {
        return type.dependency.map(item => {
            return instances.get(item)
        })
    }
}

module.exports = Factory
