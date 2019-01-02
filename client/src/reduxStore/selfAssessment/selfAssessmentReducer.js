import Immutable from 'seamless-immutable'
import { shuffle as _shuffle } from 'lodash'
import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_NEXT_SLIDE,
  SELF_ASSESSMENT_PREV_SLIDE,
  SELF_ASSESSMENT_INITIALIZE,
  SELF_ASSESSMENT_INITIALIZED
} from './selfAssessmentConstants'

const volumePath = ({ assessmentName, questionId }) => [
  assessmentName,
  'responses',
  questionId,
  'volume'
]

const respondedPath = ({ assessmentName, questionId }) => [
  assessmentName,
  'responses',
  questionId,
  'hasBeenRespondedTo'
]

const currentSlidePath = ({ assessmentName }) => [
  assessmentName,
  'ui',
  'currentSlide'
]

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_INITIALIZE: {
      // Do nothing... a side-effect was kicked off in the saga.
      // Don't reset the state--preserve state when switching between assessments
      return state
    }
    case SELF_ASSESSMENT_INITIALIZED: {
      const { quiz, assessmentName } = action.payload
      // converts `question_id` => `id`
      const questions = Immutable.from(
        // eslint-disable-next-line camelcase
        quiz.questions.map(({ question_id, ...rest }) => ({
          id: question_id,
          ...rest
        }))
      )
      const emptyResponses = Immutable.from(
        questions.reduce((acc, { id }) => {
          acc[id] = { volume: undefined, hasBeenRespondedTo: false }
          return acc
        }, {})
      )

      return state
        .setIn([assessmentName, 'ui', 'initialized'], true)
        .setIn([assessmentName, 'configuration'], quiz.configuration)
        .setIn([assessmentName, 'questionList'], _shuffle(questions))
        .setIn([assessmentName, 'responses'], emptyResponses)
    }

    case SELF_ASSESSMENT_SET_VOLUME: {
      const { volume } = action.payload
      return state
        .setIn(volumePath(action.payload), volume)
        .setIn(respondedPath(action.payload), true)
    }
    case SELF_ASSESSMENT_NEXT_SLIDE: {
      const path = currentSlidePath(action.payload)
      const currentSlide = state.getIn(path)
      return state.setIn(path, currentSlide + 1)
    }
    case SELF_ASSESSMENT_PREV_SLIDE: {
      const path = currentSlidePath(action.payload)
      const currentSlide = state.getIn(path)
      return state.setIn(path, currentSlide - 1)
    }
    default:
      return state
  }
}
