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
    const that = this;
    function lastCase(col) {
      const $cells = $(`.col[data-col='${col}']`);
      for (let i = $cells.length - 1; i >= 0; i--) {
        const $cell = $($cells[i]);
        if ($cell.hasClass('empty')) {
          return $cell;
        }
      }
      return null;
    }

    board.on('mouseenter', '.col.empty', function() {
      const $col = $(this).data('col');
      const $lastEmptyCell = lastCase($col);
      if($lastEmptyCell != null) {
        $lastEmptyCell.addClass(`p${that.player}`);
      }
    });
    
    board.on('mouseleave', '.col', function() {
      const cells = document.querySelectorAll('.col');
      cells.forEach(function(cell) {
        cell.classList.remove(`p${that.player}`);
      });
    });

    board.on('click', '.col.empty', function() {
      const $col = $(this).data('col');
      const $lastEmptyCell = lastCase($col);
      $lastEmptyCell.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);

      const winner = that.checkWin($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
      console.log(winner);
      that.player = (that.player === 'red') ? 'yellow' : 'red';

      console.log(that.player);

      if(winner) {
        alert(`Player ${winner} has won!`);
        document.getElementById('restart').style.visibility = 'visible';
        return;
      }
    });
  }

  checkWin(row, col) {
    const that = this;

    function $getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      var $next = $getCell(i, j);
      while(i >= 0 && i < that.row && j >= 0 && j < that.col && $next.data('player') === that.player) {
        total++;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }

    function checkWinDirection(directionA, directionB) {
      const totalA = checkDirection(directionA);
      const totalB = checkDirection(directionB);
      const total = 1 + totalA + totalB;
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }

    function checkVertical() {
      return checkWinDirection({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontal() {
      return checkWinDirection({i: 0, j: -1}, {i: 0, j: 1});
    }

    function checkDiagonal1() {
      return checkWinDirection({i: 1, j: 1}, {i: -1, j: -1});
    }

    function checkDiagonal2() {
      return checkWinDirection({i: 1, j: -1}, {i: -1, j: 1});
    }

    return checkVertical() || checkHorizontal() || checkDiagonal1() || checkDiagonal2();
  }
}