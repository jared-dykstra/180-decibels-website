import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_SET_VOLUME: {
      const { assessmentName, questionId } = action.payload
      const newVolume = action.payload.volume
      // Don't change volume when muted
      if (state[assessmentName].responses[questionId].mute) {
        return state
      }

      return state.setIn(
        [assessmentName, 'responses', questionId, 'volume'],
        newVolume
      )
    }
    case SELF_ASSESSMENT_MUTE: {
      const { assessmentName, questionId } = action.payload
      const path = [assessmentName, 'responses', questionId, 'mute']
      const currentMuteState = state.getIn(path)
      return state.setIn(path, !currentMuteState)
    }
    default:
      return state
  }
}
