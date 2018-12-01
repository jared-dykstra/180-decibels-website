export const minPasswordLength = 8
export const minCompanyLength = 4

export const validateRequired = value =>
  value || typeof value === 'number' ? undefined : 'Required'

export const validateMinLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const validateAlphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Punctuation is not permitted'
    : undefined

export const validatePhoneNumber = value =>
  value && !/^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const validateEqual = (value1, value2) =>
  value1 && value2 && value1 !== value2 ? 'Must match' : undefined
