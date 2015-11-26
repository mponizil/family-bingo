export function getBingoCount(board) {
  let count = 0;

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
      count++;
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
      count++;
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
    count++;
  }

  // Diagonal right to left
  function checkDiagonalR2L() {
    for (let i = 0; i < 5; i++) {
      if (!board[(i + 1) * 5 - (i + 1)].isMarked) {
        return false;
      }
    }
    return true;
  }
  if (checkDiagonalR2L()) {
    count++;
  }

  return count;
}
