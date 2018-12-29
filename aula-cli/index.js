const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){
    Commander.version('v1')
        .option('-n, --nome [value]', 'Nome do heroi')
        .option('-p, --poder [value]', 'Poder do heroi')
        .option('-i, --id [value]', 'Id do heroi')
        .option('-c, --cadastrar', 'Cadastrar heroi')
        .option('-l, --listar', 'Listar herois')
        .option('-r, --remover', 'Remove heroi por id (arg -i obrigatorio)')
        .option('-a, --atualizar', 'Atualiza heroi por id (arg -i obrigatorio)')
        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('erro ao cadastrar heroi')
                return;
            }
            console.log('Heroi cadastrado com sucesso', heroi)
            return;
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log('lista: ', resultado)
            return;
        }
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error('erro ao remover heroi')
                return;
            }
            console.log('Heroi removido com sucesso')
            return;
        }

        if (Commander.atualizar) {
            // prepara os dados, removendo undefined | false
            const dadosHeroi = JSON.stringify(heroi)
            const dadosAtualizar = JSON.parse(dadosHeroi)
            // realiza o comando
            const resultado = await Database.atualizar(heroi.id, dadosAtualizar)
            // retorna resultado
            if (!resultado) {
                console.error('erro ao atualizar heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso')
            return;
        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()