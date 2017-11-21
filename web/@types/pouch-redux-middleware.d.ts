
declare module 'pouch-redux-middleware' {
  import { Dispatch, Action, Middleware } from 'redux';
  import PouchDB from 'pouchdb';

  namespace PouchMiddleware {

    export interface Document {
      _id: any;
      [field: string]: any;
    }

    export interface Path {
      path: string;
      db: PouchDB.Database<any>;
      scheduleRemove?(doc: Document): void;
      scheduleInset?(doc: Document): void;
      propagateDelete?(doc: Document, dispatch: Dispatch<any>): void;
      propagateInsert?(doc: Document, dispatch: Dispatch<any>): void;
      propagateUpdate?(doc: Document, dispatch: Dispatch<any>): void;
      handleResponse?(err: Error, data: any, errorCallback: (err: Error) => void): void;
      queue?(...args: any[]): any;
      docs?: any;
      actions: {
        remove(doc: Document): Action;
        update(doc: Document): Action;
        insert(doc: Document): Action;
      };
      query?: {
        prefix?: string,
        allDocs?: object,
        changes?: object
      }

    }
  }
  function PouchMiddleware(paths?: PouchMiddleware.Path[] | PouchMiddleware.Path): Middleware;

  export = PouchMiddleware

}
