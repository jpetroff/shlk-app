import styles from './styles-user-settings.less'
import * as React from 'react'
import * as _ from 'underscore'
import classNames from 'classnames'
import AppContext from '../../js/app.context'
import Input from '../../components/input'
import Button, { ButtonSize, ButtonType } from '../../components/button'
import users from '../../js/user.gql'
import Snackbar from '../../components/snackbar'

type Props = {
  router?: PageRouterProps
  context: React.ContextType<typeof AppContext>
}

type State = {
  userTag: string
  successState: {
    successMessage?: string
  }
  errorState: {
    errorMessage?: string
  }
}


export default class UserSettings extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      userTag: this.props.context.user.userTag || this.props.context.user.name || 'someone',
      successState: {},
      errorState: {}
    }
    _.bindAll(this, ..._.functions(this))
  }

  async handleSave() {
    try {
      const result = await users.updateLoggedInUser({ userTag: this.state.userTag })
      this.setState({
        userTag: result.userTag,
        successState: {
          successMessage: 'Profile updated'
        }
      })
    } catch(error) {
      this.setState({
        errorState: {
          errorMessage: `Sorry, something didn’t go well. Please, try again`
        }
      })
    }
  }

  private _clearErrorState() {
    this.setState({
      errorState: {}
    })
  }

  private _clearSuccessState() {
    this.setState({
      successState: {}
    })
  }

  private saveDisabled() {
    return !(
      this.state.userTag != ''
    )
  }

  render() {
    const globalClass = `${styles.wrapperClass}_user-settings`
    const userSettingsClasses = classNames({
      [`${globalClass}`]: true
    })
    return (
      <div className={`${userSettingsClasses}`}>
        <div className={`${globalClass}__header`}>
          <div className={`${globalClass}__header__avatar`}>
            {this.props.context.user.avatar && 
              <img className={`${globalClass}__header__img-source`} src={this.props.context.user.avatar} />
            }
          </div>
          <div className={`${globalClass}__name-block`}>
            <div className={`${globalClass}__header__name`}>
              Hello {this.props.context.user.name},
            </div>
            <div className={`${globalClass}__header__email`}>
              {this.props.context.user.email}
            </div>
          </div>
        </div>
        <div className={`${globalClass}__field`}>
          <label htmlFor={'slug-input-field'} className={`${globalClass}__field__label`}>Choose a slug:</label>
          <Input 
            className={`${globalClass}__field__input`}
            id={'slug-input-field'}
            value={this.state.userTag} 
            onChange={(value, event) => this.setState( {userTag: value} ) }
            />
        </div>
        <div className={`${globalClass}__submit`}>
          <Button 
            isDisabled={this.saveDisabled()}
            size={ButtonSize.LARGE}
            type={ButtonType.PRIMARY}
            label='Save profile settings'
            onClick={this.handleSave}
            />
        </div>
        <div className={`${globalClass}__snackbar-container`}>
          { this.state.errorState.errorMessage && 
            <Snackbar 
              className={`${globalClass}__profile-error`}
              message={this.state.errorState.errorMessage}
              canDismiss={true}
              onDismiss={this._clearErrorState}
              />
          }
          { this.state.successState.successMessage && 
            <Snackbar 
              className={`${globalClass}__profile-success`}
              message={this.state.successState.successMessage}
              canDismiss={true}
              timer={2000}
              onDismiss={this._clearSuccessState}
              />
          }
        </div>
      </div>
    )
  }
}