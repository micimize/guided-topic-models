import * as React from "react"
import { Provider } from "react-redux"
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { EntryContainer, EntryListContainer } from "./store/connection"
import configureStore, { history } from "./store/store"

let store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <EntryListContainer />
          <Route path="/:id" component={EntryContainer} />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default App