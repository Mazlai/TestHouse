/* Démarrage du jeu */

document.addEventListener('DOMContentLoaded', function() {
    const p4 = new P4('#game');
  
    const restartButton = document.getElementById('restart');
    const playerTurn = document.getElementById('player-turn');

    restartButton.addEventListener('click', function() {
      const gameElement = document.getElementById('game');
      gameElement.innerHTML = '';
      p4.createGrid();
      restartButton.style.visibility = 'hidden';
      playerTurn.style.visibility = 'visible';
    });
  });