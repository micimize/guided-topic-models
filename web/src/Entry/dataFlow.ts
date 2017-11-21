import * as redux from 'redux'
import E from './Entry'
import EntryList from './EntryList'

import { DBCreators, DBAction } from '../store/actions'

namespace DataFlow {

  type Entry = E.Data

  export type T = Entry
  export type State = EntryList.Data

  export enum ActionType {
    Insert = 'INSERT_ENTRY',
    Update = 'UPDATE_ENTRY',
    Remove = 'REMOVE_ENTRY',
  }

  export type Action = DBAction<Entry, typeof ActionType>

  export const actionCreators = DBCreators<Entry, typeof ActionType>(ActionType)

  export function reducer(state: State = [], { type, payload }: Action): State {
    switch (type) {
      case ActionType.Insert:
        return [...state, payload as Entry]
      case ActionType.Update:
        return state.map(e => e._id === payload._id ? { ...e, ...payload } : e)
      case ActionType.Remove:
        return state.filter(e => payload._id !== e._id)
    }
    return state
  }
}

export default DataFlow