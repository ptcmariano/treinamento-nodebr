const { obterPessoas } = require('./service')
/*
const item = {nome:'Erick',idade:12}
const {nome,idade} = item
console.log(nome,idade)
*/
async function main() {
    try {
        const {results} = await obterPessoas('la')
        // primeiro como usar o filter padrao
        // const familiaLars = results.filter(function (item) {
        //     // filter espera um booleando para decidir quem fica no resultado
        //     return item.name.toLowerCase().indexOf('lars') !== -1
        // })
        // const names = familiaLars.map(pessoa => pessoa.name)

        // agora como um filter personalizado pode atuar em uma lista
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// filter personalizado
Array.prototype.meuFilter = function (callback) {
    let lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista
}

main()
