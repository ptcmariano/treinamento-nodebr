const {deepEqual,ok} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de herois', () => {
    it('deve pesquisar um heroi', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.obterdadosArquivo(expected.id)
        deepEqual(resultado[0], expected)
    })
    // it('deve cadastrar um heroi, usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR
    //     //
    //     ok(null, expected)
    // })
})