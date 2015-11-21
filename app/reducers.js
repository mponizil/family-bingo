import _ from 'underscore';
import {
  combineReducers
} from 'redux';

import * as data from './data';

import {
  MARK_SQUARE
} from './actions';

function users(state=data.USERS, action) {
  return state;
}

function boardsByUser(state=data.BOARDS, action) {
  switch (action.type) {
    case MARK_SQUARE:
      let userId = action.user.id;
      let board = state[userId];
      let index = _.findIndex(board, {
        userId: action.square.userId
      });
      let square = board[index];
      return {
        ...state,
        [userId]: board.map((square, i) => {
          if (i === index) {
            return {
              ...square,
              isMarked: true
            };
          } else {
            return {
              ...square
            };
          }
        })
      }
  }
  return state;
}

export default combineReducers({
  users,
  boardsByUser
});
