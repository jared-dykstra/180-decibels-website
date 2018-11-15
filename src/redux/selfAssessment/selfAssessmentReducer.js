import Immutable from 'seamless-immutable'
import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_NEXT_QUESTION,
  SELF_ASSESSMENT_PREV_QUESTION,
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'
import {
  currentQuestionIdSelector,
  currentVolumeSelector,
  currentMuteStateSelector
} from './selfAssessmentSelectors'
import { mountPoint } from '.'

const getSurrogateState = state =>
  Immutable.from({
    [mountPoint]: state
  })

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_NEXT_QUESTION:
      return state.setIn(
        ['currentIndex'],
        state.currentIndex >= state.questionList.length
          ? state.questionList.length
          : state.currentIndex + 1
      )
    case SELF_ASSESSMENT_PREV_QUESTION:
      return state.setIn(
        ['currentIndex'],
        state.currentIndex <= 0
          ? state.questionList.length
          : state.currentIndex - 1
      )
    case SELF_ASSESSMENT_SET_VOLUME: {
      const selectorState = getSurrogateState(state)
      const currentQuestionId = currentQuestionIdSelector(selectorState)
      const currentVolume = currentVolumeSelector(selectorState)
      const newVolume = action.payload.volume
      if (state.responses[currentQuestionId].mute) {
        // Don't change volume when muted
        return state
      }
      // Don't allow the value to underflow
      if (currentVolume < 3 && newVolume > 5) {
        return state
      }
      // Don't allow the value to overflow
      if (currentVolume > 7 && newVolume < 5) {
        return state
      }

      return (
        state
          .setIn(
            ['responses', currentQuestionId, 'volume'],
            action.payload.volume
          )
          // If the volume drops to zero, consider it muted
          .setIn(
            ['responses', currentQuestionId, 'mute'],
            Math.round(newVolume) === 0
          )
      )
    }
    case SELF_ASSESSMENT_MUTE: {
      const selectorState = getSurrogateState(state)
      const currentQuestionId = currentQuestionIdSelector(selectorState)
      const currentMuteState = currentMuteStateSelector(selectorState)
      const initialVolume = initialState.responses[currentQuestionId].volume
      // Set the volume to 0 when muting.  Set to the mid-point when un-muting
      const newVolume = !currentMuteState ? 0 : initialVolume
      return state
        .setIn(['responses', currentQuestionId, 'mute'], !currentMuteState)
        .setIn(['responses', currentQuestionId, 'volume'], newVolume)
    }
    default:
      return state
  }
}
