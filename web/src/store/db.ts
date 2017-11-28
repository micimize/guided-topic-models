import * as uuid from 'uuid'
import PouchDB from 'pouchdb'

function localPlayground() {
  return new PouchDB('http://admin:admin@127.0.0.1:5984/' +
    localStorage.getItem('playgroundDb') || (() => {
      let _uuid = 'playground-' + uuid()
      localStorage.setItem('playgroundDb', _uuid)
      return _uuid
    })()
  )
}

export { localPlayground }