import styles from './styles-radio-group.less'
import * as React from 'react'
import Icon, { IconSize, ReactIcon } from '../icons'
import classNames from 'classnames'

type Props = {
  items: Array<{label?: string, key: string, icon?: ReactIcon}>
  onChange: (key: string) => void
  value: string
  fullWidth?: boolean
}

const RadioGroup : React.FC<Props> = (
  {
    items, 
    onChange,
    value,
    fullWidth
  } : Props
) => {
  const globalClass = `${styles.wrapperClass}_radio-group`
  const radioGroupClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_full-width`]: fullWidth
  })

  function handleClick(event, key) {
    onChange(key)
  }

  // const styleObj = fullWidth ? { width: `${100%}`}

  return (
    <div className={`${radioGroupClasses}`}>
      {items.map( (item, index) => {
        const activeClass = item.key == value ? `${globalClass}__radio-button_active` : ''
        return (
          <div 
            className={`${globalClass}__radio-button ${activeClass}`}
            onClick={(event) => handleClick(event, item.key)}
            key={item.key}
          >
            {item.icon && <Icon useIcon={item.icon} size={IconSize.SMALL} />}
            {item.label}
          </div>
        )
      } )}
    </div>
  )
}

RadioGroup.defaultProps = {
  fullWidth: false
}

export default RadioGroup