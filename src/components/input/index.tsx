import styles from './styles-input.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import Button, { ButtonSize, ButtonType } from '../button'
import Icon, { Search, Cross, IconSize } from '../icons'
import { placeholder } from 'modernizr'

type InputEventHandler = (value: string, event?: React.SyntheticEvent<any>, isClear?: boolean ) => void

type Props = {
  onChange?: InputEventHandler
  onDeferredChange?: InputEventHandler
  onDebouncedChange?: InputEventHandler
  debounce?: number | null
  label?: string
  placeholder?: string
  leftIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  rightIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  ref?: HTMLInputElement | null

  prefix?: React.ReactElement<any> | string
  suffix?: React.ReactElement<any> | string
} & Omit<JSX.IntrinsicElements['input'], 'onChange'>

const Input : React.FC<Props> = (
  props : Props
) => {
  const debouncedFn = React.useCallback( 
    _.debounce( (fn: () => void) => {
      fn()
    }, props.debounce)
  ,[props.debounce])

  const _ref = React.useRef(props.ref)

  const isEmpty = !props.value || props.value == ''
  const globalClass = `${styles.wrapperClass}_input`
  const inputClasses = classNames({
    [`${globalClass}`]: true,
    [`${globalClass}_not-empty`]: !isEmpty,
    [`${globalClass}_has-left-icon`]: props.leftIcon,
    [`${globalClass}_has-right-icon`]: props.rightIcon
  })
  const passedProps = _.omit(props, 'className', 'onChange', 'onDebouncedChange', 'onDeferredChange', 'debounce', 'label', 'placeholder', 'leftIcon', 'rightIcon')
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(_.isFunction(props.onChange)) 
      props.onChange(event.target.value, event, false)

    if(_.isFunction(props.onDeferredChange))
      _.defer(props.onDeferredChange, event.target.value, event, false)

    if(_.isFunction(props.onDebouncedChange) && props.debounce) 
      debouncedFn( () => {
        props.onDebouncedChange(event.target.value, event, false)
      })
  }

  function handleClear(event: React.MouseEvent<HTMLAnchorElement>) {
    if(_.isFunction(props.onChange)) 
      props.onChange('', event, true)

    if(_.isFunction(props.onDeferredChange))
      _.defer(props.onDeferredChange, '', event, true)
    if(_.isFunction(props.onDebouncedChange) && props.debounce) 
      debouncedFn( () => {
        props.onDebouncedChange('', event, true)
      })
  }
  
  return (
    <label className={`${inputClasses}`} >
      {props.label && <span className={`${globalClass}__label`}>{props.label}</span>}

      <div className={`${globalClass}__input-wrapper`}>
        <div className={`${globalClass}__prefix`}>
          {props.leftIcon && 
            <Icon size={IconSize.LARGE} className={`${globalClass}__left-icon`} useIcon={props.leftIcon} />
          }

          {props.prefix}
        </div>

        <div className={`${globalClass}__input-inner`}>
          <span className={`${globalClass}__placeholder`}>{props.placeholder}</span>

          <input ref={_ref}
            className={`${globalClass}__input-element ${props.className}`}
            onChange={handleChange}
            {...passedProps}
            />
        </div>

        <div className={`${globalClass}__suffix`}>
          {props.suffix}

          {props.rightIcon && 
            <Icon size={IconSize.LARGE} className={`${globalClass}__right-icon`} useIcon={props.rightIcon} />
          }

          <Button 
            className={`${globalClass}__clear`} 
            size={ButtonSize.SMALL}
            type={ButtonType.GHOST}
            icon={Cross}
            onClick={handleClear}
            />
        </div>
      </div>
    </label>
  )
}

export default Input

Input.defaultProps = {
  debounce: 100,
  autoComplete: 'off'
}