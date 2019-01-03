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
    quizId: ID!
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
    quizId: ID!
    questionId: ID!
    value: Int!
  }

  input ContactInfo {
    email: String!
    firstName: String
    lastName: String
    company: String
  }

  input FullAnswer {
    questionId: ID!
    value: Int!
    hasBeenRespondedTo: Boolean!
    answerId: ID!
  }

  input QuizResponse {
    quizId: ID!
    contactInfo: ContactInfo!
    answers: [FullAnswer!]!
  }

  type Mutation {
    answerQuestion(answer: Answer!): ID!
    answerQuiz(response: QuizResponse!): ID!
  }
`

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
