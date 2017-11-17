import * as React from "react"
import Textarea from "react-textarea-autosize"

function debounce<A>(func: (a: A) => void, wait: number) {
  let h: number
  return (a: A) => {
    clearTimeout(h)
    h = window.setTimeout(() => func(a), wait)
  }
}

namespace Editor {
  export interface Data { text: string }
  export interface Props extends Data {
    onChange: (text: string) => void
  }
}

type Props = Editor.Props

/*
 * Presumptuously assumes that it's state is better than yours
 */
class Editor extends React.Component<Props, Props> {

  constructor(props: Props) {
    super(props)
    let { text, onChange } = props
    this.state = {
      text,
      onChange: debounce(onChange, 500)
    }
  }

  componentWillReceiveProps(next: Props) {
    if( next.text != this.state.text ){
      this.state.onChange(this.state.text)
    }
  }

  edit({ target: { value: text }}: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ text })
    this.state.onChange(text)
  }

  render() {
    return <div className='editor' >
      <Textarea value={this.state.text} onChange={this.edit} />
    </div>
  }
}

export default Editor