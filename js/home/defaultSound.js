document.addEventListener('DOMContentLoaded', function() {
    let soundButton = document.querySelector('.sound-button');
    let soundOn = true;
    let audioElement = document.getElementById('backgroundMainMusic');

    soundButton.style.backgroundImage = 'url("./images/home/sound.png")';
    audioElement.volume = 0.2;

    // Bouton pour activer/désactiver le son
    soundButton.addEventListener('click', function() {
        soundOn = !soundOn;

        if (soundOn) {
            audioElement.play();
            audioElement.volume = 0.2;
            soundButton.style.backgroundImage = 'url("./images/home/sound.png")';;
        } else {
            audioElement.pause();
            soundButton.style.backgroundImage = 'url("./images/home/deaf.png")';;
        }
    });
});