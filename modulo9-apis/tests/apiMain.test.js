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

    it.only('listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        assert.ok(Array.isArray(dados))
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
    })
})