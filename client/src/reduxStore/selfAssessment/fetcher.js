import gql from 'graphql-tag.macro'

import { clientExecuteAsync } from 'apiUtils'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getResults = async (...args) => {
  console.error(`TODO: getResults() args=${JSON.stringify(args, null, 2)}`)
}

export const getQuiz = async name => {
  const operation = {
    query: gql`
      query getAssessment($name: String!) {
        getAssessment(name: $name) {
          name
          configuration {
            volume {
              min
              max
              step
            }
            quiz_id
          }
          questions {
            question_id
            text
            promptLeft
            promptRight
            negative
          }
        }
      }
    `,
    variables: {
      name
    }
  }
  const retval = await clientExecuteAsync(operation, 'getAssessment')
  return retval
}

export const answerQuestion = async ({ quizId, questionId, value }) => {
  const operation = {
    query: gql`
      mutation answerQuestion($quiz_id: ID!, $question_id: ID!, $value: Int!) {
        answerQuestion(
          answer: {
            quiz_id: $quiz_id
            question_id: $question_id
            value: $value
          }
        )
      }
    `,
    variables: {
      quiz_id: quizId,
      question_id: questionId,
      value
    }
  }
  const retval = await clientExecuteAsync(operation, 'answerQuestion')
  return retval
}
