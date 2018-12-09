import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(/* initialState */) {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware /*, logger */));

  return store;
}

const store = configureStore();

sagas.forEach(sagaMiddleware.run);

export default store;
