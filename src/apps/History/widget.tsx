import styles from './styles-history.less'
import * as React from 'react'
import * as _ from 'underscore'
import {ShortlinkLocal, TCachedLink} from '../../js/cache'
import clipboardTools from '../../js/clipboard.tools'
import Link, { LinkColors } from '../../components/link'
import LinkTools from '../../js/link.tools'
import classNames from 'classnames'

type Props = {
  list: TCachedLink[],
  totalCount?: number
}

enum ActionLabels {
  copy = 'Copy',
  copied = 'Copied!',
  open = 'Open'
}

const HistoryWidget : React.FC<Props> = (
  {
    list,
    totalCount = 0
  } : Props
) => {
  const globalClass = styles.widgetWrapper+'_history-widget'
  const widgetClasses = classNames({
    [`${globalClass}`]: true
  })
  const [activeKey, setActiveKey] = React.useState<number | null>(null)

  const handleClick = (url: string, key: number, event?: React.MouseEvent) => {
    if(clipboardTools.enabled) clipboardTools.copy(url)
    setActiveKey(key) 
  }

  React.useEffect( () => {
    if(activeKey == null) return 
    const timeout = setTimeout( () => { setActiveKey(null) }, parseInt(styles.swapDuration))

    return () => { clearTimeout(timeout)}
  }, [activeKey])

  if(totalCount == 0) return(<></>)
  return (
    <div 
      className={`${widgetClasses}`}
    >	
      <div className={`${globalClass}__header`}>Last created shortlinks</div>
      <div className={`${globalClass}__link-list`}>
        {list.map( (item: TCachedLink, key: number) => {
          if(!item.hash) return null
          const shortlink = item.descriptor?.descriptionTag && item.descriptor.descriptionTag != '' ? 
                            LinkTools.generateDescriptiveShortlink( item.descriptor ) :
                            LinkTools.generateShortlinkFromHash(item.hash)

          const displayShortlink =  item.descriptor?.descriptionTag && item.descriptor.descriptionTag != '' ? 
                                    LinkTools.makeDisplayShortlink( item.descriptor ) :
                                    LinkTools.makeDisplayShortlink( item.hash )

          const url = item.location
          const displayUrl = LinkTools.makeDisplayUrl(item.location)

          return (
          <div 
            className={`${globalClass}__link-block`} 
            key={key}
            >
            <Link
              onClick={(event) => handleClick(shortlink, key, event)}
              className={`${globalClass}__shortlink ${activeKey == key ? globalClass+'__shortlink_anim-active' : ''}`} 
            >
              <span className={`${globalClass}__shortlink__span`}>{displayShortlink}</span>
              <span className={`${globalClass}__separator`} >·</span>
              <span className={`${globalClass}__action-hint`}>
                <span className={`${globalClass}__action-hint__animated-inner`}>
                  {ActionLabels.copy}<br/>
                  {ActionLabels.copied}
                </span>
              </span>
            </Link>
            <Link  
              className={`${globalClass}__full-link`} 
              href={url}
              colorScheme={LinkColors.USER}>
                <span className={`${globalClass}__full-link__span`}>{displayUrl}</span>
            </Link>
          </div>) 
        })}
      </div>
    </div>
  )
}

export default HistoryWidget