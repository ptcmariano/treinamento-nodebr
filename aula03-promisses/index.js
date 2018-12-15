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

const usuarioPromisse = obterUsuario()
// para manipular sucesso usamos .then
// para manipular erros usamos .catch  
// usando pipe >> usuario -> telefone -> endereco  
usuarioPromisse
    .then(function (usuario) {
        //
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(resultadoTelefone) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: resultadoTelefone
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        // console.log('resultado', resultado)
        console.log(`
        Nome: ${resultado.usuario.nome}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero} - ${resultado.endereco.cidade}
        `)
    })
    .catch(function (erro) {
        console.log('DEU RUIM usuarioPromisse', erro)
    })
