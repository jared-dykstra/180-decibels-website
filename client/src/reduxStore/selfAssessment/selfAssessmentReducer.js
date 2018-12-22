import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_NEXT_SLIDE,
  SELF_ASSESSMENT_PREV_SLIDE
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
