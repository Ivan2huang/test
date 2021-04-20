import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import rootReducer from './reducer';

const IS_DEV = process.env.NODE_ENV === 'development';

let store;

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  store = IS_DEV
    ? createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
      )
    : createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;

export const getStore = () => store;
