const animationElement = document.getElementById('animation');

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

        animate();