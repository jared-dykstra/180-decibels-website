import { validateEmail, validateRequired } from './src/formValidators'

export const ASSESSMENT_RESULT_FORM_COMPANY_KEY = 'company'
export const ASSESSMENT_RESULT_FORM_FIRST_NAME_KEY = 'firstName'
export const ASSESSMENT_RESULT_FORM_LAST_NAME_KEY = 'lastName'
export const ASSESSMENT_RESULT_FORM_EMAIL_KEY = 'email'
export const ASSESSMENT_RESULT_FORM_PHONE_KEY = 'phone'

// Validate the contents of the getStarted form
export const validateAssessmentResults = values => {
  const email = values.get(ASSESSMENT_RESULT_FORM_EMAIL_KEY)
  return {
    [ASSESSMENT_RESULT_FORM_EMAIL_KEY]:
      validateRequired(email) || validateEmail(email)
  }
}
