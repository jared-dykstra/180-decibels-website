import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'

export const setVolume = ({ questionId, volume }) => ({
  type: SELF_ASSESSMENT_SET_VOLUME,
  payload: { questionId, volume }
})

export const toggleMute = ({ questionId }) => ({
  type: SELF_ASSESSMENT_MUTE,
  payload: { questionId }
})
