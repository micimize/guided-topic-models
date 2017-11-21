import * as React from 'react'
import Entry from './Entry'
import { Signatures } from '../store/actions'

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
    actions: Signatures<Entry.Data>
  }
}

type Props = EntryList.Props

function ListItem(update: Props['actions']['update']){
  return (entry: Entry.Props, index: number) => (
    <li key={index}>
      <Entry update={update} {...entry} />
    </li>
  )
}

class EntryList extends React.Component<EntryList.Props, {}> {

  append = () => this.props.actions.insert({ labels: [], text: '' })

  render(){
    let { entries, actions } = this.props
    return (
      <ol>
        { entries.map(ListItem(actions.update)) }
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