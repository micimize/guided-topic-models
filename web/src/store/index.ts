import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { logger } from './utils'
import { DataFlow } from '../Entry'
import * as PouchMiddleware from 'pouch-redux-middleware'
import { localPlayground } from './db'

type DBActions = {
  remove(doc: PouchMiddleware.Document): Action
  update(doc: PouchMiddleware.Document): Action
  insert(doc: PouchMiddleware.Document): Action
}

export default function configureStore() {
  const playground = PouchMiddleware({
    path: '/entries',
    db: localPlayground(),
    actions: DataFlow.actionCreators as DBActions,
    query: {
      allDocs: { limit: 10 }
    }
  })

  const store = createStore(
    combineReducers({
      entries: DataFlow.reducer
    }),
    applyMiddleware(logger, playground),
  )

  return store
}
