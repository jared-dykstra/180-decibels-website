import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Button, Form, FormGroup, Label } from 'reactstrap'

import { actions } from '../../redux/userManagement'

import renderField from './renderField'

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required'

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Punctuation is not permitted'
    : undefined
const phoneNumber = value =>
  value && !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

const Register = props => {
  const { handleSubmit, register } = props
  return (
    <Form onSubmit={handleSubmit(register)}>
      <FormGroup>
        <Label for="company">Company</Label>
        <Field
          id="company"
          name="company"
          type="text"
          component={renderField}
          validate={[required, minLength(4)]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Field
          id="firstName"
          name="firstName"
          type="text"
          component={renderField}
          validate={[required, alphaNumeric]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Field
          id="lastName"
          name="lastName"
          type="text"
          component={renderField}
          validate={[required, alphaNumeric]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Field
          id="email"
          name="email"
          type="text"
          component={renderField}
          validate={[required, email]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Field
          id="phone"
          name="phone"
          type="text"
          component={renderField}
          placeholder="403.555.1212"
          validate={[required, phoneNumber]}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

Register.propTypes = {
  ...propTypes
  // other props you might be using
}

const RegisterForm = reduxForm({ form: 'register' })(Register)

export default connect(
  (state, props) => {},
  dispatch => ({
    register: values => dispatch(actions.register(values))
  })
)(RegisterForm)
