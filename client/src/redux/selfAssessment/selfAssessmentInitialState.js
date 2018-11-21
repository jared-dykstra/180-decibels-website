import { shuffle as _shuffle } from 'lodash'
import Immutable from 'seamless-immutable'
import configuration from './configuration.json'

const assessments = Object.keys(configuration)

const buildEmptyResponses = currentConfig =>
  Object.keys(currentConfig.questions).reduce((acc, id) => {
    acc[id] = { volume: undefined, mute: false }
    return acc
  }, {})

// Create a shuffled array of questions, putting the id into the object
const buildQuestionList = questions =>
  _shuffle(Object.entries(questions)).map(([id, question]) => ({
    id,
    ...question
  }))

export default Immutable.from(
  assessments.reduce((acc, assessment) => {
    const currentConfig = configuration[assessment]
    acc[assessment] = {
      questionList: buildQuestionList(currentConfig.questions),
      responses: buildEmptyResponses(currentConfig),
      configuration: currentConfig
    }
    return acc
  }, {})
)
