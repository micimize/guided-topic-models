import * as React from 'react'
import { Link } from 'react-router-dom'
import { replace } from 'react-router-redux'
import InfiniteScroll  = require('react-infinite-scroller')
import Entry from './Entry'

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
  }
}

class Scroll extends React.Component<any, {}> {
  render() {
    let { location, next, dispatch, children } = this.props
    let loadMore = next && location ?
      () => dispatch(replace(`${location.pathname}?start=${next}`)) :
      () => null;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={Boolean(next)}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
        {children}
      </InfiniteScroll>
    )
  }
}

class EntryList extends React.Component<EntryList.Props & any, {}> {
  render(){
    let props = (this.props as any)
    let entries = props.entries ? props.entries : []
    const next = props.folderVars ?
      this.props.folderVars.get('next') :
      ''
    return (
      <ol className='entry-list'>
        <Scroll next={next} {...this.props}>
          { entries.map((e: Entry.Props, i: number) =>
            <li key={e._id || i} >
              <Link to={`/${e._id || i}`}>{ e.text }</Link>
            </li>
          ) }
        </Scroll>
      </ol>
    )
  }
}

export default EntryList