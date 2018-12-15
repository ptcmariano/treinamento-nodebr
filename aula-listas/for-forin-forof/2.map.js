const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        // primeira maneira, com variaves extena
        // let names = []
        // result.results.forEach(item  => {
        //     names.push(item.name)
        // })

        // usando map e criando direto a variavel de names
        // const names = result.results.map(pessoa => pessoa.name)
        
        const names = result.results.meuMap(function (pessoa, indice) {
            return `[${indice}] ${pessoa.name}`
        })
        console.log('names', names)
    } catch (error) {
        console.error('erro interno', error)
    }
}
main()

// criando um map personalizado
Array.prototype.meuMap = function (callback) {
    const meuNovoArray = []
    for (let index = 0; index < this.length; index++) {
        const resultado = callback(this[index], index)
        meuNovoArray.push(resultado)
    }
    return meuNovoArray
}