import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'

import FormGroup from '@material-ui/core/FormGroup'

import {
  validateSignIn,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from '180-decibels-shared/signIn'

import { actions } from 'reduxStore/auth'
import { SIGNIN_FORM_KEY } from 'reduxStore/auth/authConstants'
import { closeDialog as closeActionCreator } from 'reduxStore/auth/authActions'

import { DialogFormButtons } from '..'

import { renderField, FIELD_TYPE_TEXT } from 'formUtils'
import PasswordField from './PasswordField'

class SignIn extends PureComponent {
  static propTypes = {
    doSignIn: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    resetLabel: PropTypes.string.isRequired,
    ...propTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      resetTs: new Date().getTime()
    }
  }

  handleClickReset = args => {
    const { reset } = this.props
    reset(args)
    this.setState(() => ({
      resetTs: new Date().getTime()
    }))
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
    // Whenever resetTs is changed, react elements using that value of a key are re-rendered, and their internal state is reset
    // This resets the "show password" functionality when the form is reset
    const { resetTs } = this.state
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    return (
      <form onSubmit={handleSubmit(doSignIn)}>
        <FormGroup row style={{ paddingTop: '1em' }}>
          <Field
            label="Email"
            id={SIGNIN_FORM_EMAIL_KEY}
            name={SIGNIN_FORM_EMAIL_KEY}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="user@domain.com"
            autoComplete="email"
            fullWidth
          />
        </FormGroup>
        <FormGroup row>
          <PasswordField
            key={resetTs}
            label="Password"
            formKey={SIGNIN_FORM_PASSWORD_KEY}
            placeholder="password"
            autoComplete="current-password"
            fullWidth
          />
        </FormGroup>
        <DialogFormButtons
          {...{
            isSubmitDisabled,
            isResetDisabled,
            reset: this.handleClickReset,
            submitLabel,
            cancelLabel,
            resetLabel,
            closeActionCreator
          }}
        />
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
