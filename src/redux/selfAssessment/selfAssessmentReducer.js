import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'

const mutePath = ({ assessmentName, questionId }) => [
  assessmentName,
  'responses',
  questionId,
  'mute'
]

const volumePath = ({ assessmentName, questionId }) => [
  assessmentName,
  'responses',
  questionId,
  'volume'
]

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_SET_VOLUME: {
      // Don't change volume when muted
      const currentMuteState = state.getIn(mutePath(action.payload))
      if (currentMuteState) {
        return state
      }

      // Set the volume
      const { volume } = action.payload
      return state.setIn(volumePath(action.payload), volume)
    }
    case SELF_ASSESSMENT_MUTE: {
      // Toggle mute state
      const path = mutePath(action.payload)
      const currentMuteState = state.getIn(path)
      return state.setIn(path, !currentMuteState)
    }
    default:
      return state
  }
}
