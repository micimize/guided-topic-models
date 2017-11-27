import * as React from 'react'
import Editor from './Editor'
import Labels from './Labels'
import "./entry.scss"

namespace Entry {
  export type Data = Editor.Data & Labels.Data & { _id?: string }

  export type Props = Editor.Props &
    Labels.Props &
    {
      _id?: string
      update: (u: Partial<Data>) => void
    }
}

class Entry extends React.Component<Entry.Props, {}> {

  render(){
    let { _id, labels = [], text, update } = this.props
    let onChange = (text: string) => update({ _id, text, labels })
    return (
      <div className="entry">
        <Editor {...{ text, onChange }} />
        <Labels {...{ text, labels   }} />
      </div>
    )
  }

}

export default Entry