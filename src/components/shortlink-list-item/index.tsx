import styles from './styles-shortlink-list-item.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import LinkTools from '../../js/link.tools'
import Link, { LinkColors } from '../link'
import Button, { ButtonSize, ButtonType } from '../button'
import { MoreVertical } from '../icons'

enum ActionLabels {
  copy = 'Copy',
  copied = 'Copied'
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
    description?: string
  }
  tags?: string[]
  onContextClick?: (htmlNode: HTMLElement) => void
  onCopyClick?: () => void
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
    tags,
    onContextClick,
    onCopyClick
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
  
  const favicon = (urlMetadata?.favicons && urlMetadata?.favicons[0] && urlMetadata?.favicons[0].src) ? urlMetadata?.favicons[0].src : '/assets/default-favicon.png'

  function handleCopyClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if(_.isFunction(onCopyClick)) onCopyClick()
    return void 0
  }

  function handleContextClick(event: React.SyntheticEvent<HTMLAnchorElement, Event>, elem?: HTMLElement) {
    if(_.isFunction(onContextClick)) onContextClick(elem || null)
    return void 0
  }

  const noDescription = (siteDescription = undefined) ? `` : `${globalClass}__display-full-link_no-description`
  return (
    <div className={`${shortlinkItemClasses}`}>
      <Link  
        className={`${globalClass}__display-full-link ${noDescription}`} 
        href={location}
        colorScheme={LinkColors.USER}
        >
        <div className={`${globalClass}__display-full-link__main`}>
          <div className={`${globalClass}__display-full-link__title`}>{siteTitle}</div>
          {siteDescription && <div className={`${globalClass}__display-full-link__description`}>{siteDescription}</div>}
        </div>
        <div className={`${globalClass}__display-full-link__subheader`}>
          <img className={`${globalClass}__display-full-link__favicon`} src={favicon} />
          <span className={`${globalClass}__display-full-link__subheader__span`}>{LinkTools.makeDisplayUrl(location)}</span>
        </div>
      </Link>
      <div className={`${globalClass}__shortlink-meta`}>
        <Link
          onClick={handleCopyClick}
          className={`${globalClass}__display-shortlink`}
          suffix={`${ActionLabels.copy}+${ActionLabels.copied}`}
          >
          <span className={`${globalClass}__shortlink`}>{displayShortlink}</span>
        </Link>
        <Button
          icon={MoreVertical}
          size={ButtonSize.SMALL}
          type={ButtonType.GHOST}
          onClick={handleContextClick}
          />
      </div>
    </div>
  )
}

export default ShortlinkListItem