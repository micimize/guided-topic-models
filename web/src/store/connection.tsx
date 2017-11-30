/*
    TODO
    This entrie file is a hack. pouchdb-redux-helper should be forked and reworked
*/
import * as React from "react"
import { connect } from "react-redux"
import { parse } from 'query-string'
import { createCRUD, containers, utils, paginate } from 'pouchdb-redux-helper'

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
  (state: any, { match: { params } }: any) => ({
    singleItemOpts: { docId: `${params.corpus}/${params.id}`},
  })
)

const EntryContainer = singleItem(({ item, ...props }: Entry.Props & { item: any }) =>
  <Entry {...props} {...item ? item.toJS() : {}} />
)

const EntryListContainer = paginate({},
  entriesCrud,
  {
    folder: 'all',
    propName: 'items',
  },
  (state: any) => {
    let { startkey = '' } = state.router.location.state || {}
    return {
      rowsPerPage: 10,
      startkey,
      location: state.router.location,
      entries: Object.values(state.entries.get('documents').toJS())
    }
  }
)(EntryList)

export { reducers, EntryListContainer, EntryContainer }