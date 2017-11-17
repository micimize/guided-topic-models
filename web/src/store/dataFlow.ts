import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntryList from '../EntryList'

type Creator<T extends string, P> = {
  (payload: P): { type: T, payload: P } 
  name: T
}

function actionCreator<P, T extends string>(name: T): Creator<T, P> {
  let creator = <Creator<T, P>> (
    (payload: P) => ({ type: name, payload })
  )
  creator.name = name
  return creator
}

namespace Entry {
  export type Entry = EntryList.Entry
  export type List = EntryList.Data

  export enum ActionType {
    Insert = 'INSERT_ENTRY',
    Delete = 'DELETE_ENTRY',
    Update = 'UPDATE_ENTRY'
  }

  type Update = { _id: string } & Partial<Entry>

  export type Action = 
    | { type: ActionType.Insert, payload: Entry }
    | { type: ActionType.Update, payload: Update }
    | { type: ActionType.Delete, payload: Update }
  
  export const actions = {
    insert: actionCreator<Entry, ActionType.Insert>(ActionType.Insert),
    update: actionCreator<Update, ActionType.Update>(ActionType.Update),
    delete: actionCreator<Update, ActionType.Delete>(ActionType.Delete),
  }

  export function reducer(state: List = [], { type, payload }: Action): List {
    switch (type) {
      case ActionType.Insert:
        return [ ...state, payload as Entry ]
      case ActionType.Update:
        return state.map(e => e._id === payload._id ? {...e, ...payload} : e)
      case ActionType.Delete:
        return state.filter(e => payload._id !== e._id)
    }
  }
}

export default Entry