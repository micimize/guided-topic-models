import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { logger } from './utils'
import * as uuid from 'uuid'
import { DataFlow } from '../Entry'
import * as PouchMiddleware from 'pouch-redux-middleware'
import PouchDB from 'pouchdb'

function localPlayground(){
  return new PouchDB('http://admin:admin@127.0.0.1:5984/' +
    localStorage.getItem('playgroundDb') || (() => {
      let _uuid = 'playground-' + uuid()
      localStorage.setItem('playgroundDb', _uuid)
      return _uuid
    })()
  )
}

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
