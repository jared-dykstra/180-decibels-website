import gql from 'graphql-tag.macro'

import { clientExecuteAsync } from 'apiUtils'

import {
  GET_STARTED_FORM_COMPANY_KEY,
  GET_STARTED_FORM_FIRST_NAME_KEY,
  GET_STARTED_FORM_LAST_NAME_KEY,
  GET_STARTED_FORM_EMAIL_KEY,
  GET_STARTED_FORM_PHONE_KEY,
  GET_STARTED_FORM_DATE_TIME_KEY
} from '180-decibels-shared/getStarted'

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
// ...Since apollo-link doesn't throw errors, but includes them in the result, do any error handling in a higher level

export const getStarted = async contactInfo => {
  const operation = {
    query: gql`
      mutation ContactMe($contactInfo: ContactInfo!) {
        contactMe(contactInfo: $contactInfo)
      }
    `,
    variables: {
      contactInfo: {
        dateTime: contactInfo.get(GET_STARTED_FORM_DATE_TIME_KEY),
        firstName: contactInfo.get(GET_STARTED_FORM_FIRST_NAME_KEY),
        lastName: contactInfo.get(GET_STARTED_FORM_LAST_NAME_KEY),
        company: contactInfo.get(GET_STARTED_FORM_COMPANY_KEY),
        email: contactInfo.get(GET_STARTED_FORM_EMAIL_KEY),
        phone: contactInfo.get(GET_STARTED_FORM_PHONE_KEY)
      }
    }
  }
  const retval = await clientExecuteAsync(operation, 'contactMe')
  return retval
}
