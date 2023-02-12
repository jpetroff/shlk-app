import styles from './styles-page.less'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../components/link'
import * as _ from 'underscore'

import Header from '../apps/Header'
import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize } from '../components/icons'
import classNames from 'classnames'
import AppContext from '../js/app.context'
import ShortlinkList from '../apps/ShortlinkList'


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
    }
  })

  return (
    <div className={`${shortlinkPageClasses}`}>
      <Header backButton='/' title='My Links' sticky={true} />

        <div className={`${globalClass}__layout`}>
          <div className={`${globalClass}__body`}>
            <Link to='/' className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></Link>
            <ShortlinkList />
          </div>
        </div>
    </div>
  )
}

export default AppMain