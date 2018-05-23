import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();

const defaultState = {};
const middlewares = [sagaMiddleware];

export const Store = createStore(
  combineReducers({
    reducer: rootReducer,
    routing: routerReducer
  }),
  	defaultState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);