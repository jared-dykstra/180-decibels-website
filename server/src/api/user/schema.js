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
    user: User!
    userProfileToken: String!
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

  type Mutation {
    registerUser(user: UserInput!): AuthResponse!
    signIn(email: String!, password: String!): AuthResponse!
    signOut: String
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
