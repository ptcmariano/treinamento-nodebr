const axios = require('axios')
const URL_BASE = `https://swapi.co/api/people`

async function obterPessoas(nome) { // async para obter promisses
    const url = `${URL_BASE}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}
module.exports = { obterPessoas }
// obterPessoas('r2')
//     .then(function (result) {
//         //
//         console.log('resultado', result);
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM ', error)
//     })