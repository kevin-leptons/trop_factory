const IService = require('./i_service')

class Config extends IService {
    static get dependency() {
        return []
    }

    async open() {}
    async close() {}
}

module.exports = Config
