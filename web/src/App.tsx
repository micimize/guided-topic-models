import * as React from "react"
import { Provider } from "react-redux"
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { EntryContainer, EntryListContainer } from "./store/connection"
import configureStore, { history } from "./store/store"

import Button from 'antd/lib/button'


let store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
        <Button type="primary">Button</Button>
          <EntryListContainer />
          <div className='content'>
            <Route path="/:corpus/:id" component={EntryContainer} />
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default App