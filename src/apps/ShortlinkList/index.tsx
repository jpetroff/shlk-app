import styles from './styles-shortlink-list.less'
import * as React from 'react'
import * as _ from 'underscore'
import Input from '../../components/input'
import ShortlinkListItem from '../../components/shortlink-list-item'
import shortlinkQueries from '../../js/shortlink.gql'
import classNames from 'classnames'
import dateTimeTools, { DateGrouped } from '../../js/datetime.tools'
import RadioGroup from '../../components/radio-group'
import { NavigateFunction } from 'react-router-dom'
import DropdownMenu, { DropdownPosition } from '../../components/dropdown-menu'
import MenuItem from '../../components/menu-item'
import Scroller from '../../components/scroller'
import clipboardTools from '../../js/clipboard.tools'
import linkTools from '../../js/link.tools'

type ShortlinkDisplayListItem = DateGrouped<Partial<ShortlinkDocument>> & {isSubheader?: boolean, timestamp?: any, originalIndex: number}

enum LoadMode {
  append = 'append',
  replace = 'replace',
  none = 'none'
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
  searchQuery: string
  pointer: number
  limit: number
  staleResults: boolean
  isLoading: LoadMode
  contextMenu: {
    key: number
    top: number
    left: number
    show: boolean
  }
}

export default class ShortlinkList extends React.Component<Props, State> {
  private contextMenuRef : React.RefObject<HTMLDivElement | null>

  constructor(props) {
    super(props)
    this.state = {
      shortlinks: [],
      groupedShortlinks: [],
      searchQuery: '',
      pointer: 0,
      limit: props.limit || 8,
      staleResults: false,
      isLoading: LoadMode.none,
      contextMenu: {
        key: -1,
        top: -99999,
        left: -999999,
        show: false
      }
    }
    this.contextMenuRef = React.createRef<HTMLDivElement | null>()
    _.bindAll(this, ..._.functions(this))
  }

  onSearch(value: string, event: React.SyntheticEvent<any>, isClear : boolean) {
    this.loadShortlinks(LoadMode.replace)
  }

  onSearchQueryChange(value: string, event: React.SyntheticEvent<any>, isClear: boolean) {
    this.setState({ searchQuery: value, staleResults: true })
  }

  componentDidMount(): void {
    this.loadShortlinks(LoadMode.replace)
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

    this.setState({
      isLoading: load,
      staleResults: load == LoadMode.replace ? true : false
    })

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
    const newShortlinks = load == LoadMode.replace ? result : Array().concat(this.state.shortlinks, result)
    const groupedResult = this.groupShortlinks(newShortlinks as ShortlinkDocument[])
    
    console.log(load, result)
    this.setState({
      // pointer: load == LoadMode.replace ? 0 : this.state.shortlinks.length + result.length,
      pointer: load == LoadMode.replace ? result.length : this.state.shortlinks.length + result.length,
      shortlinks: newShortlinks,
      groupedShortlinks: groupedResult,
      staleResults: false,
      isLoading: LoadMode.none
    })

    _.defer( () => {
      console.log(load)
      console.log(this.state.shortlinks)
    })
  }

  private groupShortlinks(shortlinks: ShortlinkDocument[]) : ShortlinkDisplayListItem[] {
    const dateGroupKey = ( this.getSubsection() == ShortlinkListSubsection.snoozed ) ? ['snooze', 'awake'] : ['updatedAt']
    const _enrichedLabelGroups = dateTimeTools.groupDatedItems(shortlinks, dateGroupKey)

    let groupedShortlinks : Array<ShortlinkDisplayListItem> = []
    _.each(_enrichedLabelGroups, (item, index, array) => {
      if (index == 0 || array[index - 1].group != item.group) {
        groupedShortlinks.push({isSubheader: true, group: item.group, originalIndex: -1})
      }
      groupedShortlinks.push( _.extend({timestamp: item.updatedAt || item.createdAt || null, originalIndex: index}, item) )
    })
    return groupedShortlinks
  }

  private removeCachedShortlink(id: string) {
    const index = _.findIndex(this.state.shortlinks, {_id: id})
    console.log(id, index)
    const updatedShortlinks = this.state.shortlinks
    updatedShortlinks.splice(index, 1)
    const groupedShortlinks = this.groupShortlinks(updatedShortlinks)

    this.setState({
      pointer: this.state.pointer - 1,
      shortlinks: updatedShortlinks,
      groupedShortlinks: groupedShortlinks,
      staleResults: false
    })
  }

  handleInternalNavigate(key: string) {
    if(key == ShortlinkListSubsection.all)
      this.props.navigate('/app')

    if(key == ShortlinkListSubsection.snoozed)
      this.props.navigate('/app/snoozed')
  }

  handleContextClick(key: number, element: HTMLElement) {
    _.defer(() => {
      const top = element.offsetTop + element.offsetHeight
      const left = element.offsetLeft + element.offsetWidth
      this.setState({
        contextMenu: {
          show: true,
          top: -top,
          left: -left,
          key: key,
        }
      })
    })
  }

  handleContextPortal(isAppearing: boolean) {
    const contextMenuParams = this.contextMenuRef.current.getClientRects()
    this.setState({
      contextMenu: {
        show: true,
        top: Math.abs(this.state.contextMenu.top) - contextMenuParams[0].height,
        left: Math.abs(this.state.contextMenu.left) - contextMenuParams[0].width,
        key: this.state.contextMenu.key,
      }
    })
  }

  async handleRemoveSnoozeTimer() {
    const id = this.state.shortlinks[this.state.contextMenu.key]?._id
    const result = await shortlinkQueries.deleteShortlinkSnoozeTimer({id})
    if(result && result._id) {
      this.removeCachedShortlink(result._id)
    }
    _.defer(this.resetContextMenu)
  }

  async handleDeleteShortlink() {
    const id = this.state.shortlinks[this.state.contextMenu.key]?._id
    const result = await shortlinkQueries.deleteShortlink(id)
    console.log(result)
    if(result && result._id) {
      this.removeCachedShortlink(result._id)
    }
    _.defer(this.resetContextMenu)
  }

  private resetContextMenu() {
    this.setState({
      contextMenu: {
        key: -1,
        top: -99999,
        left: -999999,
        show: false
      }
    })
  }

  handleCopyClick(key: number) {
    if(!this.state.groupedShortlinks[key]) return

    const hash = this.state.groupedShortlinks[key].hash
    const descriptor = this.state.groupedShortlinks[key].descriptor

    const shortlink = this.state.groupedShortlinks[key].descriptor ? 
                      linkTools.generateDescriptiveShortlink(this.state.groupedShortlinks[key].descriptor) :
                      linkTools.generateShortlinkFromHash(this.state.groupedShortlinks[key].hash)

    clipboardTools.copy(shortlink)
  }

  handleScroll(scrollTop: number, scrollHeight: number, clientHeight: number, direction: number) {
    const isThreshold : boolean = (scrollTop + clientHeight) > (scrollHeight * 0.96)
    
    if(
      isThreshold && 
      this.state.isLoading == LoadMode.none && 
      direction > 0
    ) { 
      console.log('scroll load')
      this.loadShortlinks(LoadMode.append)
    }
  }

  render() {
    const globalClass = `${styles.wrapperClass}_shortlink-list-app`
    const listClasses = classNames({
      [`${globalClass}`]: true,
      [`${globalClass}_loading`]: this.state.staleResults
    })
    return (
      <div className={`${listClasses}`} >
        <div className={`${globalClass}__search`}>
          <Input 
            onChange={this.onSearchQueryChange}
            onDebouncedChange={this.onSearch} 
            value={this.state.searchQuery}
            placeholder='Search your links'
           />
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
        <Scroller className={`${globalClass}__scroller`} onScroll={this.handleScroll}>
          <div className={`${globalClass}__list`}>
            { 
              this.state.groupedShortlinks.map( (item, index, array) => {
                if(item.isSubheader) {
                  return <span key={index} className={`${globalClass}__subheader`}>{item.group}</span>
                } else {
                  return (
                    <ShortlinkListItem key={index}
                      timestamp={item.timestamp}
                      {..._.omit(item, 'hash', 'location')}
                      hash={item.hash}
                      location={item.location}
                      onCopyClick={() => this.handleCopyClick(item.originalIndex)}
                      onContextClick={(elem) => { this.handleContextClick(item.originalIndex, elem) } }
                    />
                  )
                }
              })
            }
            <DropdownMenu
              divRef={this.contextMenuRef}
              show={this.state.contextMenu.show}
              onClose={this.resetContextMenu}
              onEnter={this.handleContextPortal}
              style={ { top: this.state.contextMenu.top, left: this.state.contextMenu.left} }
              >
              <MenuItem label='Delete' onClick={this.handleDeleteShortlink}/>
              <MenuItem.Separator />
              {this.getSubsection() == ShortlinkListSubsection.snoozed && <MenuItem label='Remove snooze' onClick={this.handleRemoveSnoozeTimer}/>}
              <MenuItem isDisabled={true} label='Edit shortlink' onClick={() => {  } }/>
            </DropdownMenu>
          </div>
          <div className={`${globalClass}__list-footer`}>
            {this.state.isLoading == LoadMode.append &&  
              <div className={`${globalClass}__list-footer__loading`}>Loading more…</div>
            }
            {this.state.shortlinks.length == 0 && this.state.isLoading == LoadMode.none &&
              <div className={`${globalClass}__list-footer__empty`}>Nothing found</div>
            }
          </div>
          
        </Scroller>
      </div>
    )
  }
}