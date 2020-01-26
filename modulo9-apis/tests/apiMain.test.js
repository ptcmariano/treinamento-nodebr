const assert = require('assert')
const api = require('./../api')

describe('Suite de teste da API Heroes', function(){
    this.beforeAll(async () => {
        app = await api
    })

    this.afterAll(async () => {
        app = {}
        process.exit(0)
    })

    it('listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        assert.ok(Array.isArray(dados))
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
    })
    it('listar herois limitando resultado', async () => {
        listaHerois = [
            {"nome":"Batman","poder":"dinheiro"},
            {"nome":"Superman","poder":"voar"},
            {"nome":"Hulk","poder":"forca"},
        ]
        for (let index = 0; index < listaHerois.length; index++) {
            const element = listaHerois[index];
            const result = await app.inject({
                payload: element,
                method: 'POST',
                url: '/herois'
            })
        }
        const limiteDeResultado = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limiteDeResultado}`
        })
        const dados = JSON.parse(result.payload)
        assert.deepStrictEqual(dados.length,limiteDeResultado)
    })

    it('api criar heroi', async () => {
        let novoHeroi = {"nome":"Batman","poder":"dinheiro"}
        const result = await app.inject({
            payload: novoHeroi,
            method: 'POST',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        assert.ok(typeof dados == 'object')
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
    })
})