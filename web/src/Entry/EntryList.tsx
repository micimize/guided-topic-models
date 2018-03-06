import * as React from 'react'
import { List, message, Spin } from 'antd';
import { Link } from 'react-router-dom'
import { replace } from 'react-router-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Entry from './Entry'

namespace EntryList {
  export type Data = Array<Entry.Data>
  export type Props = {
    entries: Data
  }
}

class Scroll extends React.Component<EntryList.Props & any, {}> {
  render() {
    let { location, next, dispatch, children, ...props } = this.props
    return (
      <InfiniteScroll
        {...props}
        pageStart={0}
        loadMore={() => dispatch(replace({ state: { startkey: next } }))}
        hasMore={Boolean(next)}
        loader={<Spin className="loader" />}
        useWindow={false}
      >
        {children}
      </InfiniteScroll>
    )
  }
}

class EntryList extends React.Component<EntryList.Props & any, {}> {
  render() {
    let props = this.props
    let entries = props.entries ? props.entries : []
    const next = ('folderVars' in props) ?
      props.folderVars.get('next') :
      ''
    let { location, dispatch } = this.props 
    return (
      <div className="sidebar">
        <Scroll next={next} {...{ location, dispatch }} >
          <List
            className="entry-list"
            dataSource={entries}
            renderItem={(entry, index) => (
              <List.Item key={entry._id || index}>
                <Link to={`/${entry._id}`}>{entry.text}</Link>
              </List.Item>
            )}
          />
        </Scroll>
      </div>
    )
  }
}

export default EntryList