import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import { Button, Form, FormGroup, Label } from 'reactstrap'

import { actions } from 'redux/userManagement'
import {
  REGISTER_FORM_KEY,
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY
} from '../../redux/userManagement/userManagementConstants'

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

class Register extends PureComponent {
  static propTypes = propTypes

  render() {
    const {
      valid,
      handleSubmit,
      pristine,
      reset,
      submitting,
      register
    } = this.props
    const isSubmitDisabled = !valid || submitting
    const isResetDisabled = pristine || submitting
    return (
      <Form onSubmit={handleSubmit(register)}>
        <FormGroup>
          <Label for={REGISTER_FORM_FIRST_NAME_KEY}>First Name</Label>
          <Field
            id={REGISTER_FORM_FIRST_NAME_KEY}
            name={REGISTER_FORM_FIRST_NAME_KEY}
            type="text"
            component={renderField}
            placeholder="Wiley, E"
          />
        </FormGroup>
        <FormGroup>
          <Label for={REGISTER_FORM_LAST_NAME_KEY}>Last Name</Label>
          <Field
            id={REGISTER_FORM_LAST_NAME_KEY}
            name={REGISTER_FORM_LAST_NAME_KEY}
            type="text"
            component={renderField}
            placeholder="Coyote"
          />
        </FormGroup>
        <FormGroup>
          <Label for={REGISTER_FORM_COMPANY_KEY}>Company</Label>
          <Field
            id={REGISTER_FORM_COMPANY_KEY}
            name={REGISTER_FORM_COMPANY_KEY}
            type="text"
            component={renderField}
            placeholder="ACME"
          />
        </FormGroup>
        <FormGroup>
          <Label for={REGISTER_FORM_EMAIL_KEY}>Email</Label>
          <Field
            id={REGISTER_FORM_EMAIL_KEY}
            name={REGISTER_FORM_EMAIL_KEY}
            type="text"
            component={renderField}
            placeholder="wiley@acme.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for={REGISTER_FORM_PHONE_KEY}>Phone</Label>
          <Field
            id={REGISTER_FORM_PHONE_KEY}
            name={REGISTER_FORM_PHONE_KEY}
            type="text"
            component={renderField}
            placeholder="403.555.1212"
          />
        </FormGroup>
        <Button
          type="submit"
          color={!isSubmitDisabled ? 'primary' : undefined}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
        <Button
          type="reset"
          color="link"
          disabled={isResetDisabled}
          onClick={reset}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

const ConnectedRegister = connect(
  null,
  dispatch => ({
    register: values => dispatch(actions.register(values))
  })
)(Register)

export default reduxForm({ form: REGISTER_FORM_KEY, validate })(
  ConnectedRegister
)
