const assert = require('assert')

const {IService, Config} = require('../../lib')

class A extends IService {
    static get dependency() {
        return [Config, A]
    }

    constructor(conf, a) {
        super()
        assert(conf instanceof Conf)
        assert(a instanceof A)
    }

    async open() {}
    async close() {}
}

module.exports = {
    array: [A],
    map: {
        A
    }
}
