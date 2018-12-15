const axios = require('axios')
const URL_BASE = `https://swapi.co/api/people`

async function obterPessoas(nome) { // async para obter promisses
    const url = `${URL_BASE}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data.results.map(mapearPessoas)
}

function mapearPessoas(pessoa) {
    return {
        nome: pessoa.name,
        peso: pessoa.height
    }
}

module.exports = { obterPessoas }