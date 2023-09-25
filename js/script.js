document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var loadingScreen = document.querySelector('.loading-screen');
        
        setTimeout(function() {
            loadingScreen.style.animation = 'fade 1s forwards';
            
            setTimeout(function() {
                loadingScreen.style.pointerEvents = 'none';
            }, 1000);
        }, 3000);
    }, 0);

    // Ajoutez une fonction pour le bouton "Son"
    var soundButton = document.querySelector('.sound-button');
    soundButton.addEventListener('click', function() {
        // Ajoutez ici la logique pour activer/désactiver le son
        alert('Le son a été activé/désactivé !');
    });

    // Ajoutez une fonction pour le bouton "Jouer"
    var playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', function() {
        // Ajoutez ici la logique pour lancer le jeu
        alert('Le jeu a commencé !');
    });
});