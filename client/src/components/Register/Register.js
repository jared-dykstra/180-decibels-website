import { isEmpty as _isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import { Button, Col, Container, Form, FormGroup, Label, Row } from 'reactstrap'

import { actions } from 'redux/userManagement'
import {
  REGISTER_FORM_KEY,
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY
} from 'redux/userManagement/userManagementConstants'
import { isEmailInUse } from 'redux/userManagement/fetcher'

import styles from './Register.module.scss'
import renderField from './renderField'

const validate = values => {
  const validateRequired = value =>
    value || typeof value === 'number' ? undefined : 'Required'

  const validateMinLength = min => value =>
    value && value.length < min
      ? `Must be ${min} characters or more`
      : undefined

  const validateEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined
  const ValidateAlphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
      ? 'Punctuation is not permitted'
      : undefined
  const validatePhoneNumber = value =>
    value &&
    !/^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(value)
      ? 'Invalid phone number, must be 10 digits'
      : undefined

  const company = values.get(REGISTER_FORM_COMPANY_KEY)
  const firstName = values.get(REGISTER_FORM_FIRST_NAME_KEY)
  const lastName = values.get(REGISTER_FORM_LAST_NAME_KEY)
  const email = values.get(REGISTER_FORM_EMAIL_KEY)
  const phone = values.get(REGISTER_FORM_PHONE_KEY)
  return {
    [REGISTER_FORM_COMPANY_KEY]:
      validateRequired(company) || validateMinLength(4)(company),
    [REGISTER_FORM_FIRST_NAME_KEY]:
      validateRequired(firstName) || ValidateAlphaNumeric(firstName),
    [REGISTER_FORM_LAST_NAME_KEY]:
      validateRequired(lastName) || ValidateAlphaNumeric(lastName),
    [REGISTER_FORM_EMAIL_KEY]: validateRequired(email) || validateEmail(email),
    [REGISTER_FORM_PHONE_KEY]:
      validateRequired(phone) || validatePhoneNumber(phone)
  }
}

const asyncValidate = async values => {
  // Values is immutableJS instance
  const email = values.get(REGISTER_FORM_EMAIL_KEY)
  const isTaken = await isEmailInUse(email)

  const errors = {}
  if (isTaken) {
    errors[REGISTER_FORM_EMAIL_KEY] = 'That email address is already in use'
  }

  if (!_isEmpty(errors)) {
    throw errors
  }
}

class Register extends PureComponent {
  static propTypes = propTypes

  render() {
    const { handleSubmit, pristine, reset, submitting, register } = this.props
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting
    const labelWidth = 2
    return (
      <Container fluid className={styles.register}>
        <Form onSubmit={handleSubmit(register)}>
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
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs={labelWidth}>
                <Label
                  for={REGISTER_FORM_EMAIL_KEY}
                  className={styles.required}
                >
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
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs={labelWidth}>
                <Label for={REGISTER_FORM_PHONE_KEY}>Phone</Label>
              </Col>
              <Col>
                <Field
                  id={REGISTER_FORM_PHONE_KEY}
                  name={REGISTER_FORM_PHONE_KEY}
                  type="text"
                  component={renderField}
                  placeholder="403.555.1212"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Button
                  type="submit"
                  color={!isSubmitDisabled ? 'primary' : undefined}
                  disabled={isSubmitDisabled}
                  className="float-right"
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="link"
                  disabled={isResetDisabled}
                  onClick={reset}
                  className="float-right"
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

const ConnectedRegister = connect(
  null,
  dispatch => ({
    register: values => dispatch(actions.register(values))
  })
)(Register)

export default reduxForm({ form: REGISTER_FORM_KEY, validate, asyncValidate })(
  ConnectedRegister
)
