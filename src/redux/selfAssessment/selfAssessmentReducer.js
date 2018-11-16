import Immutable from 'seamless-immutable'
import initialState from './selfAssessmentInitialState'
import {
  SELF_ASSESSMENT_NEXT_QUESTION,
  SELF_ASSESSMENT_PREV_QUESTION,
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'
import {
  makeVolumeSelector,
  makeMuteSelector,
  maxVolumeSelector,
  minVolumeSelector,
  isFirstQuestionSelector,
  isLastQuestionSelector
} from './selfAssessmentSelectors'
import { mountPoint } from '.'

const getSurrogateState = state =>
  Immutable.from({
    [mountPoint]: state
  })

const maxVolume = maxVolumeSelector()
const minVolume = minVolumeSelector()
const upperVolumeThreshold = Math.round(maxVolume * 0.7)
const lowerVolumeThreshold = Math.round(maxVolume * 0.3)
const midVolumeThreshold = Math.round((maxVolume - minVolume) / 2)

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF_ASSESSMENT_NEXT_QUESTION: {
      const selectorState = getSurrogateState(state)
      const isLastQuestion = isLastQuestionSelector(selectorState)
      return state.setIn(
        ['currentIndex'],
        isLastQuestion ? state.questionList.length - 1 : state.currentIndex + 1
      )
    }
    case SELF_ASSESSMENT_PREV_QUESTION: {
      const selectorState = getSurrogateState(state)
      const isFirstQuestion = isFirstQuestionSelector(selectorState)
      return state.setIn(
        ['currentIndex'],
        isFirstQuestion ? 0 : state.currentIndex - 1
      )
    }
    case SELF_ASSESSMENT_SET_VOLUME: {
      const { questionId } = action.payload
      const selectorState = getSurrogateState(state)
      const currentVolumeSelector = makeVolumeSelector()
      const currentVolume = currentVolumeSelector(selectorState, {
        questionId
      })
      const newVolume = action.payload.volume
      // Don't change volume when muted
      if (state.responses[questionId].mute) {
        return state
      }
      // Don't allow the value to underflow
      if (
        currentVolume < lowerVolumeThreshold &&
        newVolume > midVolumeThreshold
      ) {
        return state
      }
      // Don't allow the value to overflow
      if (
        currentVolume > upperVolumeThreshold &&
        newVolume < midVolumeThreshold
      ) {
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
