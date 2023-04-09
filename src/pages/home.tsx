import styles from './styles-page.less'

import * as React from 'react'

import Header from '../apps/Header'
import ShortlinkBar from '../apps/ShortlinkBar'
import Footer from '../apps/Footer'
import { useExtension, useRouter } from './page-hooks'
import AppContext from '../js/app.context'

const config = require('../js/config')

const Home : React.FC = () => {
  const globalClass = styles.homeClass + '_home'
  const router = useRouter()
  const extension = config.target == 'extension' ? useExtension() : undefined
  const context = React.useContext(AppContext)
  
  return (
    <div className={`${globalClass}`}>
      <Header />
      <ShortlinkBar router={ router } extension={ extension } context={ context }/>
      <Footer />
    </div>
  )
}

export default Home