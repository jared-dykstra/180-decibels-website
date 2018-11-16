import {
  SELF_ASSESSMENT_NEXT_QUESTION,
  SELF_ASSESSMENT_PREV_QUESTION,
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_MUTE
} from './selfAssessmentConstants'

export const nextQuestion = () => ({
  type: SELF_ASSESSMENT_NEXT_QUESTION
})

export const prevQuestion = () => ({
  type: SELF_ASSESSMENT_PREV_QUESTION
})

export const setVolume = ({ questionId, volume }) => ({
  type: SELF_ASSESSMENT_SET_VOLUME,
  payload: { questionId, volume }
})

export const toggleMute = ({ questionId }) => ({
  type: SELF_ASSESSMENT_MUTE,
  payload: { questionId }
})
