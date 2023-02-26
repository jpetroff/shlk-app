import styles from './styles-snooze-list.less'
import * as _ from 'underscore'
import * as React from 'react'
import Link, { LinkColors } from '../link'
import classNames from 'classnames'
import AppContext from '../../js/app.context'

type Props = {
  onSnooze: (value: string) => void
}

const SnoozeList : React.FC<Props> = (
  {
    onSnooze
  } : Props
) => {
  const globalClass = `${styles.wrapperClass}_snooze-list`
  const snoozeClasses = classNames({
    [`${globalClass}`]: true
  })
  const appContext = React.useContext(AppContext)

  return (
    <div className={`${snoozeClasses}`}>
      <div className={`${globalClass}__subheader`}>Snooze link until:</div>
      <div className={`${globalClass}__snooze-list-wrapper`}>
        {appContext.user.predefinedTimers.map( (timer, key) => {
          return (
            <div className={`${globalClass}__snooze-item`} key={key} >
              <Link
                className={`${globalClass}__link`}
                onClick={() => onSnooze(timer.value)}
              >
                {timer.label}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  ) 
}

export default SnoozeList