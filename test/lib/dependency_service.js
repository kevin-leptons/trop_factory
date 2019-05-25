const {IService, Config} = require('../../lib')

class A extends IService {
    static get dependency() {
        return [Config]
    }

    async open() {}
    async close() {}
}

class B extends IService {
    static get dependency() {
        return [A]
    }

    async open() {}
    async close() {}
}

class C extends IService {
    static get dependency() {
        return [A, B]
    }

    async open() {}
    async close() {}
}

class D extends IService {
    static get dependency() {
        return [A, B, C]
    }

    async open() {}
    async close() {}
}

class E extends IService {
    static get dependency() {
        return [B, C]
    }

    async open() {}
    async close() {}
}

class F extends IService {
    static get dependency() {
        return [Config]
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
