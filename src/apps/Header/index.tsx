import styles from './styles-header.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import Icon, { Logo, LogoC, Avatar, IconSize, CaretLeft } from '../../components/icons'
import { checkMobileMQ } from '../../js/utils'
import AppContext from '../../js/app.context'

import Link from '../../components/link'


type Props = {
  backButton?: string
  title?: string
  sticky?: boolean
}

type State = {}

const Header : React.FC<Props> = (
  { backButton, title, sticky } : Props
) => {
	const isMobile: boolean = checkMobileMQ()
  const appContext = React.useContext(AppContext)
  const hasLoggedUser = !_.isEmpty(appContext.user)
  const navigate = useNavigate()

  const loginLink = hasLoggedUser ? '/app' : '/login'

  const globalClass = `${styles.wrapperClass}_app-header`
  const headerClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_logged-user`]: hasLoggedUser,
    [`${globalClass}_has-avatar`]: !!appContext.user?.avatar,
    [`${globalClass}_has-back-button`]: !!backButton,
    [`${globalClass}_sticky`]: sticky
  })

  return (
    <div className={`${headerClasses}`}>
      {backButton && (
        <div className={`${globalClass}__back_wrapper`}>
          <div onClick={() => navigate(backButton)}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></div>
        </div>
      )}
        <div className={`${globalClass}__logo_wrapper`} onClick={() => navigate('/')} >
          <Logo className={`${globalClass}__logo ${globalClass}__logo_d`} />
          <LogoC className={`${globalClass}__logo ${globalClass}__logo_m`} />
        </div>
        <div className={`${globalClass}__middle`}>
          {title && (
            <div className={`${globalClass}__title_wrapper`}>
              <span className={`${globalClass}__sub-header`}>shlk.cc</span>
              <h1 className={`${globalClass}__header`}>{title}</h1>
            </div>
          )}
        </div>
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