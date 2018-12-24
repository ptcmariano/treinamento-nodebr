const {readFile,writeFile} = require('fs')
const {promisify} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// outra forma de obter dados de json é require
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }
    async obterdadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }
    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }
    async cadastrar(heroi) {
        const dados = await this.obterdadosArquivo()
        const id = heroi.id// <= 2 ? heroi.id : new Date.now()
        // concatenar objeto dos dados do heroi com o objeto do id
        const heroiComId = {id, ...heroi}

        const dadosFinal =  [...dados, heroiComId]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }
    async listar(id) {
        const dados = await this.obterdadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))
        return dadosFiltrados
    }
}

module.exports = new Database()