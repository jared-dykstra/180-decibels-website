import { ApolloLink, execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag.macro'
import { get as configGet } from 'config'

const uri = configGet('apiEndpoint')
const httpLink = new HttpLink({ uri })
const link = ApolloLink.from([httpLink])

const clientExecuteAsync = (l, o) => makePromise(execute(l, o))

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
// ...Since apollo-link doesn't throw errors, but includes them in the result, do any error handling in a higher level

export const registerUser = async payload => {
  const { user: immutableUser } = payload
  const user = immutableUser.toObject()
  const operation = {
    query: gql`
      mutation RegisterSurveyUser(
        $firstName: String!
        $lastName: String!
        $company: String!
        $email: String!
        $phone: String!
      ) {
        registerUser(
          firstName: $firstName
          lastName: $lastName
          company: $company
          email: $email
          phone: $phone
        )
      }
    `,
    variables: {
      ...user
    }
  }

  // See: https://www.apollographql.com/docs/link/index.html#standalone
  const retval = await clientExecuteAsync(link, operation)
  return retval
}
