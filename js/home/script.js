//Variables
let loadingScreen = document.querySelector('.loading-screen');

let whoAmIContainer = document.getElementById('whoami');
let mysteriesContainer = document.getElementById('mysteries');

let soundButton = document.querySelector('.sound-button');
let soundOn = true;
let audioElement = new Audio('audio/wind.mp3');

let gameButton = document.getElementById('game-button');
let imageContainer = document.getElementById('image-container');
let returnButton = document.getElementById('return-button');

// Redirection vers le jeu "qui-est-ce"
whoAmIContainer.addEventListener('click', function() {
    window.location.href = 'whoami.html';
});

// Redirection vers le jeu "mystères"
mysteriesContainer.addEventListener('click', function() {
    window.location.href = 'p4.html';
});

// Effet de chargement de la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        setTimeout(function() {
            loadingScreen.style.animation = 'fade 1s forwards';
            
            setTimeout(function() {
                loadingScreen.style.pointerEvents = 'none';
            }, 1000);
        }, 3000);
    }, 0)
});

// Bouton pour activer/désactiver le son
soundButton.addEventListener('click', function() {
    soundOn = !soundOn;
    soundButton.classList.toggle('sound-off', !soundOn);
    soundButton.classList.toggle('sound-on', soundOn);

    if (soundOn) {
        audioElement.play();
        audioElement.volume = 0.2;
        audioElement.loop = true;
    } else {
        audioElement.pause();
    }
});

// Affiche l'overlay et les images du jeu
document.addEventListener('DOMContentLoaded', function() {
    gameButton.addEventListener('click', function() {
        overlay.style.display = 'block';
        imageContainer.style.display = 'flex';
    });

    returnButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        imageContainer.style.display = 'none';
    });
});

