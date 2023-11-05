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