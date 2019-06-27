const assert = require('assert')

const {IService, Config} = require('../../lib')

// Begin: partition A
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

class Aa extends IService {
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

class Ab extends IService {
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

class Ac extends IService {
    static get dependency() {
        return [A, Aa]
    }

    constructor(a, aa) {
        super()
        assert(a instanceof A)
        assert(aa instanceof Aa)
    }

    async open() {}
    async close() {}
}

class Ad extends IService {
    static get dependency() {
        return [Ac]
    }

    constructor(ac) {
        super()
        assert(ac instanceof Ac)
    }

    async open() {}
    async close() {}
}
// End: partition A

// Begin: partition B
class B extends IService {
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

class Ba extends IService {
    static get dependency() {
        return [B]
    }

    constructor(b) {
        super()
        assert(b instanceof B)
    }

    async open() {}
    async close() {}
}

class Bb extends IService {
    static get dependency() {
        return [B]
    }

    constructor(b) {
        super()
        assert(b instanceof B)
    }

    async open() {}
    async close() {}
}

class Bc extends IService {
    static get dependency() {
        return [B, Ba]
    }

    constructor(b, ba) {
        super()
        assert(b instanceof B)
        assert(ba instanceof Ba)
    }

    async open() {}
    async close() {}
}

class Bd extends IService {
    static get dependency() {
        return [Bc]
    }

    constructor(bc) {
        super()
        assert(bc instanceof Bc)
    }


    async open() {}
    async close() {}
}
// End: partition B

// Begin: partition C
class C extends IService {
    static get dependency() {
        return []
    }

    async open() {}
    async close() {}
}

class Ca extends IService {
    static get dependency() {
        return [C]
    }

    constructor(c) {
        super()
        assert(c instanceof C)
    }

    async open() {}
    async close() {}
}

class Cb extends IService {
    static get dependency() {
        return [C, Ca]
    }

    constructor(c, ca) {
        super()
        assert(c instanceof C)
        assert(ca instanceof Ca)
    }

    async open() {}
    async close() {}
}
// End: partition C

// Begin: partion D
class D extends IService {
    static get dependency() {
        return []
    }

    async open() {}
    async close() {}
}
// End: partion D

module.exports = {
    array: [
        A, Aa, Ab, Ac, Ad,
        B, Ba, Bb, Bc, Bd,
        C, Ca, Cb,
        D
    ],
    map: {
        A, Aa, Ab, Ac, Ad,
        B, Ba, Bb, Bc, Bd,
        C, Ca, Cb,
        D
    }
}
