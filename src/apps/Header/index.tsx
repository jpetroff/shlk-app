import styles from './styles-header.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'

import Icon, { Logo, LogoC, Avatar, IconSize } from '../../components/icons'
import { checkMobileMQ } from '../../js/utils'
import AppContext from '../../js/app.context'

import Link from '../../components/link'


type Props = {}

type State = {}

const Header : React.FC<Props> = (

) => {
	const isMobile: boolean = checkMobileMQ()
  const appContext = React.useContext(AppContext)
  const hasLoggedUser = !_.isEmpty(appContext.user)
  const loginLink = hasLoggedUser ? '/app' : '/login'

  const globalClass = `${styles.wrapperClass}_app-header`
  const headerClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_logged-user`]: hasLoggedUser,
    [`${globalClass}_has-avatar`]: !!appContext.user?.avatar
  })

  return (
    <div className={`${headerClasses}`}>
      <div className={`${globalClass}__logo-wrapper`}>
        <Logo className={`${globalClass}__logo ${globalClass}__logo_d`} />
        <LogoC className={`${globalClass}__logo ${globalClass}__logo_m`} />
      </div>
      <div className={`${globalClass}__middle`}></div>
      <div className={`${globalClass}__user`}>
        <Link className={`${globalClass}__account-link`} isDisabled={false} to={loginLink}
        >
          {!hasLoggedUser && 
            (<>
              <div className={`${globalClass}__account-link__avatar`}><Icon useIcon={Avatar} size={IconSize.LARGE} /></div>
              <div className={`${globalClass}__account-link__text`}>Sign in</div>
            </>)
          }
          {hasLoggedUser && 
            (<>
              { appContext.user.avatar && <div className={`${globalClass}__account-link__avatar`} style={ { backgroundImage: `url(${appContext.user.avatar})` } }></div> }
              {!appContext.user.avatar && <div className={`${globalClass}__account-link__avatar`}>{_.first(appContext.user.name.toUpperCase())}</div> }
              <div className={`${globalClass}__account-link__text`}>{appContext.user.name}</div>
            </>)
          }
        </Link>
      </div>
    </div>
  )
}

export default Header