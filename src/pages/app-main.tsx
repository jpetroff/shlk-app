import styles from './styles-page.less'

import * as React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as _ from 'underscore'

import Header from '../apps/Header'
import Footer from '../apps/Footer'
import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize } from '../components/icons'
import Button, { ButtonSize, ButtonType } from '../components/button'
import classNames from 'classnames'
import AppContext from '../js/app.context'
import ShortlinkListItem from '../components/shortlink-list-item'
import metadataTools from '../js/metadata.tools'
import shortlinkQueries from '../js/shortlink.gql'

const config = require('../js/config')

const AppMain : React.FC = () => {
  const globalClass = styles.appMainClass + '_app-main'
  const shortlinkPageClasses = classNames({
    [`${globalClass}`]: true
  })
  const router = useRouter()
  const navigate = useNavigate()
  const appContext = React.useContext(AppContext)

  const [searchQuery, setSearchQuery] = React.useState('')
  const deferredSearchQuery = React.useDeferredValue(searchQuery)
  const [filter, setFilter] = React.useState<AnyObject>({})
  const [pointer, setPointer] = React.useState<number>(0)
  
  const [shortlinks, setShortlinks] = React.useState<AnyObject[]>([])

  React.useEffect( () => {
    if(!appContext.user?.email) {
      navigate('/login')
      return
    }
  })

  React.useEffect( () => {
    async function loadShortlinks() {
      const result = await shortlinkQueries.getUserShortlinks({ search: deferredSearchQuery })
      setPointer(pointer + result.length)
      setShortlinks(result)
    }
    loadShortlinks()
  }, [filter,deferredSearchQuery])

  return (
    <div className={`${shortlinkPageClasses}`}>
      <Header backButton='/' title='My Links' sticky={true} />

        <div className={`${globalClass}__layout`}>
          <div className={`${globalClass}__body`}>
            <RouterLink to='/' className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></RouterLink>
            <input onChange={(event) => setSearchQuery(event.currentTarget.value)} value={searchQuery}></input>
            <div className={`${globalClass}__shortlink-list`}>
              {shortlinks.map( (item, index) => {
                const i = _.omit(item, 'hash', 'location', 'updatedAt', 'createdAt')
                i.timestamp = item.updatedAt || item.createdAt
                console.log(i)
                return (
                  <ShortlinkListItem key={index}
                    hash={item.hash} location={item.location} timestamp={i.timestamp} {...i}
                    />
                )
              })}
            </div>
          </div>
        </div>

      <Footer />
    </div>
  )
}

export default AppMain