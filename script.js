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
});