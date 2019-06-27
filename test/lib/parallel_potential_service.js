const assert = require('assert')

const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

const INITIALIZE_TIME = 100

class A00 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A01 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A02 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A03 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A04 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A05 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A06 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}


class A07 extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super()
        assert(conf instanceof Config)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A10 extends IService {
    static get dependency() {
        return [A00, A01]
    }

    constructor(a00, a01) {
        super()
        assert(a00 instanceof A00)
        assert(a01 instanceof A01)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A11 extends IService {
    static get dependency() {
        return [A02, A03]
    }

    constructor(a02, a03) {
        super()
        assert(a02 instanceof A02)
        assert(a03 instanceof A03)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A12 extends IService {
    static get dependency() {
        return [A04, A05]
    }

    constructor(a04, a05) {
        super()
        assert(a04 instanceof A04)
        assert(a05 instanceof A05)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A13 extends IService {
    static get dependency() {
        return [A06, A07]
    }

    constructor(a06, a07) {
        super()
        assert(a06 instanceof A06)
        assert(a07 instanceof A07)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A20 extends IService {
    static get dependency() {
        return [A10, A11]
    }

    constructor(a10, a11) {
        super()
        assert(a10 instanceof A10)
        assert(a11 instanceof A11)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A21 extends IService {
    static get dependency() {
        return [A12, A13]
    }

    constructor(a12, a13) {
        super()
        assert(a12 instanceof A12)
        assert(a13 instanceof A13)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A30 extends IService {
    static get dependency() {
        return [A20, A21]
    }

    constructor(a20, a21) {
        super()
        assert(a20 instanceof A20)
        assert(a21 instanceof A21)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

module.exports = {
    array: [
        A00, A01, A02, A03, A04, A05, A06, A07,
        A10, A11, A12, A13,
        A20, A21,
        A30
    ],
    map: {
        A00, A01, A02, A03, A04, A05, A06, A07,
        A10, A11, A12, A13,
        A20, A21,
        A30
    }
}
