import * as React from 'react'
import Entry from './Entry'

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
  }
}

function ListItem(entry: Entry.Props, index: number){
  return (
    <li key={index}>
      <Entry {...entry}/>
    </li>
  )
}

class EntryList extends React.Component<EntryList.Props, {}> {
  append = () => {
    let { date } = this.state
    this.props.insert({ date, title: `Entry for ${date}`, text: '' })
  }
  render(){
    let { entries } = this.props
    return (
      <ol>
        { entries.map(ListItem) }
        <li>
          <div>
            <button onClick={this.append}>+ new entry</button>
          </div>
        </li>
      </ol>
    )
  }
}

export default EntryList