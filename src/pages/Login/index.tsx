import styles from './styles-login.less'

import { useLocation, useNavigate, useParams } from 'react-router'
import browserApi from '../../js/browser-api'
import * as React from 'react'

import Header from '../../apps/Header'
import ShortlinkBar from '../../apps/ShortlinkBar'
import Footer from '../../apps/Footer'

const config = require('../../js/config')

const Login : React.FC = () => {
  const globalClass = styles.wrapperClass + '_page-login'
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className={`${globalClass}`}>
      <Header />
      <div className={`${globalClass}__layout`}>
        Login here
      </div>
      <Footer />
    </div>
  )
}

export default Login