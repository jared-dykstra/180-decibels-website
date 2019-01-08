import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag.macro'

import resolvers from './resolvers'

// https://www.apollographql.com/docs/tutorial/schema.html

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String!
  }

  type AuthResponse @cacheControl(scope: PRIVATE) {
    userId: ID!
    user: User
    userProfileToken: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    authenticate: AuthResponse!
    isEmailInUse(email: String!): Boolean!
  }

  type LogResponse {
    id: ID
  }

  input LogPageView {
    uri: String!
  }

  input LogModalView {
    modalName: String!
  }

  input LogEvent {
    category: String!
    action: String!
    label: String
    value: String
  }

  input LogError {
    error: String!
    info: String
    fatal: Boolean!
  }

  type Mutation {
    registerUser(user: UserInput!): AuthResponse!
    signIn(email: String!, password: String!): AuthResponse!
    signOut: String
    logPageView(pageView: LogPageView!): LogResponse
    logModalView(modalView: LogModalView!): LogResponse
    logEvent(event: LogEvent!): LogResponse
    logError(error: LogError!): LogResponse
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
