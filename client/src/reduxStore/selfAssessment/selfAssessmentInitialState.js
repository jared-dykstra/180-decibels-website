import Immutable from 'seamless-immutable'

const initialQuizState = () => ({
  ui: {
    initialized: false,
    currentSlide: 0
  },
  questionList: [],
  responses: {},
  configuration: {},
  results: {
    responseId: null,
    email: null,
    error: undefined
  }
})

export default Immutable.from({
  helpMyTeam: initialQuizState(),
  helpMe: initialQuizState(),
  results: {}
})
