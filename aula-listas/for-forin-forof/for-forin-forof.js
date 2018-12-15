const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        let names = []

        console.time('get-obterPessoas')
        for (let index = 0; index < result.results.length; index++) {
            const pessoa = result.results[index];
            names.push(pessoa.name)
        }
        console.log('names', names);
        console.timeEnd('get-obterPessoas')

        console.time('forin')
        for (const i in result.results) {
            if (result.results.hasOwnProperty(i)) {
                const pessoa = result.results[i];
                names.push(pessoa.name)
            }
        }
        console.timeEnd('forin')

        console.time('forof')
        for (pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('forof')
    } catch (error) {
        console.error('erro interno', error)
    }
}
main()