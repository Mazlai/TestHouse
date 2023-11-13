class P4 {
  constructor(selector, player1Image, player2Image) {
    this.col = 7;
    this.row = 6;
    this.selector = selector;
    this.player1Image = player1Image;
    this.player2Image = player2Image;
    this.player = 'un';

    this.createGrid();
    this.addEventListeners();
    this.checkWin();
    this.updatePlayerTurn();
  }

  // Crée la grille Puissance 4
  createGrid() {
    const board = document.querySelector(this.selector);
    board.innerHTML = '';
    
    for (let row = 0; row < this.row; row++) {
      const newRow = document.createElement('div');
      newRow.classList.add('row');
      for (let col = 0; col < this.col; col++) {
        const newCol = document.createElement('div');
        newCol.classList.add('col', 'empty');
        newCol.dataset.col = col;
        newCol.dataset.row = row;

        // Définir les variables CSS personnalisées
        newCol.style.setProperty('--player1-image', `url('../${this.player1Image}')`);
        newCol.style.setProperty('--player2-image', `url('../${this.player2Image}')`);

        newRow.appendChild(newCol);
      }
      board.appendChild(newRow);
    }
  }

  // Met à jour le joueur actuel
  updatePlayerTurn() {
    const playerTurn = document.getElementById('player-turn');
    playerTurn.textContent = `C'est au tour du joueur ${this.player}`;
  }

  // Écoute les événements
  addEventListeners() {
    const board = document.querySelector(this.selector);

    const lastCase = col => {
      const cells = document.querySelectorAll(`.col[data-col="${col}"]`);
      for (let i = cells.length - 1; i >= 0; i--) {
          const cell = cells[i];
          if (cell.classList.contains('empty')) {
              return cell;
          }
      }
      return null;
    };

    // Affiche le jeton du joueur actuel lorsqu'il passe la souris sur la colonne
    this.handleMouseEnter = (event) => {
      const target = event.target;
      const colElement = target.closest('.col.empty');

      if (colElement) {
        const col = colElement.dataset.col;
        const lastEmptyCell = lastCase(col);

        if (lastEmptyCell) {
          lastEmptyCell.classList.add(`p${this.player}`);
        }
      }
    };

    // Supprime le jeton du joueur actuel lorsqu'il quitte la colonne
    this.handleMouseLeave = () => {
      const cells = document.querySelectorAll('.col');
      cells.forEach(cell => {
        cell.classList.remove(`p${this.player}`);
      });
    };

    // Place le jeton du joueur actuel lorsqu'il clique sur la colonne
    this.handleEvent = (event) => {
      const target = event.target;
      const colElement = target.closest('.col');

      if (colElement && colElement.classList.contains('empty')) {
        const col = colElement.dataset.col;
        const lastEmptyCell = lastCase(col);

        if (lastEmptyCell) {
          lastEmptyCell.classList.add(`${this.player}`);
          lastEmptyCell.classList.remove('empty', `p${this.player}`);
          lastEmptyCell.dataset.player = this.player;

          const winner = this.checkWin(
            parseInt(lastEmptyCell.dataset.row),
            parseInt(lastEmptyCell.dataset.col)
          );

          this.player = (this.player === 'un') ? 'deux' : 'un';
          this.updatePlayerTurn();

          if (winner) {
            confetti();
            const victoryMessage = document.getElementById('victory-message');
            victoryMessage.textContent = `Le joueur ${winner} a gagné !`;
            victoryMessage.style.display = 'block';
            document.getElementById('player-turn').style.visibility = 'hidden';
            document.querySelector('.after-win').style.display = 'block';
          }
        }
      }
    };

    // Ajout de l'écouteur d'événements
    board.addEventListener('mouseenter', this.handleMouseEnter, true);
    board.addEventListener('mouseleave', this.handleMouseLeave, true);
    board.addEventListener('click', this.handleEvent);
  }

  // Fonction pour supprimer les écouteurs d'événements
  removeEventListeners() {
    const board = document.querySelector(this.selector);

    // Suppression de l'écouteur d'événements
    board.removeEventListener('click', this.handleEvent);
    board.removeEventListener('mouseenter', this.handleMouseEnter);
    board.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  // Fonction pour réinitialiser la grille et les écouteurs d'événements
  resetGame() {
    this.removeEventListeners();
    this.createGrid();
  }

  // Vérifie si un joueur a gagné
  checkWin(row, col) {
    const getCell = (i, j) => document.querySelector(`.col[data-row="${i}"][data-col="${j}"]`);

    // Vérifie si la case existe
    const checkDirection = direction => {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let next = getCell(i, j);
      while (i >= 0 && i < this.row && j >= 0 && j < this.col && next.dataset.player === this.player) {
        total++;
        i += direction.i;
        j += direction.j;
        next = getCell(i, j);
      }
      return total;
    };

    // Vérifie si le joueur a gagné dans une direction
    const checkWinDirection = (directionA, directionB) => {
      const totalA = checkDirection(directionA);
      const totalB = checkDirection(directionB);
      const total = 1 + totalA + totalB;
      return (total >= 4) ? this.player : null;
    };

    // Vérifie si le joueur a gagné verticalement, horizontalement ou en diagonale
    const checkVertical = () => checkWinDirection({ i: -1, j: 0 }, { i: 1, j: 0 });
    const checkHorizontal = () => checkWinDirection({ i: 0, j: -1 }, { i: 0, j: 1 });
    const checkPremiereDiagonale = () => checkWinDirection({ i: 1, j: 1 }, { i: -1, j: -1 });
    const checkDeuxiemeDiagonale = () => checkWinDirection({ i: 1, j: -1 }, { i: -1, j: 1 });

    return checkVertical() || checkHorizontal() || checkPremiereDiagonale() || checkDeuxiemeDiagonale();
  }
}