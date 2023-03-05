import styles from './styles-page.less'

import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../components/link'
import * as _ from 'underscore'

import Header, { HeaderPosition } from '../apps/Header'
import Footer from '../apps/Footer'
import UserSettings from '../apps/UserSettings'

import { useRouter } from './page-hooks'
import Icon, { CaretLeft, IconSize } from '../components/icons'
import classNames from 'classnames'
import AppContext from '../js/app.context'

type Props = {

}

const Profile : React.FC<Props> = (
  {

  } : Props
) => {
  const router = useRouter()
  const navigate = useNavigate()
  const appContext = React.useContext(AppContext)
  const globalClass = styles.profileClass + '_profile'
  const profileClasses = classNames({
    [`${globalClass}`]: true
  })

  React.useEffect( () => {
    if(!appContext.user?.email) {
      navigate('/login')
    }
  })

  return (
    <div className={`${profileClasses}`}>
      <Header backButton='/' title='My profile' position={HeaderPosition.sticky} />
      <div className={`${globalClass}__layout`}>
        <div className={`${globalClass}__body`}>
          <Link to='/' className={`narrow-body__back-button`}><Icon useIcon={CaretLeft} size={IconSize.LARGE} /></Link>
          <UserSettings router={router} context={appContext} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile