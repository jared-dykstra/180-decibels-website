import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_NEXT_SLIDE,
  SELF_ASSESSMENT_PREV_SLIDE,
  SELF_ASSESSMENT_GET_RESULTS,
  SELF_ASSESSMENT_GET_RESULTS_SUCCESS,
  SELF_ASSESSMENT_INITIALIZE,
  SELF_ASSESSMENT_INITIALIZED
} from './selfAssessmentConstants'

export const initialize = ({ assessmentName }) => ({
  type: SELF_ASSESSMENT_INITIALIZE,
  payload: { assessmentName }
})

export const initialized = ({ assessmentName, quiz }) => ({
  type: SELF_ASSESSMENT_INITIALIZED,
  payload: { assessmentName, quiz }
})

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

export const getResultsSuccess = ({ assessmentName }) => ({
  type: SELF_ASSESSMENT_GET_RESULTS_SUCCESS,
  payload: { assessmentName }
})
