var pg = require('pg');
delete pg.native;

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
  async create(item) {
    // create do _heroes chamado do sequelize
    const {dataValues} = await this._heroes.create(item, {raw:true})
    return dataValues;
  }
  async read(item={}) {
    return await this._heroes.findAll({where:item}, {raw:true})
  }
  async update(id,item={}) {
    return this._heroes.update(item, {where:{id:id}})
  }
  async delete(id) {
    let query = id ? {id} : {}
    return this._heroes.destroy({where:query})
  }
}

module.exports = PostgresStrategy;
