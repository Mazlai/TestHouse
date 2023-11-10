class P4 {
  constructor(selector) {
    this.col = 7;
    this.row = 6;
    this.selector = selector;
    this.player = 'red';

    this.createGrid();
    this.listenForEvent();
    this.checkWin();
  }

  createGrid() {
    const board = document.querySelector(this.selector);
    for (let row = 0; row < this.row; row++) {
      const newRow = document.createElement('div');
      newRow.classList.add('row');
      for (let col = 0; col < this.col; col++) {
        const newCol = document.createElement('div');
        newCol.classList.add('col', 'empty');
        newCol.dataset.col = col;
        newCol.dataset.row = row;
        newRow.appendChild(newCol);
      }
      board.appendChild(newRow);
    }
  }

  listenForEvent() {
    const board = $(this.selector);

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

    board.on('mouseenter', '.col.empty', (event) => {
      const col = event.currentTarget.dataset.col;
      const lastEmptyCell = lastCase(col);

      console.log(lastEmptyCell);

      if (lastEmptyCell != null) {
        lastEmptyCell.classList.add(`p${this.player}`);
      }
    });

    board.on('mouseleave', '.col', () => {
      const cells = document.querySelectorAll('.col');
      cells.forEach(cell => {
        cell.classList.remove(`p${this.player}`);
      });
    });

    board.on('click', '.col.empty', (event) => {
      const col = event.currentTarget.dataset.col;
      const lastEmptyCell = lastCase(col);
      lastEmptyCell.classList.add(`${this.player}`);
      lastEmptyCell.classList.remove('empty', `p${this.player}`);
      lastEmptyCell.dataset.player = this.player;

      const winner = this.checkWin(parseInt(lastEmptyCell.dataset.row), parseInt(lastEmptyCell.dataset.col));

      this.player = (this.player === 'red') ? 'yellow' : 'red';

      if (winner) {
        alert(`Player ${winner} has won!`);
        document.getElementById('restart').style.visibility = 'visible';
      }
    });
  }

  checkWin(row, col) {
    const getCell = (i, j) => document.querySelector(`.col[data-row='${i}'][data-col='${j}']`);

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

    const checkWinDirection = (directionA, directionB) => {
      const totalA = checkDirection(directionA);
      const totalB = checkDirection(directionB);
      const total = 1 + totalA + totalB;
      return (total >= 4) ? this.player : null;
    };

    const checkVertical = () => checkWinDirection({ i: -1, j: 0 }, { i: 1, j: 0 });

    const checkHorizontal = () => checkWinDirection({ i: 0, j: -1 }, { i: 0, j: 1 });

    const checkDiagonal1 = () => checkWinDirection({ i: 1, j: 1 }, { i: -1, j: -1 });

    const checkDiagonal2 = () => checkWinDirection({ i: 1, j: -1 }, { i: -1, j: 1 });

    return checkVertical() || checkHorizontal() || checkDiagonal1() || checkDiagonal2();
  }
}
