import * as React from "react"
import { Dispatch, bindActionCreators } from "redux"
import { createCRUD, containers, utils } from 'pouchdb-redux-helper'

import { localPlayground } from './db'
import Entry, { EntryList } from '../Entry'

const db = localPlayground();
(window as any).db = db;

const entriesCrud = createCRUD(db, 'entries', 'blei-lab-associated-press', {
  'startkey': '',
  'endkey': '\uffff',
})

const reducers = {
  [entriesCrud.mountPoint]: entriesCrud.reducer,
}

const singleItem = containers.connectSingleItem(
  entriesCrud,
  {},
  (state: any) => ({
    singleItemOpts: {docId: state.router.params.id},
  })
)

const EntryContainer = singleItem(Entry)

const EntryListContainer = containers.connectList(
  entriesCrud,
  {
    folder: 'all',
    propName: 'entries',
  }
)(EntryList)

export { reducers, EntryListContainer, EntryContainer }