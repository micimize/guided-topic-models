import * as uuid from 'uuid'

type Update<Doc extends object> = { _id: string } & Partial<Doc>
type Full<Doc extends object> = { _id: string } & Doc

type Creator<P, T extends string> = (payload: P) => { type: T, payload: P }

function Creator<P, T extends string>(name: T): Creator<P, T> {
  return (payload: P) => ({ type: name, payload })
}

interface DBActionType {
  Insert: string,
  Update: string,
  Remove: string
}

type Wrapped<I> = (input: I) => void
type Signatures<Doc extends object> = {
  insert: Wrapped<Doc>,
  update: Wrapped<Update<Doc>>,
  remove: Wrapped<Update<Doc>>,
}

type DBAction<Doc extends object, AT extends DBActionType> = 
  | { type: AT['Insert'], payload: Doc }
  | { type: AT['Update'], payload: Update<Doc> }
  | { type: AT['Remove'], payload: Update<Doc> }


type DBCreators<Doc extends object, As extends DBActionType> = {
  insert: Creator<Doc, As['Insert']>,
  update: Creator<Update<Doc>, As['Update']>,
  remove: Creator<Update<Doc>, As['Remove']>,
}

function isFull<Doc extends object>(doc: Doc): doc is Full<Doc> {
  let d: any = doc
  return d._id !== undefined && d._id !== null
}

function DBCreators<Doc extends object, AT extends DBActionType>(ActionType: AT): DBCreators<Doc, AT> {
  type U = Update<Doc>
  return {
    insert: (doc: Doc) => {
      let payload: Full<Doc> = isFull(doc) ? doc : Object.assign({}, doc, { _id: uuid() })
      return { type: ActionType.Insert, payload }
    },
    update: Creator<U, AT['Update']>(ActionType.Update),
    remove: Creator<U, AT['Remove']>(ActionType.Remove),
  }
}

export { Update, Creator, DBActionType, DBAction, DBCreators, Signatures }