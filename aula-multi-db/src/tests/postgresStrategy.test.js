const assert = require('assert')
const Postgres = require('./../db/strategies/postgresStrategy')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Invisibilidade'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Butcher',
    poder: 'Machado'
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

    it('listar', async function(){
        const [result] = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
        delete result.dataValues.id // delete to combine com mock
        assert.deepStrictEqual(result.dataValues, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async function(){
        const [registroAntigo] = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
        const registroAtualizar = {
            ...MOCK_HEROI_CADASTRAR,
            nome: MOCK_HEROI_ATUALIZAR.nome
        }
        const [result] = await context.update(registroAntigo.id, registroAtualizar)
        assert.deepStrictEqual(result, 1)
    })
})