export function checkHasBingo(board) {
  // Horizontal
  function checkRow(row) {
    for (let i = row * 5; i < (row + 1) * 5; i++) {
      if (!board[i].isMarked) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < 5; i++) {
    if (checkRow(i)) {
      return true;
    }
  }

  // Vertical
  function checkColumn(column) {
    for (let i = 0; i < 5; i++) {
      if (!board[i * 5 + column].isMarked) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < 5; i++) {
    if (checkColumn(i)) {
      return true;
    }
  }

  // Diagonal left to right
  function checkDiagonalL2R() {
    for (let i = 0; i < 5; i++) {
      if (!board[i * 5 + i].isMarked) {
        return false;
      }
    }
    return true;
  }
  if (checkDiagonalL2R()) {
    return true;
  }

  // Diagonal right to left
  function checkDiagonalR2L() {
    for (let i = 4; i >= 0; i--) {
      if (!board[i * 5 + i].isMarked) {
        return false;
      }
    }
    return true;
  }
  if (checkDiagonalR2L()) {
    return true;
  }

  return false;
}
