const assert = require('assert')
const Postgres = require('./../db/strategies/postgresStrategy')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

//const MOCK_

describe('Postgres Strategy', async function(){
    this.timeout('10s')
    it('Postgres Connection', async function() {
        const result = await context.isConnected()
        assert.strictEqual(result, true, 'should be true the connection')
    })
})