import * as React from "react"
import { EntryList } from "./Entry"

export default class App extends React.Component<{}, {}> {
    render() {
        return <EntryList entries={[]}/>
    }
}
