import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'

export const setVolume = ({ assessmentName, questionId, volume }) => ({
  type: SELF_ASSESSMENT_SET_VOLUME,
  payload: { assessmentName, questionId, volume }
})

export const toggleMute = ({ assessmentName, questionId }) => ({
  type: SELF_ASSESSMENT_MUTE,
  payload: { assessmentName, questionId }
})
