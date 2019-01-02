import { makeExecutableSchema } from 'graphql-tools'

import gql from 'graphql-tag.macro'
import resolvers from './resolvers'

const typeDefs = gql`
  type Question {
    question_id: ID!
    text: String!
    promptLeft: String!
    promptRight: String!
    negative: Boolean!
  }

  type Volume {
    min: Int!
    max: Int!
    step: Int!
  }

  type Configuration {
    volume: Volume!
  }

  type Assessment {
    name: String!
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
