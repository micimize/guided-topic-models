import * as React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import { EntryList, DataFlow } from "./Entry"

class App extends React.Component<EntryList.Props & { actions: typeof DataFlow.actions }, {}> {
    render() {
        return <div>
            wow
            <EntryList entries={this.props.entries}/>
        </div>
    }
}

export default connect(
  (s: EntryList.Props) => s,
  dispatch => ({ actions: bindActionCreators(DataFlow.actions, dispatch) })
)(App)
