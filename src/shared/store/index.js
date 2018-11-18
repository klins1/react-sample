import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import rootSaga from '../sagas';
import { defaultSample, sagaSample, posts } from './reducers';
import users, { epic } from './reducers/users'

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

export const rootEpic = combineEpics(
  epic
);

const reducers = combineReducers({
  defaults: defaultSample,
  saga: sagaSample,
  posts,
  users
});

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const enhancer = composeEnhancers(
  applyMiddleware(
    createLogger(),
    epicMiddleware,
    thunk,
    sagaMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
    }))
);

const store = createStore(reducers, enhancer);

// Start redux-saga
sagaMiddleware.run(rootSaga);

// Start redux-epic middleware
epicMiddleware.run(rootEpic);

export default store;