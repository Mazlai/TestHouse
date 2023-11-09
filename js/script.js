//Variables
var loadingScreen = document.querySelector('.loading-screen');

var whoAmIContainer = document.getElementById('whoami');
var mysteriesContainer = document.getElementById('mysteries');

var soundButton = document.querySelector('.sound-button');
var soundOn = true;
var audioElement = new Audio('audio/wind.mp3');
audioElement.autoplay = true;

var gameButton = document.getElementById('game-button');
var imageContainer = document.getElementById('image-container');
var returnButton = document.getElementById('return-button');

// Redirection vers le jeu "qui-est-ce"
whoAmIContainer.addEventListener('click', function() {
    window.location.href = 'whoami.html';
});

// Redirection vers le jeu "mystères"
mysteriesContainer.addEventListener('click', function() {
    window.location.href = 'mysteries.html';
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

// Joue le son automatiquement au chargement de la page
window.onload = function() {
  audioElement.play();
  audioElement.volume = 0.2;
  audioElement.loop = true;
};

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

