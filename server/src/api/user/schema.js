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

  input UserInput {
    firstName: String!
    lastName: String!
    company: String!
    email: String!
    phone: String!
    password: String!
  }

  type Query {
    isEmailInUse(email: String!): Boolean!
    getUser(id: ID!): User!
  }

  type Mutation {
    registerUser(user: UserInput!): User!
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
