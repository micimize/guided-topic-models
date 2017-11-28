declare module 'pouchdb-redux-helper' {
  //import { Dispatch, Action, Middleware } from 'redux';
  import PouchDB from 'pouchdb';

  export function createCRUD(
    db: PouchDB.Database<any>,
    mountPoint: string,
    prefix?: string | null,
    opts?: {
      startkey?: string,
      endkey?: string,
    },
  ): any

  export const containers: any;
  export const utils: any;

}
