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
  copied = 'Copied',
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
              className={`${globalClass}__shortlink`}
              suffix={`${ActionLabels.copy}+${ActionLabels.copied}`}
            >
              <span className={`${globalClass}__shortlink__label`}>{displayShortlink}</span>
            </Link>
            <Link  
              className={`${globalClass}__full-link`} 
              href={url}
              colorScheme={LinkColors.USER}>
                <span className={`${globalClass}__full-link__label`}>{displayUrl}</span>
            </Link>
          </div>) 
        })}
      </div>
    </div>
  )
}

export default HistoryWidget