import {
  minCompanyLength,
  minPasswordLength,
  validateAlphaNumeric,
  validateEmail,
  validateEqual,
  validateMinLength,
  validatePhoneNumber,
  validateRequired
} from './src/formValidators'

import {
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY,
  REGISTER_FORM_PASSWORD1_KEY,
  REGISTER_FORM_PASSWORD2_KEY,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from './src/constants'

export * from './src/constants'

// Validate contents of the registration form
export const validateRegistration = values => {
  const company = values.get(REGISTER_FORM_COMPANY_KEY)
  const firstName = values.get(REGISTER_FORM_FIRST_NAME_KEY)
  const lastName = values.get(REGISTER_FORM_LAST_NAME_KEY)
  const email = values.get(REGISTER_FORM_EMAIL_KEY)
  const phone = values.get(REGISTER_FORM_PHONE_KEY)
  const password1 = values.get(REGISTER_FORM_PASSWORD1_KEY)
  const password2 = values.get(REGISTER_FORM_PASSWORD2_KEY)

  return {
    [REGISTER_FORM_COMPANY_KEY]:
      validateRequired(company) || validateMinLength(minCompanyLength)(company),
    [REGISTER_FORM_FIRST_NAME_KEY]:
      validateRequired(firstName) || validateAlphaNumeric(firstName),
    [REGISTER_FORM_LAST_NAME_KEY]:
      validateRequired(lastName) || validateAlphaNumeric(lastName),
    [REGISTER_FORM_EMAIL_KEY]: validateRequired(email) || validateEmail(email),
    [REGISTER_FORM_PHONE_KEY]:
      validateRequired(phone) || validatePhoneNumber(phone),
    [REGISTER_FORM_PASSWORD1_KEY]:
      validateRequired(password1) ||
      validateMinLength(minPasswordLength)(password1) ||
      validateEqual(password1, password2),
    [REGISTER_FORM_PASSWORD2_KEY]:
      validateRequired(password2) ||
      validateMinLength(minPasswordLength)(password2) ||
      validateEqual(password1, password2)
  }
}

export const validateSignIn = values => {
  const email = values.get(SIGNIN_FORM_EMAIL_KEY)
  const password = values.get(SIGNIN_FORM_PASSWORD_KEY)
  return {
    [SIGNIN_FORM_EMAIL_KEY]: validateRequired(email) || validateEmail(email),
    [SIGNIN_FORM_PASSWORD_KEY]:
      validateRequired(password) ||
      validateMinLength(minPasswordLength)(password)
  }
}
