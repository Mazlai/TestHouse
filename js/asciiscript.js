const animationElement = document.getElementById('animation');
const frog = document.getElementById('frog');

function animate() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let angle = performance.now() / 1000;
    let radius = 80 + Math.sin(angle) * 40;
    let output = '';

    for (let i = 0; i < 300; i++) {
        radius += 0.1;
        const x = Math.cos(angle + i) * radius;
        const y = Math.sin(angle + i) * radius;
        output += `<span style="position: absolute; top: ${screenHeight / 2 + y}px; left: ${screenWidth / 2 + x}px;">⣿</span>`;
    }

    animationElement.innerHTML = output;

    requestAnimationFrame(animate);
}

function moveFrog() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var frogWidth = frog.offsetWidth;
    var frogHeight = frog.offsetHeight;

    var maxX = windowWidth - frogWidth;
    var maxY = windowHeight - frogHeight;

    var randomX = Math.random() * maxX;
    var randomY = Math.random() * maxY;

    frog.style.left = randomX + 'px';
    frog.style.top = randomY + 'px';

    setTimeout(moveFrog, 1000); // Déplacer la grenouille toutes les secondes
}

function startAnimation() {
    moveFrog();
    animate();
}

startAnimation();