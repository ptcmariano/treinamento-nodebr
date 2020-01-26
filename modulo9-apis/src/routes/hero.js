const BaseRoute = require('./baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db){
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction: (req, res, err) => {
                        throw err
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query
                    let nomeFilter = {}
                    if (nome) nomeFilter.nome = nome
                    return this.db.read(nomeFilter, parseInt(skip), parseInt(limit))
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