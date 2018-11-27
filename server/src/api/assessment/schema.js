import { makeExecutableSchema } from 'graphql-tools'

import gql from 'graphql-tag.macro'
import resolvers from './resolvers'

const typeDefs = gql`
  type Question {
    id: ID!
    text: String!
  }

  type Configuration {
    volumeMin: Int!
    volumeMax: Int!
    volumeStep: Int!
  }

  type Assessment {
    name: String!
    version: String!
    configuration: Configuration!
    questions: [Question]!
  }

  type Query {
    getAssessment(name: String): Assessment!
  }

  type Mutation {
    createAssessmentResultSet(responses: [ID]!): [String]!
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
