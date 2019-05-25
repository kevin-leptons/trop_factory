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

    async open() {}
    async close() {}
}

class B extends IService {
    static get dependency() {
        return [Config, A]
    }

    async open() {}
    async close() {}
}

class C extends IService {
    static get dependency() {
        return [Config, A, B]
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
