import * as React from 'react'
import Entry from './Entry'
import { Link } from 'react-router-dom'

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
  }
}

class EntryList extends React.Component<EntryList.Props, {}> {
  render(){
    let entries = this.props.entries ? (this.props.entries as any).toJS() : []
    return (
      <ol className='entry-list'>
        { entries.map((e: Entry.Props, i: number) =>
          <li>
            <Link to={`/${e._id || i}`}>{ e.text }</Link>
          </li>
        ) }
      </ol>
    )
  }
}

export default EntryList