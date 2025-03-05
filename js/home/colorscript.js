document.getElementById('color-home').addEventListener('input', function() {
    var selectedColor = this.value;
    var yearHexColor = document.getElementById('yearhexcolor');

    console.log(selectedColor);

    if (selectedColor === '#a2025c') {
        window.location.href = 'ascii.html?hex=a2025c';
    } else if(selectedColor !== "#000000") {
        yearHexColor.style.color = "#ffcc00";
    }

    // Sélection des éléments
    var elementsToStyle = [
        'footer',
        '#color-container',
        '#game-button',
        '#rules-button',
        '#whoami',
        '#mysteries',
        '.return-button',
        '.sound-button',
        '.site-title'
    ].map(selector => document.querySelector(selector));

    // Appliquer les styles
    elementsToStyle.forEach(element => {
        if (element) {
            element.style.backgroundColor = selectedColor;
            if (element.style.borderColor !== undefined) {
                element.style.borderColor = selectedColor;
            }
        }
    });
});