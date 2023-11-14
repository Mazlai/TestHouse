//Variables
let loadingScreen = document.querySelector('.loading-screen');

let whoAmIContainer = document.getElementById('whoami');
let mysteriesContainer = document.getElementById('mysteries');

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

