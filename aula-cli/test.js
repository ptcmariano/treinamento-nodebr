const {deepEqual,ok} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Batman',
    poder: 'money',
    id: 11
}

describe('Suite de manipulação de herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })
    it('deve pesquisar um heroi', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.listar(expected.id)
        deepEqual(resultado[0], expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        ok(resultado)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })
})