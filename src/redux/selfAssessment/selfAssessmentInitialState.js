import { shuffle as _shuffle } from 'lodash'
import Immutable from 'seamless-immutable'
import configuration from './configuration.json'

const assessments = Object.keys(configuration)

const buildEmptyResponses = currentConfig =>
  currentConfig.questions.reduce((acc, v) => {
    acc[v.id] = { volume: undefined, mute: false }
    return acc
  }, {})

export default Immutable.from(
  assessments.reduce((acc, assessment) => {
    const currentConfig = configuration[assessment]
    acc[assessment] = {
      questionList: _shuffle(currentConfig.questions),
      responses: buildEmptyResponses(currentConfig),
      configuration: currentConfig
    }
    return acc
  }, {})
)
