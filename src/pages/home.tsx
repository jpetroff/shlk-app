import styles from './styles-page.less'

import { useLocation, useNavigate, useParams } from 'react-router'
import * as React from 'react'

import Header from '../apps/Header'
import ShortlinkBar from '../apps/ShortlinkBar'
import Footer from '../apps/Footer'
import { useExtension, useRouter } from './page-hooks'

const config = require('../js/config')

const Home : React.FC = () => {
  const globalClass = styles.homeClass + '_home'
  const router = useRouter()
  const extension = config.target == 'extension' ? useExtension() : undefined

  

  return (
    <div className={`${globalClass}`}>
      <Header />
      <ShortlinkBar router={ router } extension={ extension }/>
      <Footer />
    </div>
  )
}

export default Home