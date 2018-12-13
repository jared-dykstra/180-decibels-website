import {
  minPasswordLength,
  validateEmail,
  validateMinLength,
  validateRequired
} from './src/formValidators'

export const SIGNIN_FORM_EMAIL_KEY = 'email'
export const SIGNIN_FORM_PASSWORD_KEY = 'password'

// Validate the contents of the signIn form
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
