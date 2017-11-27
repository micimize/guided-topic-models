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

function ListItem(
  { update, selected, select }:
  { update: Props['actions']['update'], selected: number, select: (i: number) => void }
){
  return (entry: Entry.Props, index: number) => {
    let E = <Entry update={update} {...entry} />
    return selected == index ?
        <li key={index} className='selected'>{ E }</li> :
        <li key={index} onClick={_ => select(index)}>{ E }</li>
  }
}

class EntryList extends React.Component<EntryList.Props, { selected: number }> {

  state = { selected: -1 }

  append = () => this.props.actions.insert({ labels: [], text: '' })

  render(){
    let { entries, actions: { update } } = this.props
    let selected = this.state.selected
    let select = (index: number) =>
      this.setState({ selected: index })
    return (
      <ol className='entry-list'>
        { entries.map(ListItem({ select, selected, update })) }
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