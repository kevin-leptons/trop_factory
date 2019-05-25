# Factory

A way to define and initialize services with dependency, in parallel

## Members

### constructor(types, conf=new Config(), size=8)

* Description
    * A way to define and initialize services with dependency, in parallel
* Input
    * `types` / `Array<IService>` / `[]` - List of service types
    * `conf` / `Config` / `Config()` - It contains primitive configurations for other
      `services`
    * `size` / `Number` / `8` - Number of initialization at the same time
* Exception
    * `TypeError` - Conf must be an instance of Config
    * `TypeError` - Services must be an instance of Array 
    * `TypeError` - A service must be an implement of IService
    * `TypeError` - Size must be a possitive integer
    * `Conflict` - Duplicated service
    * `Conflict` - Duplicated dependency 
    * `InfiniteLoop` - There is cycle dependency between services

### open()

* Description
    * Start to initialize services
* Input - none
* Output
    * `Promise<undefined>`

### close()

* Description
    * Do not allow perform operations on hub anymore
    * Close all of services
* Input - none
* Output 
    * `Promise<undefined>`

### get(service_type)

* Description
    * Retrieve an instance of service from hub
    * It returns the same instance of service for all of request
* Input
    * `service_type` / `IService` - Type of service
* Output
    * `IService` - Instance of service

## Example

```js
const {Factory, Config, IService} = require('@trop/factory')

// Begin: define services
class A extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        this._conf = conf
    }

    async open() {}
    async close() {}

    join_keys() {
        return [this._conf.key_one, this._conf.key_two].join('_')
    }
}

class B extends IService {
    static get dependency() {
        return [Config, A]
    }

    constructor(conf, a) {
        super()
        this._conf = conf
        this._a = a
    }

    async open() {}
    async close() {}

    print_keys() {
        console.log('key_one', this._conf.key_one)
        console.log('key_two', this._conf.key_two)
        console.log('joined', this._a.join_keys())
    }
}
// End: define services

// Initialize and invoke a service
async function main() {
    let conf = new Config()
    conf.key_one = 1
    conf.key_two = 'two'

    let factory = new Factory([A, B], conf)
    await factory.open()

    let b = factory.get(B)
    b.print_keys()
}

main().
catch(console.error)
```
