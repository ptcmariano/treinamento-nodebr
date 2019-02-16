const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize')
class PostgresStrategy extends IDb {
  constructor() {
    super();
    this._heroes = null
    this._sequelize = null
    this._connect()
  }
  async isConnected() {
    try {
        await this._sequelize.authenticate()
        return true;
    } catch (error) {
        console.error('too bad', error)
        return false;
    }
  }
  defineModel() {
    this._heroes = this._sequelize.define(
      'heroes',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
      },
    )
  }
  _connect() {
    this._sequelize = new Sequelize(
      'heroes', //database
      'paulotiago', // user
      'minhasenhasecreta', //senha
      {
        host: '192.168.99.100',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
        },
    );
    this.defineModel();
  }
  create(item) {
    return this._heroes.create(item, {raw:true});
  }
}

module.exports = PostgresStrategy;
