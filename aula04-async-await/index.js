// 0: obter usuario
// objetivo1: obter numero de telefone do usuario
// objetivo2: obter endereco do usuario pelo id

// importar modulo interno do nodejs
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromisse(resolve, reject) {
        // return reject(()=>{console.log('deu ruim obterUsuario')})
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Aladin',
                data: new Date()
            })
        }, 2000)
    })
}

function obterTelefone(idUsuario, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => { // << array function
            return resolve({
                telefone: '9988882',
                ddd: '11'
            })
        }, 1500)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => { // << array function
        return callback(null, {
            rua: 'segue o rumo',
            numero: '22',
            cidade: 'alegrete'
        })
    }, 2500)
}

async function main() { //definindo async essa funcao pode utilizar await para esperar valores
    try {
        console.time('await-usuario')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero} - ${endereco.cidade}
        `)
        console.timeEnd('await-usuario')
    } catch (error) {
        console.error('DEU RUIMZAO', error)
    }
}
main()