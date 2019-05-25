const assert = require('assert')

const {error, Stopwatch} = require('@trop/gear')

const {Config, Factory} = require('../lib')

const {
    not_service, 
    non_dependency_service,
    not_implemented_service,
    dependency_service,
    invalid_open_service,
    partition_service,
    cycle_service,
    duplicated_service,
    duplicated_dependency,
    not_parallel_potential_service,
    parallel_potential_service
} = require('./lib')

describe('Factory.constructor()', () => {
    it('with conf is default', () => {
        new Factory([])
    })

    it('with conf is undefined', () => {
        new Factory([], undefined)
    })

    it('with conf is null', () => {
        assert.throws(() => {
            new Factory([], null)
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is true ', () => {
        assert.throws(() => {
            new Factory([], true)
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is false', () => {
        assert.throws(() => {
            new Factory([], false)
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is a number', () => {
        assert.throws(() => {
            new Factory([], 1)
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is a string', () => {
        assert.throws(() => {
            new Factory([], 'this is a string')
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is plain object', () => {
        assert.throws(() => {
            new Factory([], {})
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with conf is a function', () => {
        assert.throws(() => {
            new Factory([], function() {})
        }, {
            name: 'TypeError',
            message: 'Conf must be an instance of Config'
        })
    })

    it('with default services', () => {
        new Factory([])
    })

    it('with services is undefined', () => {
        assert.throws(() => {
            new Factory(undefined)
        }, {
            name: 'TypeError',
            message: 'Services must be an instance of Array'
        })
    })

    it('with services is null', () => {
        assert.throws(() => {
            new Factory(null)
        }, {
            name: 'TypeError',
            message: 'Services must be an instance of Array'
        })
    })

    it('with services contains undefined', () => {
        assert.throws(() => {
            new Factory([undefined, undefined])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains null', () => {
        assert.throws(() => {
            new Factory([null, null])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains false', () => {
        assert.throws(() => {
            new Factory([false, false])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains true', () => {
        assert.throws(() => {
            new Factory([true, true])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains number', () => {
        assert.throws(() => {
            new Factory([1, 2])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains string', () => {
        assert.throws(() => {
            new Factory(['this is a string', 'other string'])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services contains plain object', () => {
        assert.throws(() => {
            new Factory([{}, {}])
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services does not extends from IService', () => {
        assert.throws(() => {
            new Factory(not_service.array)
        }, {
            name: 'TypeError',
            message: 'A service must be an implement of IService'
        })
    })

    it('with services does not implements IService methods', () => {
        assert.throws(() => {
            new Factory(not_implemented_service.array)
        }, error.NotImplemented)
    })

    it('with cycle services', async () => {
        assert.throws(() => {
            new Factory(cycle_service.array)
        }, {
            name: 'InfiniteLoop',
            message: 'There is cycle dependency between services'
        })
    })

    it('with duplicated services', async () => {
        assert.throws(() => {
            new Factory(duplicated_service.array)
        }, {
            name: 'Conflict',
            message: 'Duplicated service',
            service_type: duplicated_service.map.A
        })
    })

    it('with duplicated dependency', async () => {
        assert.throws(() => {
            new Factory(duplicated_dependency.array)
        }, {
            name: 'Conflict',
            message: 'Duplicated dependency',
            dependency: [
                duplicated_dependency.map.C, 
                duplicated_dependency.map.A
            ]
        })
    })
})

describe('Factory.open()', () => {
    it('with empty service', async () => {
        let factory = new Factory([])
        await factory.open()

        let conf = factory.get(Config)
        assert.notEqual(conf, undefined)
        assert.equal(conf.constructor, Config)

        await factory.close()
    })

    it('with empty services and custom config', async () => {
        let conf = new Config()
        conf.x = 1
        conf.y = 2
        let factory = new Factory([], conf)
        await factory.open()
         
        let getted_conf = factory.get(Config)
        assert.notEqual(getted_conf, undefined)
        assert.equal(getted_conf.constructor, Config)
        assert.equal(getted_conf.x, 1)
        assert.equal(getted_conf.y, 2)

        await factory.close()
    })

    it('with services which throw error on open()', async () => {
        let factory = new Factory(invalid_open_service.array)
        
        assert.rejects(async () => {
            await factory.open()
        }, invalid_open_service.error_type)

        await factory.close()
    })

    it('with non dependency services', async () => {
        let factory = new Factory(non_dependency_service.array)
        await factory.open()

        for (let type of non_dependency_service.array) {
            let instance = factory.get(type)

            assert.notEqual(instance, undefined)
            assert.equal(instance.constructor, type)
        }
    })

    it('with dependency services', async () => {
        let factory = new Factory(dependency_service.array)
        await factory.open()

        let conf = factory.get(Config)
        assert.notEqual(conf, undefined)
        assert.equal(conf.constructor, Config)

        for (let type of dependency_service.array) {
            let instance = factory.get(type)

            assert.notEqual(instance, undefined)
            assert.equal(instance.constructor, type)
        }
    })

    it('with partitions services', async () => {
        let factory = new Factory(partition_service.array)
        await factory.open()

        for (let type of partition_service.array) {
            let instance = factory.get(type)

            assert.notEqual(instance, undefined)
            assert.equal(instance.constructor, type)
        }
    })
})

describe('Factory.open/performance', () => {
    it('with no parallel potential', async () => {
        let factory = new Factory(not_parallel_potential_service.array)
        let sw = new Stopwatch()

        sw.start()
        await factory.open()
        sw.stop()

        assert(sw.elapsed <= 1020)
    })

    it('with parallel potential', async () => {
        let factory = new Factory(parallel_potential_service.array)
        let sw = new Stopwatch()

        sw.start()
        await factory.open()
        sw.stop()

        assert(sw.elapsed <= 410)
    })
})
