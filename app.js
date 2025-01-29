let numerosGerados = [];
let numeroMaxAleatorio = 100;

let numeroAleatorio = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroAleatorio) {
        exibirTextoNaTela('h1', 'Acertou!!');

        let palavraTentavita = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Parabéns você acertou o número secreto em ${tentativa} ${palavraTentavita}`;

        exibirTextoNaTela('p', mensagemAcerto);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroAleatorio) {
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }
        tentativa++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let geradorDeNumero = parseInt(Math.random() * numeroMaxAleatorio + 1);

    if (numerosGerados.length == numeroMaxAleatorio) {
        numerosGerados = [];
    }

    if (numerosGerados.includes(geradorDeNumero)) {
        return gerarNumeroAleatorio();
    } else {
        numerosGerados.push(geradorDeNumero);
        console.log(numerosGerados);
        return geradorDeNumero;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    tentativa = 1;
    mensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}