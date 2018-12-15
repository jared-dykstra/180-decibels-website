import { isEmpty as _isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'

import Grid from '@material-ui/core/Grid'

import { actions } from 'reduxStore/auth'
import { REGISTER_FORM_KEY } from 'reduxStore/auth/authConstants'
import { isEmailInUse } from 'reduxStore/auth/fetcher'

import {
  validateRegistration,
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY,
  REGISTER_FORM_PASSWORD1_KEY,
  REGISTER_FORM_PASSWORD2_KEY
} from '180-decibels-shared/registration'

import styles from './LogIn.module.scss'
import renderField from './renderField'
import Buttons from './Buttons'

const asyncValidate = async values => {
  // Values is immutableJS instance
  const email = values.get(REGISTER_FORM_EMAIL_KEY)
  const isTaken = email ? await isEmailInUse(email) : false

  const errors = {}
  if (isTaken) {
    errors[REGISTER_FORM_EMAIL_KEY] = 'That email address is already in use'
  }

  if (!_isEmpty(errors)) {
    throw errors
  }
}

class Register extends PureComponent {
  static propTypes = {
    doRegister: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    resetLabel: PropTypes.string.isRequired,
    ...propTypes
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      doRegister,
      submitLabel,
      cancelLabel,
      resetLabel
    } = this.props
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    return (
      <form onSubmit={handleSubmit(doRegister)} className={styles.register}>
        <Grid container spacing={24}>
          <Grid item md={6}>
            <Field
              label="First Name"
              id={REGISTER_FORM_FIRST_NAME_KEY}
              name={REGISTER_FORM_FIRST_NAME_KEY}
              type="text"
              component={renderField}
              placeholder="Wiley, E"
              autoComplete="given-name"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <Field
              label="Last Name"
              id={REGISTER_FORM_LAST_NAME_KEY}
              name={REGISTER_FORM_LAST_NAME_KEY}
              type="text"
              component={renderField}
              placeholder="Coyote"
              autoComplete="family-name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Company"
              id={REGISTER_FORM_COMPANY_KEY}
              name={REGISTER_FORM_COMPANY_KEY}
              type="text"
              component={renderField}
              placeholder="ACME"
              autoComplete="organization"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <Field
              label="Email"
              id={REGISTER_FORM_EMAIL_KEY}
              name={REGISTER_FORM_EMAIL_KEY}
              type="text"
              component={renderField}
              placeholder="wiley@acme.com"
              autoComplete="email"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <Field
              label="Phone"
              id={REGISTER_FORM_PHONE_KEY}
              name={REGISTER_FORM_PHONE_KEY}
              type="text"
              component={renderField}
              placeholder="403.555.1212"
              autoComplete="tel"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <Field
              label="Password"
              id={REGISTER_FORM_PASSWORD1_KEY}
              name={REGISTER_FORM_PASSWORD1_KEY}
              type="password"
              component={renderField}
              placeholder="new password"
              autoComplete="new-password"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <Field
              label="Confirm Password"
              id={REGISTER_FORM_PASSWORD2_KEY}
              name={REGISTER_FORM_PASSWORD2_KEY}
              type="password"
              component={renderField}
              placeholder="confirm"
              autoComplete="new-password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Buttons
              {...{
                isSubmitDisabled,
                isResetDisabled,
                reset,
                submitLabel,
                cancelLabel,
                resetLabel
              }}
            />
          </Grid>
        </Grid>
      </form>
    )
  }
}

const ConnectedRegister = connect(
  null,
  dispatch => ({
    doRegister: values => dispatch(actions.register(values))
  })
)(Register)

export default reduxForm({
  form: REGISTER_FORM_KEY,
  validate: validateRegistration,
  asyncValidate,
  destroyOnUnmount: false
})(ConnectedRegister)
