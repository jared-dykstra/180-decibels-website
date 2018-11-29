import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'

import { actions } from 'redux/userManagement'
import {
  SIGNIN_FORM_KEY,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from 'redux/userManagement/userManagementConstants'

import styles from './LogIn.module.scss'
import renderField from './renderField'
import { labelWidth } from './constants'
import Buttons from './Buttons'
import {
  minPasswordLength,
  validateEmail,
  validateMinLength,
  validateRequired
} from './formValidators'

const validate = values => {
  const email = values.get(SIGNIN_FORM_EMAIL_KEY)
  const password = values.get(SIGNIN_FORM_PASSWORD_KEY)
  return {
    [SIGNIN_FORM_EMAIL_KEY]: validateRequired(email) || validateEmail(email),
    [SIGNIN_FORM_PASSWORD_KEY]:
      validateRequired(password) ||
      validateMinLength(minPasswordLength)(password)
  }
}

class SignIn extends PureComponent {
  static propTypes = {
    doSignIn: PropTypes.func.isRequired,
    ...propTypes
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, doSignIn } = this.props
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    return (
      <Form onSubmit={handleSubmit(doSignIn)} className={styles['sign-in']}>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label for={SIGNIN_FORM_EMAIL_KEY} className={styles.required}>
                Email
              </Label>
            </Col>
            <Col>
              <Field
                id={SIGNIN_FORM_EMAIL_KEY}
                name={SIGNIN_FORM_EMAIL_KEY}
                type="text"
                component={renderField}
                placeholder="user@domain.com"
                autoComplete="email"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label for={SIGNIN_FORM_PASSWORD_KEY} className={styles.required}>
                Password
              </Label>
            </Col>
            <Col>
              <Field
                id={SIGNIN_FORM_PASSWORD_KEY}
                name={SIGNIN_FORM_PASSWORD_KEY}
                type="password"
                component={renderField}
                placeholder="password"
                autoComplete="current-password"
              />
            </Col>
          </Row>
        </FormGroup>
        <Buttons {...{ isSubmitDisabled, isResetDisabled, reset }} />
      </Form>
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
  validate,
  destroyOnUnmount: false
})(ConnectedSignIn)
