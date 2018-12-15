import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormGroup from '@material-ui/core/FormGroup'

import {
  validateSignIn,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from '180-decibels-shared/signIn'

import { actions } from 'reduxStore/auth'
import { SIGNIN_FORM_KEY } from 'reduxStore/auth/authConstants'

import styles from './LogIn.module.scss'
import renderField from './renderField'
import Buttons from './Buttons'

class SignIn extends PureComponent {
  static propTypes = {
    doSignIn: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    resetLabel: PropTypes.string.isRequired,
    ...propTypes
  }

  initialState = Immutable.from({
    showPassword: false
  })

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleClickShowPassword = () => {
    this.setState(state =>
      Immutable.from({ showPassword: !state.showPassword })
    )
  }

  handleClickReset = args => {
    const { reset } = this.props
    reset(args)
    this.setState(state => this.initialState)
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      doSignIn,
      submitLabel,
      cancelLabel,
      resetLabel
    } = this.props
    const { showPassword } = this.state

    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    return (
      <form onSubmit={handleSubmit(doSignIn)} className={styles['sign-in']}>
        <FormGroup row>
          <Field
            label="Email"
            id={SIGNIN_FORM_EMAIL_KEY}
            name={SIGNIN_FORM_EMAIL_KEY}
            type="text"
            component={renderField}
            placeholder="user@domain.com"
            autoComplete="email"
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <Field
            label="Password"
            id={SIGNIN_FORM_PASSWORD_KEY}
            name={SIGNIN_FORM_PASSWORD_KEY}
            type={showPassword ? 'text' : 'password'}
            component={renderField}
            placeholder="password"
            autoComplete="current-password"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormGroup>
        <FormGroup>
          <Buttons
            {...{
              isSubmitDisabled,
              isResetDisabled,
              reset: this.handleClickReset,
              submitLabel,
              cancelLabel,
              resetLabel
            }}
          />
        </FormGroup>
      </form>
    )
  }
}

const ConnectedSignIn = connect(
  null,
  dispatch => ({
    doSignIn: values => dispatch(actions.signIn(values))
  })
)(SignIn)

export default reduxForm({
  form: SIGNIN_FORM_KEY,
  validate: validateSignIn,
  destroyOnUnmount: false
})(ConnectedSignIn)
