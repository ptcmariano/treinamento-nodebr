const { obterPessoas } = require('./service')
/*
trazer o peso das pessoas e somar todos os pessos
*/
async function main() {
    try {
        // const {results} = await obterPessoas('la')
        // primeiro pegar o peso
        // const pesos = results.map(item => parseInt(item.height))
        // vai vir um array de ints ex: [20, 40, 11] = ?
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // })
        // console.log('pesos', pesos)
        // console.log('total de pesos', total)

        // agora pegar um valor de listas
        const minhaLista = [
            ['Erick', 'Weldel'],
            ['NodeBR', 'Nerdzão']
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')

        console.log('total', total)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// reduce personalizado
Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

    for (let index = 0; index < this.length; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

main()
