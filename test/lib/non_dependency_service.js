const assert = require('assert')

const {IService} = require('../../lib')

class A extends IService {
    static get dependency() {
        return []
    }

    constructor() {
        super()
    }

    async open() {}
    async close() {}
}

class B extends IService {
    static get dependency() {
        return []
    }

    constructor() {
        super()
    }

    async open() {}
    async close() {}
}

module.exports = {
    array: [A, B],
    map: {
        A,
        B
    }
}
