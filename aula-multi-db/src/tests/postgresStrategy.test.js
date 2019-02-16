const assert = require('assert')
const Postgres = require('./../db/strategies/postgresStrategy')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Invisibilidade'
}

describe('Postgres Strategy', async function(){
    this.timeout('10s')
    it('Postgres Connection', async function() {
        const result = await context.isConnected()
        assert.strictEqual(result, true, 'should be true the connection')
    })

    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })
})