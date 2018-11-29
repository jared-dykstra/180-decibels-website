import { get as _get } from 'lodash'
import { ApolloLink, execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag.macro'
import { get as configGet } from 'config'

import {
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY,
  REGISTER_FORM_PASSWORD1_KEY,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from 'redux/userManagement/userManagementConstants'

const uri = configGet('apiEndpoint')

export const signIn = async credentials => {
  // TODO: Switch to GraphQL, if GraphQL can set a cookie/session
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      [SIGNIN_FORM_EMAIL_KEY]: credentials.get(SIGNIN_FORM_EMAIL_KEY),
      [SIGNIN_FORM_PASSWORD_KEY]: credentials.get(SIGNIN_FORM_PASSWORD_KEY)
    })
  })

  let data = null
  try {
    data = await response.json()
  } catch (ignore) {
    // Ignore
  }

  if (!response.ok) {
    throw data || `HTTP error, status = ${response.status}`
  }

  return data
}

// GraphQL Client
const httpLink = new HttpLink({ uri })
const link = ApolloLink.from([httpLink])
const clientExecuteAsync = (l, o) => makePromise(execute(l, o))

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
// ...Since apollo-link doesn't throw errors, but includes them in the result, do any error handling in a higher level

export const registerUser = async user => {
  const operation = {
    query: gql`
      mutation RegisterSurveyUser(
        $firstName: String!
        $lastName: String!
        $company: String!
        $email: String!
        $phone: String!
        $password: String!
      ) {
        registerUser(
          user: {
            firstName: $firstName
            lastName: $lastName
            company: $company
            email: $email
            phone: $phone
            password: $password
          }
        ) {
          firstName
          lastName
          company
          email
          phone
        }
      }
    `,
    variables: {
      firstName: user.get(REGISTER_FORM_FIRST_NAME_KEY),
      lastName: user.get(REGISTER_FORM_LAST_NAME_KEY),
      company: user.get(REGISTER_FORM_COMPANY_KEY),
      email: user.get(REGISTER_FORM_EMAIL_KEY),
      phone: user.get(REGISTER_FORM_PHONE_KEY),
      password: user.get(REGISTER_FORM_PASSWORD1_KEY)
    }
  }

  // See: https://www.apollographql.com/docs/link/index.html#standalone
  const retval = await clientExecuteAsync(link, operation)
  return retval
}

export const isEmailInUse = async email => {
  const operation = {
    query: gql`
      query IsEmailInUse($email: String!) {
        isEmailInUse(email: $email)
      }
    `,
    variables: {
      email
    }
  }

  // See: https://www.apollographql.com/docs/link/index.html#standalone
  const retval = await clientExecuteAsync(link, operation)

  const path = 'data.isEmailInUse'
  const inUse = _get(retval, path)
  return inUse
}
