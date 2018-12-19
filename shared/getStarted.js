import { validateRequired } from './src/formValidators'

export const GET_STARTED_FORM_DATE_TIME_KEY = 'dateTime'

// Validate the contents of the getStarted form
export const validateGetStarted = values => {
  const dateTime = values.get(GET_STARTED_FORM_DATE_TIME_KEY)
  return {
    [GET_STARTED_FORM_DATE_TIME_KEY]: validateRequired(dateTime)
  }
}
