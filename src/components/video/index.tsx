import classNames from 'classnames'
import styles from './styles-video.less'
import * as React from 'react'
import * as _ from 'underscore'
import { DOMContentLoaded } from '../../js/utils'

type Props = {
  src: {link: string, type: string}[]
  thumbnail?: string
  width?: number
  height?: number
  className?: string
  aspectRatio?: number
  timeout?: number
}

const Video : React.FC<Props> = (
  {
    src,
    thumbnail,
    width,
    height,
    className,
    aspectRatio,
    timeout
  } : Props
) => {
  const [loaded, setLoaded] = React.useState(false)
  const videoNode = React.useRef<HTMLVideoElement>()
  const globalClass = `${styles.wrapperClass}_video`
  const videoClasses = classNames({
    [`${globalClass}`]: true,
    [`${className}`]: !!className
  })

  const initLazyVideo = () => {
    _.delay(() => {
      setLoaded(true)
      videoNode?.current?.load()
      // _.defer( () => videoNode?.current?.load() )
    }, timeout)
  }

  React.useEffect( () => {
    if(!loaded) DOMContentLoaded(initLazyVideo)

    return () => {
      document.removeEventListener('DOMContentLoaded', initLazyVideo)
    }
  })

  const responsiveVideoClass = !(width && height) && aspectRatio ? `${globalClass}__video-node_responsive` : ''
  const inlineStyle = aspectRatio ? { aspectRatio: aspectRatio } : {}

  return (
    <div className={`${videoClasses}`}>
      {src.length > 0 &&
        <video
          poster={thumbnail}
          ref={videoNode}
          className={`${globalClass}__video-node ${responsiveVideoClass}`} 
          autoPlay={true}
          muted={true}
          controls={false}
          preload={`none`}
          playsInline={true}
          height={height}
          width={width}
          style={inlineStyle}
          >
          {
            src.map( (sourceObj, key) => {
              return <source src={loaded ? sourceObj.link : ''} type={sourceObj.type} key={key} />
            })
          }
        </video>
      }
    </div>
  )
}

Video.defaultProps = {
  timeout: 100
}

export default Video