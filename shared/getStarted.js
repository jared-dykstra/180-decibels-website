import {
  validateEmail,
  validatePhoneNumber,
  validateOneOf
} from './src/formValidators'

export const GET_STARTED_FORM_DATE_TIME_KEY = 'dateTime'
export const GET_STARTED_FORM_COMPANY_KEY = 'company'
export const GET_STARTED_FORM_FIRST_NAME_KEY = 'firstName'
export const GET_STARTED_FORM_LAST_NAME_KEY = 'lastName'
export const GET_STARTED_FORM_EMAIL_KEY = 'email'
export const GET_STARTED_FORM_PHONE_KEY = 'phone'

// Validate the contents of the getStarted form
export const validateGetStarted = values => {
  const email = values.get(GET_STARTED_FORM_EMAIL_KEY)
  const phone = values.get(GET_STARTED_FORM_PHONE_KEY)
  const err = 'Phone or email Required'
  return {
    [GET_STARTED_FORM_EMAIL_KEY]:
      validateOneOf(err, email, phone) || validateEmail(email),
    [GET_STARTED_FORM_PHONE_KEY]:
      validateOneOf(err, email, phone) || validatePhoneNumber(phone)
  }
}
