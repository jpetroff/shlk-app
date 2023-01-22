import styles from './styles-home.less'

import { useLocation, useNavigate, useParams } from 'react-router'
import browserApi from '../../js/browser-api'
import * as React from 'react'

import Header from '../../apps/Header'
import ShortlinkBar from '../../apps/ShortlinkBar'
import Footer from '../../apps/Footer'

const config = require('../../js/config')

const Home : React.FC = () => {
  const globalClass = styles.wrapperClass + '_page-home'
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const [activeTabUrl, setActiveTabUrl] = React.useState('')

  if(config.target == 'extension' && browserApi.isInit) {
    React.useEffect( () => { 
      function deferredStateUpdate(result) {
        console.log(result, activeTabUrl)
        setActiveTabUrl(result.url)
      }

      browserApi.getTab(true).then( deferredStateUpdate )
    })
  }

  return (
    <div className={`${globalClass}`}>
      <Header />
      <ShortlinkBar router={{ location, navigate, params }} extension={ { activeTabUrl } }/>
      <Footer />
    </div>
  )
}

export default Home