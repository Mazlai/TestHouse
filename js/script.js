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

    var soundButton = document.querySelector('.sound-button');
    var soundOn = true;

    soundButton.addEventListener('click', function() {
        soundOn = !soundOn;
        soundButton.classList.toggle('sound-off', !soundOn);
        soundButton.classList.toggle('sound-on', soundOn);

        /*if (soundOn) {
            
            // Activer le son ici
        } else {
            
            // Désactiver le son ici
        }*/
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var gameButton = document.getElementById('game-button');
    var imageContainer = document.getElementById('image-container');
    var returnButton = document.getElementById('return-button');

    gameButton.addEventListener('click', function() {
        overlay.style.display = 'block';
        imageContainer.style.display = 'flex';
    });

    returnButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        imageContainer.style.display = 'none';
    });
});