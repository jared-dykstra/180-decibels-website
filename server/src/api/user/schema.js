import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag.macro'

import resolvers from './resolvers'

// https://www.apollographql.com/docs/tutorial/schema.html

const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String!
    password: String!
  }

  type Query {
    authenticate: AuthResponse! @cacheControl(scope: PRIVATE)
    isEmailInUse(email: String!): Boolean!
  }

  type Mutation {
    registerUser(user: UserInput!): AuthResponse! @cacheControl(scope: PRIVATE)
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
