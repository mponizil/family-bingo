export const MARK_SQUARE = 'MARK_SQUARE';

export function markSquare({user, square}) {
  return {
    type: MARK_SQUARE,
    user,
    square
  }
}
