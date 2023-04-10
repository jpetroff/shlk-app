import styles from './styles-page.less'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../components/link'

import Header from '../apps/Header'
import Footer from '../apps/Footer'
import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize, Google, Logo, LogoC } from '../components/icons'
import Button, { ButtonSize, ButtonType } from '../components/button'
import Video from '../components/video'

const config = require('../js/config')

const Login : React.FC = () => {
  const globalClass = styles.loginClass + '_login'
  const navigate = useNavigate()
  const router = useRouter()

  return (
    <div className={`${globalClass}`}>
      <Header backButton='/' title='Log in' />
      <div className={`${globalClass}__layout`}>
        <div className={`${globalClass}__body`}>
          <Link to='/' className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></Link>

          <div className={`${globalClass}__login_content`}>
            <Video className={`${globalClass}__video`}
              thumbnail={`/assets/shlk_logo.jpg`}
              src={
                [{link:'/assets/shlk_logo.mp4', type:'video/mp4'}]
              }
              aspectRatio={1200/360}
              timeout={1000}
              />
            <span className={`${globalClass}__intro_text`}>
              Create account using Google<br/>or log into an exiting one
            </span> 
            <Button
              href='/oauth/google'
              label='Log in with Google'
              size={ButtonSize.LARGE}
              type={ButtonType.PRIMARY}
              icon={Google}
              />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login