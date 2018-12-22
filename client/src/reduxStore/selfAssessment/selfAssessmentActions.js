import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_NEXT_SLIDE,
  SELF_ASSESSMENT_PREV_SLIDE,
  SELF_ASSESSMENT_GET_RESULTS
} from './selfAssessmentConstants'

export const setVolume = ({ assessmentName, questionId, volume }) => ({
  type: SELF_ASSESSMENT_SET_VOLUME,
  payload: { assessmentName, questionId, volume }
})

export const nextSlide = ({ assessmentName }) => ({
  type: SELF_ASSESSMENT_NEXT_SLIDE,
  payload: { assessmentName }
})

export const prevSlide = ({ assessmentName }) => ({
  type: SELF_ASSESSMENT_PREV_SLIDE,
  payload: { assessmentName }
})

export const getResults = ({ assessmentName, contactInfo }) => ({
  type: SELF_ASSESSMENT_GET_RESULTS,
  payload: { assessmentName, contactInfo }
})
