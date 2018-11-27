import { ApolloLink, execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag.macro'

import { get as configGet } from 'config'

// import { REGISTER_FORM_EMAIL_KEY } from './userManagementConstants'

const uri = configGet('apiEndpoint')

class ClientError extends Error {
  constructor(error, ...args) {
    const { message, locations, path } = error
    const text = `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
      locations
    )}, Path: ${path}`

    super(text, error, ...args)
    Error.captureStackTrace(this, ClientError)
  }
}

const httpLink = new HttpLink({ uri })
const link = ApolloLink.from([httpLink])

const clientExecuteAsync = async (l, o) => {
  const result = await makePromise(execute(l, o))
  // If the result contains errors, wrap them up and throw
  if (result.errors) {
    throw new ClientError(result.errors[0])
  }
  return result
}

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
/* eslint-disable no-throw-literal */

export const registerUser = async payload => {
  try {
    const { user: immutableUser } = payload
    const user = immutableUser.toObject()
    console.log(`TODO: Register user=${JSON.stringify(user)}`)

    const operation = {
      query: gql`
        mutation RegisterSurveyUser($name: String!) {
          registerUser(name: $name)
        }
      `,
      variables: {
        name: user.firstName
      }
    }

    // See: https://www.apollographql.com/docs/link/index.html#standalone
    const retval = await clientExecuteAsync(link, operation)

    // throw {
    //   [REGISTER_FORM_EMAIL_KEY]:
    //     'That email address is already registered, please login'
    // }

    return retval
  } catch (err) {
    console.error(err)
    throw err
  }
}
