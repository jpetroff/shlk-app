import styles from './styles-shortlink-list.less'
import * as React from 'react'
import * as _ from 'underscore'
import Input from '../../components/input'
import ShortlinkListItem from '../../components/shortlink-list-item'
import shortlinkQueries from '../../js/shortlink.gql'
import classNames from 'classnames'
import { Search } from '../../components/icons'

type Props = {
  limit?: number
}

type State = {
  shortlinks: AnyObject[],
  searchQuery: string,
  pointer: number,
  limit: number,
  staleResults: boolean
}

export default class ShortlinkList extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      shortlinks: [],
      searchQuery: '',
      pointer: 0,
      limit: props.limit || 30,
      staleResults: false
    }
    this.loadShortlinks()
    _.bindAll(this, ..._.functions(this))
  }

  onSearch(value: string, event: React.SyntheticEvent<any>, isClear : boolean) {
    this.loadShortlinks(true)
  }

  onSearchQueryChange(value: string, event: React.SyntheticEvent<any>, isClear: boolean) {
    this.setState({ searchQuery: value, staleResults: true })
  }

  async loadShortlinks(replace: boolean = false) {
    const params = { 
      search: this.state.searchQuery || undefined,
      skip: replace ? 0 : this.state.pointer,
      limit: this.state.limit
    }
    const result = await shortlinkQueries.getUserShortlinks(params)
    this.setState({
      pointer: replace ? 0 : this.state.shortlinks.length + result.length,
      shortlinks: replace ? result : Array().concat(this.state.shortlinks, result),
      staleResults: false
    })
  }

  render() {
    const globalClass = `${styles.wrapperClass}_shortlink-list-app`
    const listClasses = classNames({
      [`${globalClass}`]: true,
      [`${globalClass}_loading`]: this.state.staleResults
    })
    return (
      <div className={`${listClasses}`}>
        <div className={`${globalClass}__search`}>
          <Input 
            onChange={this.onSearchQueryChange}
            onDebouncedChange={this.onSearch} 
            value={this.state.searchQuery} 
            placeholder='Search your links' 
            rightIcon={Search} />
        </div>
        <div className={`${globalClass}__list`}>
          {this.state.shortlinks.map( (item, index) => {
            const i = _.omit(item, 'hash', 'location', 'updatedAt', 'createdAt')
            i.timestamp = item.updatedAt || item.createdAt
            return (
              <ShortlinkListItem key={index}
                hash={item.hash} location={item.location} timestamp={i.timestamp} {...i}
                />
            )
          })}
        </div>
      </div>
    )
  }
}