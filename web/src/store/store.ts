import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { logger } from './utils'
import { reducers } from './connection'

export const history = createHistory()

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(logger, thunk, routerMiddleware(history)),
  )
}
