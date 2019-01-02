import Immutable from 'seamless-immutable'

const initialQuizState = () => ({
  ui: {
    initialized: false,
    currentSlide: 0
  },
  questionList: [],
  responses: {},
  configuration: {}
})

export default Immutable.from({
  helpMyTeam: initialQuizState(),
  helpMe: initialQuizState()
})
