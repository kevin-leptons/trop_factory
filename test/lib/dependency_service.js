const assert = require('assert')

const {IService, Config} = require('../../lib')

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
        return [A]
    }

    constructor(a) {
        super()
        assert(a instanceof A)
    }

    async open() {}
    async close() {}
}

class C extends IService {
    static get dependency() {
        return [A, B]
    }

    constructor(a, b) {
        super()
        assert(a instanceof A)
        assert(b instanceof B)
    }

    async open() {}
    async close() {}
}

class D extends IService {
    static get dependency() {
        return [A, B, C]
    }

    constructor(a, b, c) {
        super()
        assert(a instanceof A)
        assert(b instanceof B)
        assert(c instanceof C)
    }

    async open() {}
    async close() {}
}

class E extends IService {
    static get dependency() {
        return [B, C]
    }

    constructor(b, c) {
        super()
        assert(b instanceof B)
        assert(c instanceof C)
    }

    async open() {}
    async close() {}
}

class F extends IService {
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

module.exports = {
    array: [A, B, C, D, E, F],
    map: {
        A,
        B,
        C,
        D,
        E,
        F
    }
}
