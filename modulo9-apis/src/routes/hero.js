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
                const { skip, limit, nome } = 
                    request.query
                try {
                    return this.db.read(nome, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.log('DEU RUIM',error)
                    return 'Erro na busca de herois'
                }
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