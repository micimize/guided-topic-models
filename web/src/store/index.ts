import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { logger } from './utils'
import * as uuid from 'uuid'
import { DataFlow } from '../Entry'
import PouchMiddleware, { Path, Document } from 'pouch-redux-middleware'
import PouchDB from 'pouchdb'

function localPlayground(){
  return new PouchDB(
    localStorage.getItem('playgroundDb') || (() => {
      let _uuid = uuid()
      localStorage.setItem('playgroundDb', _uuid)
      return _uuid
    })()
  )
}

type DBActions = {
  remove(doc: Document): Action
  update(doc: Document): Action
  insert(doc: Document): Action
}

export default function configureStore() {
  const playground = PouchMiddleware({
    path: '/entries',
    db: localPlayground(),
    actions: DataFlow.actions as DBActions,
    query: {
    }
  })

  const store = createStore(
    combineReducers({
      entries: DataFlow.reducer
    }),
    { entries: [] },
    applyMiddleware(logger, playground),
  )
  return store
}
