import styles from './styles-link.less'
import * as React from 'react'
import * as _ from 'underscore'
import Icon, { ReactIcon, IconSize } from '../icons'
import classNames from 'classnames'
import { Flyover } from '../tooltip'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import config from '../../js/config'
import browserApi from '../../js/browser.api'
import linkTools from '../../js/link.tools'

export enum LinkColors {
  USER = 'user',
  APP = 'app'
}

type Props = {
  colorScheme?: LinkColors
  label?: string
  icon?: ReactIcon
  iconSize?: IconSize
  iconRight?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  flyover?: string
  tooltip?: TooltipProps
  to?: string,
  href?: string
} & Omit<LinkProps, 'to'>

const Link : React.FC<Props> = (
 args: Props
) => {
  const [showFlyover, setShowFlyover] = React.useState(false)

  const globalClass = styles.wrapperClass+'_link'
  const linkClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_${args.colorScheme}`]: true,
    [`${globalClass}_loading`]: args.isLoading,
    [`${globalClass}_disabled`]: args.isDisabled || args.isLoading
  })

  const handleClick : (event: React.MouseEvent<HTMLAnchorElement>) => void = (event) => {
    if(args.isDisabled || args.isLoading) {
      event.preventDefault()
      event.stopPropagation()
      return
    } 

    if(_.isFunction(args.onClick)) {
      event.preventDefault()
      event.stopPropagation()
      args.onClick(event)
    }

    if(config.target == 'extension' && args.href) {
      event.preventDefault()
      const fullUrl = new URL(args.href, linkTools.baseUrl)
      browserApi.openExternal(fullUrl.toString())
    }

    if(args.flyover) setShowFlyover(true)
  }

  const inner = (
    <>
      {args.icon && !args.iconRight && 
        <Icon useIcon={args.icon} size={args.iconSize || IconSize.SMALL} />
      }

      {args.label}{args.children}

      {args.icon && args.iconRight && 
        <Icon useIcon={args.icon} size={args.iconSize || IconSize.SMALL} />
      }

      {args.flyover && showFlyover && <Flyover label={args.flyover} onDone={() => setShowFlyover(false)} />}
    </>
  )

  const htmlAnchorAttributes = _.omit(args, 'colorScheme', 'label', 'icon', 'iconSize', 'isDisabled', 'iconRight', 'isLoading', 'flyover', 'tooltip', 'onClick', 'href', 'to')
  
  if (
    args.to && args.to != ''
  ) {
    return <RouterLink to={args.to} {...htmlAnchorAttributes} 
      className={`${linkClasses} ${args.className || ''}`}
      onClick={handleClick}>
        {inner}
      </RouterLink>
  } else {
    return <a href={args.href} {...htmlAnchorAttributes} 
    className={`${linkClasses} ${args.className || ''}`}
    onClick={handleClick}>
      {inner}
    </a>
  }
}

Link.defaultProps = {
  isDisabled: false,
  isLoading: false, 
  colorScheme: LinkColors.APP
}

export default Link