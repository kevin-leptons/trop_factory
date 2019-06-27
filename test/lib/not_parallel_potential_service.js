const assert = require('assert')

const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

const INITIALIZE_TIME = 100

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
        return [A01]
    }

    constructor(a01) {
        super()
        assert(a01 instanceof A01)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A03 extends IService {
    static get dependency() {
        return [A02]
    }

    constructor(a02) {
        super()
        assert(a02 instanceof A02)
    }


    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A04 extends IService {
    static get dependency() {
        return [A03]
    }

    constructor(a03) {
        super()
        assert(a03 instanceof A03)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A05 extends IService {
    static get dependency() {
        return [A04]
    }

    constructor(a04) {
        super()
        assert(a04 instanceof A04)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A06 extends IService {
    static get dependency() {
        return [A05]
    }

    constructor(a05) {
        super()
        assert(a05 instanceof A05)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A07 extends IService {
    static get dependency() {
        return [A06]
    }

    constructor(a06) {
        super()
        assert(a06 instanceof A06)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A08 extends IService {
    static get dependency() {
        return [A07]
    }

    constructor(a07) {
        super()
        assert(a07 instanceof A07)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A09 extends IService {
    static get dependency() {
        return [A08]
    }

    constructor(a08) {
        super()
        assert(a08 instanceof A08)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A10 extends IService {
    static get dependency() {
        return [A09]
    }

    constructor(a09) {
        super()
        assert(a09 instanceof A09)
    }

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

module.exports = {
    array: [
        A01,
        A02,
        A03,
        A04,
        A05,
        A06,
        A07,
        A08,
        A09,
        A10
    ],
    map: {
        A01,
        A02,
        A03,
        A04,
        A05,
        A06,
        A07,
        A08,
        A09,
        A10
    }
}
