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
    quiz_id: ID!
  }

  type Assessment {
    name: String!
    configuration: Configuration!
    questions: [Question]!
  }

  type Query {
    getAssessment(name: String): Assessment!
  }

  input Answer {
    quiz_id: ID!
    question_id: ID!
    value: Int!
  }

  input Response {
    quiz_id: ID!
  }

  type Mutation {
    answerQuestion(answer: Answer!): ID!
    answerQuiz(response: Response!): ID!
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
