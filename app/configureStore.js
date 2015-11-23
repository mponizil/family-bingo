import {
  createStore,
  applyMiddleware
} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

let logger = createLogger();
let middleware = [];

if (__DEV__) {
  middleware.push(logger);
}

let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
