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
    urlMetadata,
    snooze,
    tags
  } : Props
) => {
  const globalClass = `${styles.wrapperClass}_shortlink-item`
  const shortlinkItemClasses = classNames({
    [`${globalClass}`]: true
  })
  const shortlink = descriptor?.descriptionTag && descriptor.descriptionTag != '' ? 
                    LinkTools.generateDescriptiveShortlink( descriptor ) :
                    LinkTools.generateShortlinkFromHash(hash)

  const displayShortlink =  descriptor?.descriptionTag && descriptor.descriptionTag != '' ? 
                            LinkTools.makeDisplayShortlink( descriptor ) :
                            LinkTools.makeDisplayShortlink(hash)

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {

  }

  return (
    <div className={`${shortlinkItemClasses}`}>
      <Link  
        className={`${globalClass}__display-full-link`} 
        href={location}
        colorScheme={LinkColors.USER}
        >
        <div className={`${globalClass}__display-full-link__subheader`}>
          {urlMetadata?.favicons && (
            <img className={`${globalClass}__display-full-link__favicon`} src={urlMetadata?.favicons[0].src} />
          )}
          {LinkTools.makeDisplayUrl(location)}
        </div>
        <div className={`${globalClass}__display-full-link__main`}>
          <div className={`${globalClass}__display-full-link__title`}>{siteTitle}</div>
          <div className={`${globalClass}__display-full-link__description`}>{siteDescription}</div>
        </div>
      </Link>
      <Link
        onClick={handleClick}
        className={`${globalClass}__display-shortlink`} 
        >
        <span className={`${globalClass}__shortlink`}>{displayShortlink}</span>
        <span className={`${globalClass}__separator`} >·</span>
        <span className={`${globalClass}__action-hint`}>
          <span className={`${globalClass}__action-hint__animated-inner`}>
            {ActionLabels.copy}<br/>
            {ActionLabels.copied}
          </span>
        </span>
      </Link>
      {(tags || snooze) &&
        <div className={`${globalClass}__display-full-link__app-meta`}></div>
      }
    </div>
  )
}

export default ShortlinkListItem