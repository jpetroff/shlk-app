import styles from './styles-shortlink-list.less'
import * as React from 'react'
import * as _ from 'underscore'
import Input from '../../components/input'
import ShortlinkListItem from '../../components/shortlink-list-item'
import shortlinkQueries from '../../js/shortlink.gql'
import classNames from 'classnames'
import { Search } from '../../components/icons'
import dateTimeTools, { DateGrouped } from '../../js/datetime.tools'
import RadioGroup from '../../components/radio-group'
import { NavigateFunction } from 'react-router-dom'

type ShortlinkDisplayListItem = DateGrouped<Partial<ShortlinkDocument>> & {isSubheader?: boolean, timestamp?: any}

enum LoadMode {
  append = 'append',
  replace = 'replace'
}

export enum ShortlinkListSubsection {
  all = 'created',
  snoozed = 'snoozed'
}

type Props = {
  limit?: number,
  navigate: NavigateFunction,
  router: PageRouterProps
}

type State = {
  shortlinks: ShortlinkDocument[],
  groupedShortlinks: ShortlinkDisplayListItem[]
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
      groupedShortlinks: [],
      searchQuery: '',
      pointer: 0,
      limit: props.limit || 30,
      staleResults: false
    }
    this.loadShortlinks(LoadMode.append)
    _.bindAll(this, ..._.functions(this))
  }

  onSearch(value: string, event: React.SyntheticEvent<any>, isClear : boolean) {
    this.loadShortlinks(LoadMode.replace)
  }

  onSearchQueryChange(value: string, event: React.SyntheticEvent<any>, isClear: boolean) {
    this.setState({ searchQuery: value, staleResults: true })
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if(this.getSubsection() != this.getSubsection(prevProps.router.location.pathname)) 
      this.loadShortlinks(LoadMode.replace)
  }

  private getSubsection(_pathname?: string) : ShortlinkListSubsection {
    const pathname = _pathname ? _pathname : this.props.router.location.pathname
    if(pathname == '/app')
      return ShortlinkListSubsection.all

    if(pathname == '/app/snoozed')
      return ShortlinkListSubsection.snoozed
  }

  async loadShortlinks(load: LoadMode) {
    let params : AnyObject
    if(this.getSubsection() == ShortlinkListSubsection.snoozed) {
      params = { 
        search: this.state.searchQuery || undefined,
        skip: load == LoadMode.replace ? 0 : this.state.pointer,
        limit: this.state.limit,
        isSnooze: true,
        sort: 'snooze.awake',
        order: '1'
      }
    } else {
      params = { 
        search: this.state.searchQuery || undefined,
        skip: load == LoadMode.replace ? 0 : this.state.pointer,
        limit: this.state.limit
      }
    }
    const result = await shortlinkQueries.getUserShortlinks(params)

    const dateGroupKey = this.getSubsection() == ShortlinkListSubsection.snoozed ? ['snooze', 'awake'] : ['updatedAt']
    const _enrichedLabelGroups = dateTimeTools.groupDatedItems(result, dateGroupKey)
    let groupedShortlinks : Array<ShortlinkDisplayListItem> = []
    _.each(_enrichedLabelGroups, (item, index, array) => {
      if (index == 0 || array[index - 1].group != item.group) {
        groupedShortlinks.push({isSubheader: true, group: item.group})
      }
      groupedShortlinks.push( _.extend({timestamp: item.updatedAt || item.createdAt || null}, item) )
    })
    this.setState({
      pointer: load == LoadMode.replace ? 0 : this.state.shortlinks.length + result.length,
      shortlinks: load == LoadMode.replace ? result : Array().concat(this.state.shortlinks, result),
      groupedShortlinks,
      staleResults: false
    })
  }

  handleInternalNavigate(key: string) {
    if(key == ShortlinkListSubsection.all)
      this.props.navigate('/app')

    if(key == ShortlinkListSubsection.snoozed)
      this.props.navigate('/app/snoozed')
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
          <RadioGroup
            items={[
              {label: 'All links', key: ShortlinkListSubsection.all},
              {label: 'Snoozed links', key: ShortlinkListSubsection.snoozed}
            ]}
            value={this.getSubsection()}
            onChange={(key) => { this.handleInternalNavigate(key) } }
            fullWidth={true}
            />
        </div>
        <div className={`${globalClass}__list`}>
          { 
            this.state.groupedShortlinks.map( (item, index, array) => {
              console.log(item)
              if(item.isSubheader) {
                return <span key={index} className={`${globalClass}__subheader`}>{item.group}</span>
              } else {
                return (
                  <ShortlinkListItem key={index}
                    timestamp={item.timestamp}
                    {..._.omit(item, 'hash', 'location')}
                    hash={item.hash}
                    location={item.location}
                  />
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}