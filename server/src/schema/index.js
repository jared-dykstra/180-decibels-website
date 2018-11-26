import gql from 'graphql-tag.macro'

// https://www.apollographql.com/docs/tutorial/schema.html

// export default gql`
//   type Dimension {
//     name: String!
//     highComment: String!
//     lowComment: String!
//     threshold: String!
//   }

//   type Volume {
//     min: Int!
//     max: Int!
//     step: Int!
//   }

//   type Question {
//     id: ID!
//     text: String!
//   }

//   type Assessment {
//     dimensions: [Dimension]!
//     volume: Volume!
//     questions: [Question]!
//   }

//   type Query {
//     assessment(name: String): [Assessment]!
//   }

//   type Mutation {
//     createAssessment(responses: [ID]!): [String]!
//   }
// `

export default gql`
  type Question {
    id: ID!
    text: String!
  }

  type Assessment {
    name: String!
    questions: [Question]!
  }

  type Query {
    assessment(name: String): Assessment!
  }

  type Mutation {
    createAssessment(responses: [ID]!): [String]!
  }
`
