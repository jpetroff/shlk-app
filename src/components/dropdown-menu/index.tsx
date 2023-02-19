import styles from './styles-dropdown-menu.less'

import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import * as _ from 'underscore'
import classNames from 'classnames'

export enum DropdownPosition {
  top = 'top',
  left = 'left',
  bottom = 'bottom',
  right = 'right',
  wide = 'wide'
}

type Props = {
  show: boolean
  position?: [DropdownPosition, DropdownPosition]
  onClose: () => void,
  className?: string
}

const DropdownMenu : React.FC<React.PropsWithChildren<Props>> = (
  {
    show,
    children,
    onClose,
    position,
    className
  } : React.PropsWithChildren<Props>
) => {

  const globalClass = `${styles.wrapperClass}_dropdown-menu`
  const dropdownMenuClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_${position[0]}`]: true,
    [`${globalClass}_${position[1]}`]: true,
    [`${className}`]: className
  })

  const nodeRef = React.useRef()
  const transitionDuration = parseInt(styles.appearTransition)

  function handleClickOutside(event: MouseEvent) {
    if(_.isFunction(onClose)) onClose()
  }

  React.useEffect( () => {
    if(show) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => { document.removeEventListener('click', handleClickOutside) }
  }, [show])

  return (
    <>
    <CSSTransition nodeRef={nodeRef} 
      in={show} 
      timeout={transitionDuration}
      classNames={`${globalClass}`}
    >
    <div ref={nodeRef} className={`${dropdownMenuClasses}`}> 
      {children}
    </div>
    </CSSTransition>
    </>
  )
}

DropdownMenu.defaultProps = {
  position: [DropdownPosition.bottom, DropdownPosition.wide]
}

export default DropdownMenu