const {error} = require('@trop/gear')

class IService {
    // Array<Object>
    // * List of services which this service depends on
    static get dependency() {
        throw new error.NotImplemented()
    }

    async open() {
        throw new error.NotImplemented()
    }

    async close() {
        throw new error.NotImplemented()
    }
}

module.exports = IService
