const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {
    // tudo herdado
}

const meuEmissor = new MeuEmissor()
const eventoClick = 'usuario:click'

meuEmissor.on(eventoClick, function (click) {
    console.log('usuario clicou', click)
})

// meuEmissor.emit(eventoClick, 'na barra de rolagem')
// meuEmissor.emit(eventoClick, 'no botao ok')

// let count = 0
// setInterval(() => {
//     meuEmissor.emit(eventoClick, 'no botao ok' + count++)
// }, 900)

const stdin = process.openStdin()
stdin.addListener('data', function (value) {
    console.log('vc digitou: '+ value)
})