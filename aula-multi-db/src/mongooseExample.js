const mongoose = require('mongoose')
mongoose.connect('mongodb://paulotiago:minhasenhasecreta@192.168.99.100:27017/herois',
    {useNewUrlParser:true,useUnifiedTopology:true}, function (err) {
        if(!err) return;
        console.log('Falha na conexao', err)
    }
)

const connection = mongoose.connection

connection.once('open',() => console.log('rrrrrodando'))
setTimeout(() => {
    const state = connection.readyState
    console.log('state 1s', state);
    
}, 2000);

const heroiSchema = new mongoose.Schema({
    nome: {
        type: String, required: true
    },
    poder: {
        type: String, required: true
    },
    insertedAt: {
        type: Date, default: new Date()
    }
})

const model = mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'dinheiro'
    })
    console.log('result cadastrar', resultCadastrar);
}
main()