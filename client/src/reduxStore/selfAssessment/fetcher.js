import gql from 'graphql-tag.macro'

import { clientExecuteAsync } from 'apiUtils'

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
