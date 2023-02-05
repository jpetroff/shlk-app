import styles from './styles-page.less'

import * as React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import Header from '../apps/Header'
import Footer from '../apps/Footer'
import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize } from '../components/icons'
import Button, { ButtonSize, ButtonType } from '../components/button'

const config = require('../js/config')

const Login : React.FC = () => {
  const globalClass = styles.loginClass + '_login'
  const navigate = useNavigate()
  const router = useRouter()

  return (
    <div className={`${globalClass}`}>
      <Header />
      <div className={`${globalClass}__layout`}>
        <div className={`${globalClass}__body`}>
        <div onClick={() => navigate(-1)} className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></div>
          <Button
            href='/oauth/google'
            label='Log in with Google'
            size={ButtonSize.LARGE}
            type={ButtonType.PRIMARY}
            />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login