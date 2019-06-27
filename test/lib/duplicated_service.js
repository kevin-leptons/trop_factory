const assert = require('assert')

const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

class A extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        assert(conf instanceof Conf)
    }

    async open() {}
    async close() {}
}

class B extends IService {
    static get dependency() {
        return [A]
    }

    constructor(a) {
        assert(a instanceof A)
    }

    async open() {}
    async close() {}
}

module.exports = {
    array: [A, B, A],
    map: {
        A,
        B,
        A
    }
}
