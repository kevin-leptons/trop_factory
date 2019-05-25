const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

const INITIALIZE_TIME = 100

class A01 extends IService {
    static get dependency() {
        return [Config]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A03 extends IService {
    static get dependency() {
        return [A02]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A05 extends IService {
    static get dependency() {
        return [A04]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A07 extends IService {
    static get dependency() {
        return [A06]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A09 extends IService {
    static get dependency() {
        return [A08]
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
