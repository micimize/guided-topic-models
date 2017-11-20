import * as redux from 'redux'
import { connect } from 'react-redux'
import E from './Entry'
import EntryList from './EntryList'

type Creator<T extends string, P> = (payload: P) => { type: T, payload: P }

function actionCreator<P, T extends string>(name: T): Creator<T, P> {
  return (payload: P) => ({ type: name, payload })
}

namespace DataFlow {

  type Entry = E.Data

  export type T = Entry
  export type State = EntryList.Data

  export enum ActionType {
    Insert = 'INSERT_ENTRY',
    Update = 'UPDATE_ENTRY',
    Remove = 'REMOVE_ENTRY',
  }

  type Update = { _id: string } & Partial<Entry>

  export type Action = 
    | { type: ActionType.Insert, payload: Entry }
    | { type: ActionType.Update, payload: Update }
    | { type: ActionType.Remove, payload: Update }

  export const actions = {
    insert: actionCreator<Entry, ActionType.Insert>(ActionType.Insert),
    update: actionCreator<Update, ActionType.Update>(ActionType.Update),
    remove: actionCreator<Update, ActionType.Remove>(ActionType.Remove),
  }

  export function reducer(state: State = [], { type, payload }: Action): State {
    switch (type) {
      case ActionType.Insert:
        return [...state, payload as Entry]
      case ActionType.Update:
        return state.map(e => e._id === payload._id ? { ...e, ...payload } : e)
      case ActionType.Remove:
        return state.filter(e => payload._id !== e._id)
    }
  }
}

export default DataFlow