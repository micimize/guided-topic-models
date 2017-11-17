import * as React from 'react'
import Editor from './Editor'
import Labels from './Labels'

namespace Entry {
  export type Data = Editor.Data & Labels.Data & { _id?: string }
  export type Props = Editor.Props & Labels.Props
}

class Entry extends React.Component<Entry.Props, {}> {

  render(){
    let { labels, text, onChange } = this.props
    return (
      <div className="Entry">
        <Editor {...{ text, onChange }} />
        <Labels {...{ text, labels   }} />
      </div>
    )
  }

}

export default Entry