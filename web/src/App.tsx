import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { EntryContainer, EntryListContainer } from './store/connection'
import configureStore, { history } from './store/store'

import { Button } from 'antd'

let store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <EntryListContainer />
          <div className="content">
            <Route path="/:corpus/:id" component={EntryContainer} />
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(module)(App)