const cards = document.querySelectorAll('.card');
// const backgroundSound = new Audio('./sounds/MK2_BGMUSIC.mp3');
const backgroundSound = document.getElementById('background-sound');
const matchSound = document.getElementById('match-sound');
const noMatchSound = document.getElementById('nomatch-sound');
const buttonBackgroundSound = document.querySelector('.button-background-sound');
const backgroundSoundVolume = document.getElementById('background-sound-volume');
const soundEffectsVolume = document.getElementById('soundeffects-volume');
const resetButton = document.querySelector('.reset-button');
const showToasty = document.getElementById('easteregg');
const inicioPartida = document.getElementById('game-start')
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let soundBgOn = true;

window.addEventListener('load', inicioPartida.play())

// ativa ou desativa o som de fundo
buttonBackgroundSound.addEventListener('click', function() {
    if (soundBgOn === true) {
        backgroundSound.play();
        backgroundSound.loop = true;
        soundBgOn = false;
    } else {
        backgroundSound.pause();
        soundBgOn = true;
    }
})

// regula o volume do som de fundo
backgroundSoundVolume.addEventListener('click', function() {
    backgroundSound.volume=this.value;
})

// regula simultaneamente os volumes dos efeitos sonoros
soundEffectsVolume.addEventListener('click', function() {
    matchSound.volume=this.value;
    noMatchSound.volume=this.value;
})

// reinicia a página para uma nova partida
resetButton.addEventListener('click', function() {
    location.reload();
})

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        matchSound.play();
        return;
    }
    unflipCards();
    noMatchSound.play();
    if (noMatchSound.volume>0) {
        showToasty.classList.add('showup');
        setTimeout(() => {
            showToasty.classList.remove('showup');
        }, 1500)
    }
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 48);
        card.style.order = randomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});