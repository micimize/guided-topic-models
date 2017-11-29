import * as React from "react"
import { Dispatch, bindActionCreators } from "redux"
import { connect } from "react-redux"
import { parse } from 'query-string'
import { createCRUD, containers, paginate, utils } from 'pouchdb-redux-helper'

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

const EntryListContainer = connect(
  (state: any) => {
    let { start: startkey = '' } = parse(state.router.location.search || '')
    return {
      startkey,
      location: state.router.location,
      entries: Object.values(state.entries.get('documents').toJS()),
    }
  }
)(({ startkey, ...props }: any) => {
  const Paginated = paginate({
      rowsPerPage: 5,
      startkey,
    },
    entriesCrud,
    {
      folder: 'all',
      propName: 'items',
    }
  )(EntryList)
  return <Paginated {...props}/>
})

export { reducers, EntryListContainer, EntryContainer }