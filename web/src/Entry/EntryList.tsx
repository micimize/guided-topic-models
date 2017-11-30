import * as React from 'react'
import { Link } from 'react-router-dom'
import { replace } from 'react-router-redux'
import InfiniteScroll  = require('react-infinite-scroller')
import Entry from './Entry'
(window as any).replace = replace

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
  }
}

class Scroll extends React.Component<any, {}> {
  render() {
    let { location, next, dispatch, children, ...props } = this.props
    return (
      <InfiniteScroll
        {...props}
        pageStart={0}
        loadMore={() => dispatch(replace({ state: { startkey: next } }))}
        hasMore={Boolean(next)}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
        { children }
      </InfiniteScroll>
    )
  }
}

class EntryList extends React.Component<EntryList.Props & any, {}> {
  componentWillUnmount(){
    debugger;
  }
  render(){
    let props = (this.props as any)
    let entries = props.entries ? props.entries : []
    const next = props.folderVars ?
      this.props.folderVars.get('next') :
      ''
    let { location, dispatch } = this.props
    return (
      <div className='sidebar'>
        <Scroll next={next} {...{ location, dispatch }} >
          <ol className='entry-list'>
            {entries.map((e: Entry.Props, i: number) =>
              <li key={e._id || i} >
                <Link to={`/${e._id || i}`}>{e.text}</Link>
              </li>
            )}
          </ol>
        </Scroll>
      </div>
    )
  }
}

export default EntryList