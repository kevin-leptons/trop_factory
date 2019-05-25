const {delay} = require('@trop/gear')

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
        return [A, B, A]
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
