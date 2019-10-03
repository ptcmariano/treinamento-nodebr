const assert = require('assert')
const {MongoDBStrategy,STATUSMONGODB} = require('./../db/strategies/mongoDbStrategy')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDBStrategy())


describe('MongoDB Strategy', async function(){
    this.timeout('10s')
    it.only('MongoDB Connection', async function() {
        const result = await context.isConnected()
        assert.strictEqual(result, STATUSMONGODB[2], 'should be one the connection')
    })
})