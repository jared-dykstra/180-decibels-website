import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag.macro'

import resolvers from './resolvers'

// https://www.apollographql.com/docs/tutorial/schema.html

const typeDefs = gql`
  type Query {
    getUser(id: ID): String!
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      company: String!
      email: String!
      phone: String!
    ): String!
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
