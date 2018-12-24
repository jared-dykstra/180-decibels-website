import gql from 'graphql-tag.macro'

import { clientExecuteAsync } from 'apiUtils'

import {
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY,
  REGISTER_FORM_PASSWORD1_KEY
} from '180-decibels-shared/registration'

import {
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from '180-decibels-shared/signIn'

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
  const retval = await clientExecuteAsync(operation, 'signIn')
  return retval
}

export const signOut = async () => {
  const operation = {
    query: gql`
      mutation signOut {
        signOut
      }
    `
  }
  await clientExecuteAsync(operation)
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
  const retval = await clientExecuteAsync(operation, 'authenticate')
  return retval
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
  const retval = await clientExecuteAsync(operation, 'registerUser')
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
  const retval = await clientExecuteAsync(operation, 'isEmailInUse')
  return retval
}
