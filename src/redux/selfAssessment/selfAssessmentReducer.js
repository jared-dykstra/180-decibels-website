import Immutable from 'seamless-immutable'
import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'
import { makeMuteSelector } from './selfAssessmentSelectors'
import { mountPoint } from '.'

const getSurrogateState = state =>
  Immutable.from({
    [mountPoint]: state
  })

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_SET_VOLUME: {
      const { questionId } = action.payload
      const newVolume = action.payload.volume
      // Don't change volume when muted
      if (state.responses[questionId].mute) {
        return state
      }

      return state.setIn(['responses', questionId, 'volume'], newVolume)
    }
    case SELF_ASSESSMENT_MUTE: {
      const { questionId } = action.payload
      const selectorState = getSurrogateState(state)
      const currentMuteStateSelector = makeMuteSelector()
      const currentMuteState = currentMuteStateSelector(selectorState, {
        questionId
      })
      return state.setIn(['responses', questionId, 'mute'], !currentMuteState)
    }
    default:
      return state
  }
}
