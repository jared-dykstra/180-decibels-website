import initialState from './selfAssessmentInitialState'
import { SELF_ASSESSMENT_SET_VOLUME } from './selfAssessmentConstants'

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

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_SET_VOLUME: {
      const { volume } = action.payload
      return state
        .setIn(volumePath(action.payload), volume)
        .setIn(respondedPath(action.payload), true)
    }
    default:
      return state
  }
}
