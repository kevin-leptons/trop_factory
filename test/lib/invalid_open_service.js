const assert = require('assert')

const {IService, Config} = require('../../lib')

class OpenError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class A extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {}
    async close() {}
}

class B extends IService {
    static get dependency() {
        return [Config, A]
    }

    constructor(conf, a) {
        super()
        assert(conf instanceof Config)
        assert(a instanceof A)
    }

    async open() {}
    async close() {}
}

class C extends IService {
    static get dependency() {
        return [Config, A, B]
    }

    constructor(conf, a, b) {
        super()
        assert(conf instanceof Config)
        assert(a instanceof A)
        assert(b instanceof B)
    }

    async open() {
        throw new OpenError()
    }

    async close() {}
}

class D extends IService {
    static get dependency() {
        return [C]
    }

    constructor(c) {
        super()
        assert(c instanceof C)
    }

    async open() {
        throw new OpenError()
    }

    async close() {}
}

module.exports = {
    array: [A, B, C, D],
    map: {
        A,
        B,
        C,
        D
    },
    error_type: OpenError
}
