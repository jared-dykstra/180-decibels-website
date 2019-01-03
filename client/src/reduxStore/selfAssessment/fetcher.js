import gql from 'graphql-tag.macro'

import { clientExecuteAsync } from 'apiUtils'

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const answerQuiz = async ({
  quizId,
  // quizName,
  contactInfo,
  responses
}) => {
  // Convert answers from hash to array
  const answers = Object.entries(responses).map(
    ([k, { volume, hasBeenRespondedTo, answerId }]) => ({
      questionId: k,
      value: volume,
      hasBeenRespondedTo,
      answerId
    })
  )

  const response = {
    quizId,
    contactInfo,
    answers
  }

  const operation = {
    query: gql`
      mutation answerQuiz($response: QuizResponse!) {
        answerQuiz(response: $response)
      }
    `,
    variables: {
      response
    }
  }
  const retval = await clientExecuteAsync(operation, 'answerQuiz')
  return retval
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
            quizId
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

export const answerQuestion = async answer => {
  const operation = {
    query: gql`
      mutation answerQuestion($answer: Answer!) {
        answerQuestion(answer: $answer)
      }
    `,
    variables: {
      answer
    }
  }
  const retval = await clientExecuteAsync(operation, 'answerQuestion')
  return retval
}

export const getQuizResults = async resultId => {
  const operation = {
    query: gql`
      query getAssessment($resultId: ID!) {
        getResult(id: $resultId) {
          json
        }
      }
    `,
    variables: {
      resultId
    }
  }
  const retval = await clientExecuteAsync(operation, 'getResult')
  return retval
}
