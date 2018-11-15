import { shuffle as _shuffle } from 'lodash'
import Immutable from 'seamless-immutable'
import configuration from './configuration.json'

const emptyResponses = configuration.questions.reduce((acc, v) => {
  acc[v.id] = { volume: undefined, mute: false }
  return acc
}, {})

// Shuffle all available questions
const questionList = _shuffle(configuration.questions)

export default Immutable.from({
  currentIndex: 0,
  questionList,
  responses: emptyResponses,
  configuration
})
