const {deepEqual,ok} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Batman',
    poder: 'money',
    id: 11
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'energy ring',
    id: 22
}

describe('Suite de manipulação de herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
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
    it('deve remover um heroi por id', async () => {
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        ok(resultado)
    })
    it('ao remover um heroi sem passar id deve remover todos', async () => {
        let resultado = await database.remover()
        ok(resultado)
        resultado = await database.obterdadosArquivo()
        deepEqual(resultado, [])
    })
    it.only('deve atualizar um heroi por id', async () => {
        const novoDado = {
            nome: 'Robin',
            poder: 'cinturao'
        }
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            novoDado
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const resultado = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        ok(resultado)
    })
})