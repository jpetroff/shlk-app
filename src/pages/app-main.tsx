import styles from './styles-page.less'

import * as React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import Header from '../apps/Header'
import Footer from '../apps/Footer'
import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize } from '../components/icons'
import Button, { ButtonSize, ButtonType } from '../components/button'
import classNames from 'classnames'
import AppContext from '../js/app.context'

const config = require('../js/config')

const AppMain : React.FC = () => {
  const globalClass = styles.appMainClass + '_app-main'
  const shortlinkPageClasses = classNames({
    [`${globalClass}`]: true
  })
  const router = useRouter()
  const navigate = useNavigate()
  const appContext = React.useContext(AppContext)

  React.useEffect( () => {
    if(!appContext.user?.email) navigate('/login')
  })

  return (
    <div className={`${shortlinkPageClasses}`}>
      <Header backButton='/' title='My Links' sticky={true} />
        <div className={`${globalClass}__layout`}>
          <div className={`${globalClass}__body`}>
            <RouterLink to='/' className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></RouterLink>

          </div>
        </div>
      <Footer />
    </div>
  )
}

export default AppMain