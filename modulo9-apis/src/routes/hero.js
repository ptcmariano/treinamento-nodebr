const BaseRoute = require('./baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db){
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                let item = request.payload
                return this.db.create(item)
            }
        }
    }
}

module.exports = HeroRoutes