document.addEventListener('DOMContentLoaded', function() {
    const p4 = new P4('#game');
  
    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() {
      const gameElement = document.getElementById('game');
      gameElement.innerHTML = '';
      p4.createGrid();
      restartButton.style.visibility = 'hidden';
    });
  });