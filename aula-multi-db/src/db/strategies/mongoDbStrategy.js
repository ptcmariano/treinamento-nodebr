const IDb = require('./base/interfaceDb')
const mongoose = require('mongoose')
const STATUSMONGODB = {
  0:'Disconectado',
  1:'Conectado',
  2:'Conectando',
  3:'Disconectando'
}
class MongoDBStrategy extends IDb {
  constructor() {
    super();
    this._driver = null
    this._herois = null
    this._connect()
  }
  create(item) {
    throw new NotImplementedException();
  }
  read(item) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
  async isConnected() {
    const state = STATUSMONGODB[this._driver.readyState]
    if (state == STATUSMONGODB[1]) return state;
    await new Promise(resolve => setTimeout(resolve,2000))
    if (state != STATUSMONGODB[3]) return state;
    return 'Conexão falhou ao retornar status'
  }
  _connect() {
    mongoose.connect('mongodb://paulotiago:minhasenhasecreta@192.168.99.100:27017/herois',
        {useNewUrlParser:true,useUnifiedTopology:true}, function (err) {
            if(!err) return;
            console.log('Falha na conexao', err)
        }
    )

    const connection = mongoose.connection
    connection.once('open',() => console.log('rrrrrodando'))
    this._driver = connection
  }
}

module.exports = {MongoDBStrategy,STATUSMONGODB};
