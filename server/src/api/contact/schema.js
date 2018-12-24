import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag.macro'

import resolvers from './resolvers'

// https://www.apollographql.com/docs/tutorial/schema.html

const typeDefs = gql`
  input ContactInfo {
    dateTime: String
    firstName: String
    lastName: String
    company: String
    email: String
    phone: String
  }

  type Query {
    noop: String!
  }

  type Mutation {
    contactMe(contactInfo: ContactInfo!): ID
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
