const assert = require('assert')

const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

class A extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
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

class C extends IService {
    static get dependency() {
        return [A, B, A]
    }

    constructor(a, b) {
        assert(a instanceof A)
        assert(b instanceof B)
    }

    async open() {}
    async close() {}
}

module.exports = {
    array: [A, B, C],
    map: {
        A,
        B,
        C
    }
}
