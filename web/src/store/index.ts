import { createStore, combineReducers, applyMiddleware, Middleware, Store, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import { actionCreators, rootReducer } from './dataFlow'
import journalDataFlows, { fromJSON } from '../journal/dataFlows'
import userDataFlows from '../user/dataFlows'
import newPouchManager from './pouchManager'


function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}

export default function configureStore() {

  let {
    insertEntry,
    batchInsertEntries,
    updateEntry,
    removeEntry,
  } = actionCreators(journalDataFlows)

  const pouchManager = newPouchManager({
    path: '/entries',
    prefix: 'entry',
    dbName: 'journal',
    actions: {
      insert: insertEntry,
      batchInsert: batchInsertEntries,
      update: updateEntry,
      remove: removeEntry,
    },
    fromJSON
  })

  const store = createStore(
    combineReducers({
      entries: rootReducer({ initialState: [], dataFlows: journalDataFlows }),
      user: rootReducer({ initialState: {}, dataFlows: userDataFlows })
    }),
    undefined,
    compose(
      applyMiddleware(logger, pouchManager.connectIfLoggedIn),
      autoRehydrate()
    )
  )
  persistStore(store)
  return store
}
