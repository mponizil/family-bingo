export const MARK_SQUARE = 'MARK_SQUARE';
export const UNMARK_SQUARE = 'UNMARK_SQUARE';

export function markSquare({user, square}) {
  return {
    type: MARK_SQUARE,
    user,
    square
  }
}

export function unmarkSquare({user, square}) {
  return {
    type: UNMARK_SQUARE,
    user,
    square
  }
}
