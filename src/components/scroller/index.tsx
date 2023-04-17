import styles from './styles-scroller.less'
import classNames from 'classnames'
import * as React from 'react'
import * as _ from 'underscore'
import { DOMContentLoaded } from '../../js/utils'

type Props = {
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number, direction?: number) => void
  padding?: number
  offsetTop?: number
  offsetBottom?: number
  hideScroll?: boolean
} & Omit<JSX.IntrinsicElements['div'], 'onScroll'>

const Scroller : React.FC<Props> = (
  args : Props 
) => {
  const wrapperRef = React.useRef<HTMLDivElement>()
  const contentRef = React.useRef<HTMLDivElement>()
  const prevScrollheight = React.useRef<number>(-1)

  const [scrollPos, setScrollPos] = React.useState(-1)
  const [scrollbarStyles, setScrollbarStyles] = React.useState({})

  const globalClass = `${styles.wrapperClass}_scroller`
  const scrollerClasses = classNames({
    [`${globalClass}`]: true,
    [`${args.className}`]: !!args.className
  })

  const internalScroll = (event?: React.UIEvent) => {
    const scrollTop = contentRef.current.scrollTop
    const scrollHeight = contentRef.current.scrollHeight
    const clientHeight = contentRef.current.clientHeight

    if(args.hideScroll) return

    if(_.isFunction(args.onScroll) && event) args.onScroll(scrollTop, scrollHeight, clientHeight, scrollTop - scrollPos)

    if(scrollHeight <= clientHeight) {
      if(scrollPos != -1) setScrollPos(-1)
      return
    }
    if(scrollTop == scrollPos && scrollHeight == prevScrollheight.current) return

    prevScrollheight.current = scrollHeight
    setScrollPos(scrollTop)
    setScrollbarStyles({ top: calcScrollbarTop(scrollPos), height: calcScrollbarHeight() })
  }

  const calcScrollbarTop = (scrollTop: number) => {
    const clientHeight = contentRef.current.clientHeight
    const scrollHeight = contentRef.current.scrollHeight

    const effectiveHeight = clientHeight - (args.offsetBottom + args.offsetTop + 2 * args.padding)

    return Math.ceil( (scrollTop / scrollHeight) * effectiveHeight ) + args.offsetTop + args.padding
  }
  const calcScrollbarHeight = () => {
    const clientHeight = contentRef.current.clientHeight
    const scrollHeight = contentRef.current.scrollHeight

    const effectiveHeight = clientHeight - (args.offsetBottom + args.offsetTop + 2 * args.padding)
    return Math.ceil(effectiveHeight * (effectiveHeight / scrollHeight))
  }

  React.useEffect( () => {
    internalScroll()
  })

  const transientProps = _.omit(args, 'onScroll', 'ref', 'className', 'padding', 'offsetTop', 'offsetBottom')
  return (
    <div
      className={`${scrollerClasses}`}
      {...transientProps}
      >
        <div 
          className={`${globalClass}__scroller-wrapper`} 
          ref={wrapperRef}>

          <div 
            className={`${globalClass}__scroller-content`}
            ref={contentRef}
            onScroll={internalScroll}
            >
            {args.children}
          </div> 
        </div>

        {
          scrollPos >= 0 &&
          <div className={`${globalClass}__scrollbar`}>
            <div className={`${globalClass}__scrollbar__pill`} style={scrollbarStyles}></div>
          </div>
        }
    </div>
  )
}

Scroller.defaultProps = {
  padding: 8,
  offsetTop: 0,
  offsetBottom: 0
}

export default Scroller