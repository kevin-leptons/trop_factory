const {delay} = require('@trop/gear')

const {IService, Config} = require('../../lib')

const INITIALIZE_TIME = 100

class A00 extends IService {
    static get dependency() {
        return [Config]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A02 extends IService {
    static get dependency() {
        return [Config]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A04 extends IService {
    static get dependency() {
        return [Config]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A06 extends IService {
    static get dependency() {
        return [Config]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A10 extends IService {
    static get dependency() {
        return [A00, A01]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A12 extends IService {
    static get dependency() {
        return [A04, A05]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A20 extends IService {
    static get dependency() {
        return [A10, A11]
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

    async open() {
        await delay(INITIALIZE_TIME)
    }

    async close() {}
}

class A30 extends IService {
    static get dependency() {
        return [A20, A21]
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
