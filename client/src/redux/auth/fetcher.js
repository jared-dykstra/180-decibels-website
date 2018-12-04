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
} from 'redux/auth/authConstants'

const uri = configGet('apiEndpoint')

// GraphQL Client - See: https://www.apollographql.com/docs/link/index.html#standalone
// See this for an example of authenticating via a token in localstore:  https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#middleware
const httpLink = new HttpLink({
  uri,
  credentials: 'same-origin'
})
const link = ApolloLink.from([httpLink])
const clientExecuteAsync = (l, o) => makePromise(execute(l, o))

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
// ...Since apollo-link doesn't throw errors, but includes them in the result, do any error handling in a higher level

export const signIn = async credentials => {
  const operation = {
    query: gql`
      mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          user {
            firstName
            lastName
            company
            email
            phone
          }
          userProfileToken
        }
      }
    `,
    variables: {
      [SIGNIN_FORM_EMAIL_KEY]: credentials.get(SIGNIN_FORM_EMAIL_KEY),
      [SIGNIN_FORM_PASSWORD_KEY]: credentials.get(SIGNIN_FORM_PASSWORD_KEY)
    }
  }
  const retval = await clientExecuteAsync(link, operation)
  const response = _get(retval, 'data.signIn')
  return response || retval
}

export const authenticate = async () => {
  const operation = {
    query: gql`
      query authenticate {
        authenticate {
          user {
            firstName
            lastName
            company
            email
            phone
          }
          userProfileToken
        }
      }
    `
  }
  const retval = await clientExecuteAsync(link, operation)
  const response = _get(retval, 'data.authenticate')
  return response || retval
}

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
          user {
            firstName
            lastName
            company
            email
            phone
          }
          userProfileToken
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
  const retval = await clientExecuteAsync(link, operation)
  const response = _get(retval, 'data.registerUser')
  return response || retval
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
  const retval = await clientExecuteAsync(link, operation)
  const inUse = _get(retval, 'data.isEmailInUse')
  return inUse
}
