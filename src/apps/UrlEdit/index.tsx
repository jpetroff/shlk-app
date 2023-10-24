import styles from './styles-url-edit.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import Input from '../../components/input'
import Icon, { IconSize, LinkIcon } from '../../components/icons'
import Button, {ButtonSize, ButtonType} from '../../components/button'
import AppContext from '../../js/app.context'

type Props = {
  shortlink: ShortlinkDocument
  isLoading: boolean
  onChange: (result: ShortlinkDocument) => void
  onCancel: () => void
  userContextName: string
}

const UrlEdit : React.FC< React.PropsWithChildren<Props> > = (
  props
) => {

  const [shortlink, setShortlink] = React.useState(props.shortlink)

  const userTag = shortlink.descriptor?.userTag || props.userContextName

  const globalClass = styles.wrapperClass+'_url-edit';
  const appClasses = classNames({
    [`${globalClass}`]: true
  })

  function updateShortlink(chunk: Partial<ShortlinkDocument>) {
    setShortlink(
      _.defaults({}, chunk, shortlink)
    )
  }

  return (
    <div className={`${appClasses}`}>
      <div className={`${globalClass}__url-form`}>
        <Input
          className={`${globalClass}__title-input`}
          value={shortlink.siteTitle} 
          onChange={(value, event) => updateShortlink( {siteTitle: value} ) }
          label={`Title`}
          placeholder={`Set shortlink title`}
          />
        <Input
          className={`${globalClass}__location-input`}
          value={shortlink.location}
          leftIcon={LinkIcon}
          onChange={(value, event) => updateShortlink( {location: value} ) }
          label={`Url`}
          placeholder={`Set url`}
          />
        <Input
          className={`${globalClass}__slug-input`}
          value={shortlink.descriptor?.descriptionTag || ''}
          prefix={`${userTag}@`}
          onChange={(value, event) => 
              updateShortlink( {descriptor: { userTag, descriptionTag: value} } ) 
            }
          label={`Custom shortlink`}
          placeholder={`Choose custom slug`}
          />
        <div className={`${globalClass}__url-form__controls`}>
          <Button
            size={ButtonSize.LARGE}
            type={ButtonType.SECONDARY}
            label='Cancel'
            onClick={() => props.onCancel()}
            fullWidth={true}
            />  
            <Button 
              isDisabled={!(shortlink.location && shortlink.siteTitle)}
              isLoading={props.isLoading}
              size={ButtonSize.LARGE}
              type={ButtonType.PRIMARY}
              label='Save'
              onClick={() => props.onChange(shortlink)}
              fullWidth={true}
              />
        </div>
      </div>
    </div>
  )
}

export default UrlEdit