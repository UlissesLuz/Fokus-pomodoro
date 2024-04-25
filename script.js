const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector ('.app__image')
const imgPlayPause = document.querySelector ('#start-pause img')
const titulo = document.querySelector ('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const tempoNaTela = document.querySelector ('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('./sons/play.wav')
const musicaPause = new Audio('./sons/pause.mp3')
const musicaBeepEnd = new Audio('./sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector ('#start-pause span')


let tempoCorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

const botaoIniciar = document.querySelector ('app__card-primary-button')
const duracaoFoco = 1500;
const duracaoDescansocurto = 300;
const duracaoDescansoLongo = 900 

focoBt.addEventListener('click', () => {
    tempoCorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    // html.setAttribute('data-contexto', 'foco')
    // banner.setAttribute('src', './imagens/foco.png')
})

curtoBt.addEventListener('click', () => {
    tempoCorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    // html.setAttribute('data-contexto', 'descanso-curto')
    curtoBt.classList.add('active')
    // banner.setAttribute('src', './imagens/descanso-curto.png')
})

longoBt.addEventListener('click', () => {
    tempoCorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', './imagens/descanso-longo.png')
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco': titulo.innerHTML = ` Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        
        case 'descanso-curto': titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta! </strong>`
            
            break;

        case 'descanso-longo': titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong"> Faça uma pausa longa. </strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoCorridoEmSegundos <= 0) {
        musicaBeepEnd.play()
        alert ('Tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) { 
            const evento = new CustomEvent ('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoCorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    imgPlayPause.setAttribute('src', `./imagens/pause.png`)
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent = 'Começar'
    imgPlayPause.setAttribute('src', `./imagens/play_arrow.png`)
}

function mostrarTempo (){
    const tempo = new Date(tempoCorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

// const html = document.querySelector ('html')




