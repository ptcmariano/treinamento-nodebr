const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const PORT_SERVER = 5000
const app = new Hapi.Server({
    port: PORT_SERVER
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroSchema))

    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, response) => {
            return context.read()
        }
    }])

    await app.start()
    console.log(`servidor rodando na porta ${PORT_SERVER}`)
    return app
}
module.exports = main()
