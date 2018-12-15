// 0: obter usuario
// objetivo1: obter numero de telefone do usuario
// objetivo2: obter endereco do usuario pelo id

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            data: new Date()
        })
    }, 2000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => { // << array function
        return callback(null, {
            telefone: '9988882',
            ddd: '11'
        })
    }, 1500)
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

// function resolverUsuario(erro, usuario) { // usando padrao callback primeiro erro e depois sucesso
//     console.log('usuario', usuario)
// }

obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) { // null || "" || undefined
        console.error('DEU RUIM ao resolverUsuario', erro)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erroTelefone, telefone) {
        if (erroTelefone) {
            console.error('DEU RUIM ao resolverTelefone', erroTelefone)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(erroEndereco, endereco) {
            if (erroEndereco) {
                console.error('DEU RUIM ao resolverEndereco', erroEndereco)
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${endereco.rua}, ${endereco.numero} - ${endereco.cidade}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })

})
// const telefone = obterTelefone(usuario.id)
// const endereco = obterEndereco(usuario.id)