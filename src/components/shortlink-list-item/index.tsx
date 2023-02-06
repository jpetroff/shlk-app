import styles from './styles-shortlink-list-item.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import LinkTools from '../../js/link.tools'
import Link, { LinkColors } from '../link'

enum ActionLabels {
  copy = 'Copy',
  copied = 'Copied!',
  open = 'Open'
}

type Props = {
  hash: string
  location: string
  descriptor?: {
    userTag?: string
    descriptionTag: string
  }
  timestamp: number
  siteTitle?: string
  siteDescription?: string
  urlMetadata?: AnyObject
  snooze?: {
    awake: number
    description: string
  }
  tags?: string[]
}

const ShortlinkListItem : React.FC<Props> = (
  {
    location,
    hash,
    descriptor,
    timestamp,
    siteTitle,
    siteDescription,
    urlMetadata
  } : Props
) => {
  const globalClass = `${styles.wrapperClass}_shortlink-item`
  const shortlinkItemClasses = classNames({
    [`${globalClass}`]: true
  })
  const shortlink = descriptor?.descriptionTag && descriptor.descriptionTag != '' ? 
                    LinkTools.generateDescriptiveShortlink( descriptor ) :
                    LinkTools.generateShortlinkFromHash(hash)

  const displayShortlink = LinkTools.makeDisplayUrl(shortlink)
  const displayUrl = LinkTools.makeDisplayUrl(location)

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {

  }

  return (
    <div className={`${shortlinkItemClasses}`}>
      <Link
        onClick={handleClick}
        className={`${globalClass}__display-shortlink`} 
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
        className={`${globalClass}__display-full-link`} 
        href={location}
        colorScheme={LinkColors.USER}
        >
        <span className={`${globalClass}__full-link__span`}>{displayUrl}</span>
        <span className={`${globalClass}__separator`} >·</span>
        <span className={`${globalClass}__action-hint`}>{ActionLabels.open}</span>
      </Link>
    </div>
  )
}

export default ShortlinkListItem