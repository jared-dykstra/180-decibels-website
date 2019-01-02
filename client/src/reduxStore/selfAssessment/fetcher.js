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
