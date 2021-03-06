import _ from 'underscore';
import {
  combineReducers
} from 'redux';

import * as data from './data';

import {
  getBingoCount
} from './utility';

import {
  MARK_SQUARE,
  UNMARK_SQUARE
} from './actions';

function users(state=data.USERS, action) {
  return state;
}

function markSquare(boards, action, isMarked) {
  let userId = action.user.id;
  let board = boards[userId];
  let index = _.findIndex(board.squares, {
    userId: action.square.userId
  });
  let squares = board.squares.map((square, i) => {
    if (i === index) {
      return {
        ...square,
        isMarked: isMarked
      };
    } else {
      return {
        ...square
      };
    }
  });
  return {
    ...boards,
    [userId]: {
      bingoCount: getBingoCount(squares),
      squares: squares
    }
  };
}

function boardsByUser(state=data.BOARDS, action) {
  switch (action.type) {
    case MARK_SQUARE:
      return markSquare(state, action, true);
    case UNMARK_SQUARE:
      return markSquare(state, action, false);
  }
  return state;
}

export default combineReducers({
  users,
  boardsByUser
});
