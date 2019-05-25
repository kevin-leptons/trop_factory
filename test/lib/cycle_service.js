const {IService, Config} = require('../../lib')

class A extends IService {
    static get dependency() {
        return [Config, A]
    }

    async open() {}
    async close() {}
}

module.exports = {
    array: [A],
    map: {
        A
    }
}
