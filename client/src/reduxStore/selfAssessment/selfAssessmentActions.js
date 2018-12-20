import { SELF_ASSESSMENT_SET_VOLUME } from './selfAssessmentConstants'

export const setVolume = ({ assessmentName, questionId, volume }) => ({
  type: SELF_ASSESSMENT_SET_VOLUME,
  payload: { assessmentName, questionId, volume }
})
