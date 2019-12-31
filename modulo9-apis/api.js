const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const HeroRoutes = require('./src/routes/hero')

const PORT_SERVER = 5000
const app = new Hapi.Server({
    port: PORT_SERVER
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroSchema))

    app.route([...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())])

    await app.start()
    console.log(`servidor rodando na porta ${PORT_SERVER}`)
    return app
}
module.exports = main()
