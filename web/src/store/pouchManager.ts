import { Middleware } from 'redux'
import * as PouchDB from 'pouchdb'
import * as PouchMiddleware from 'pouch-redux-middleware'

interface PouchManager {
  connectIfLoggedIn: Middleware,
  watchingForLogin: Function,
  watchingForLogout: Function,
  pouchMiddleware?: Middleware,
  db?: any,
  store?: Object
}

export default function newPouchManager({ prefix, path, dbName, actions, fromJSON }) : PouchManager {
  let pouchManager: PouchManager = {
    connectIfLoggedIn(store){
      pouchManager.store = store
      return next => action => pouchManager[
        `watchingFor${pouchManager.pouchMiddleware ? 'Logout': 'Login'}`
      ](next)(action)
    },
    watchingForLogin(next) {
      return action => {
        if (action.type === 'LOGIN') {
          let path = '/entries'
          let dbUrl = action.payload.userDBs[dbName]
          pouchManager.db = new PouchDB(dbUrl)
          pouchManager.db.transform({ outgoing: fromJSON })
          let paths = {
            path,
            prefix: 'entry',
            actions,
            db: pouchManager.db
          }
          pouchManager.pouchMiddleware = PouchMiddleware(paths)(pouchManager.store)
        }
        return next(action)
      }
    },
    watchingForLogout(next) {
      return action => {
        if (action.type === 'LOGOUT') {
          pouchManager.db.close()
          delete pouchManager.pouchMiddleware
          next(action)
        } else {
          return pouchManager.pouchMiddleware(next)(action)
        }
      }
    }
  }
  return pouchManager
}

