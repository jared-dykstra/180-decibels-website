import { isEmpty as _isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'

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
import { labelWidth } from './constants'
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
      resetLabel
    } = this.props
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    return (
      <Form onSubmit={handleSubmit(doRegister)} className={styles.register}>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label
                for={REGISTER_FORM_FIRST_NAME_KEY}
                className={styles.required}
              >
                First Name
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_FIRST_NAME_KEY}
                name={REGISTER_FORM_FIRST_NAME_KEY}
                type="text"
                component={renderField}
                placeholder="Wiley, E"
                autoComplete="given-name"
              />
            </Col>
            <Col xs={labelWidth}>
              <Label
                for={REGISTER_FORM_LAST_NAME_KEY}
                className={styles.required}
              >
                Last Name
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_LAST_NAME_KEY}
                name={REGISTER_FORM_LAST_NAME_KEY}
                type="text"
                component={renderField}
                placeholder="Coyote"
                autoComplete="family-name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label
                for={REGISTER_FORM_COMPANY_KEY}
                className={styles.required}
              >
                Company
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_COMPANY_KEY}
                name={REGISTER_FORM_COMPANY_KEY}
                type="text"
                component={renderField}
                placeholder="ACME"
                autoComplete="organization"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label for={REGISTER_FORM_EMAIL_KEY} className={styles.required}>
                Email
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_EMAIL_KEY}
                name={REGISTER_FORM_EMAIL_KEY}
                type="text"
                component={renderField}
                placeholder="wiley@acme.com"
                autoComplete="email"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label for={REGISTER_FORM_PHONE_KEY} className={styles.required}>
                Phone
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_PHONE_KEY}
                name={REGISTER_FORM_PHONE_KEY}
                type="text"
                component={renderField}
                placeholder="403.555.1212"
                autoComplete="tel"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={labelWidth}>
              <Label
                for={REGISTER_FORM_PASSWORD1_KEY}
                className={styles.required}
              >
                Password
              </Label>
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_PASSWORD1_KEY}
                name={REGISTER_FORM_PASSWORD1_KEY}
                type="password"
                component={renderField}
                placeholder="new password"
                autoComplete="new-password"
              />
            </Col>
            <Col>
              <Field
                id={REGISTER_FORM_PASSWORD2_KEY}
                name={REGISTER_FORM_PASSWORD2_KEY}
                type="password"
                component={renderField}
                placeholder="confirm"
                autoComplete="new-password"
              />
            </Col>
          </Row>
        </FormGroup>
        <Buttons
          {...{
            isSubmitDisabled,
            isResetDisabled,
            reset,
            submitLabel,
            resetLabel
          }}
        />
      </Form>
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
