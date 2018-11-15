import Immutable from 'seamless-immutable'
import configuration from './configuration.json'

const emptyResponses = configuration.questions.reduce((acc, v) => {
  acc[v.id] = { volume: undefined, mute: false }
  return acc
}, {})

// If we want to randomize the order, questionList could be shuffled
const questionList = configuration.questions.map(q => q.id)

export default Immutable.from({
  currentIndex: 0,
  questionList,
  responses: emptyResponses,
  configuration
})
