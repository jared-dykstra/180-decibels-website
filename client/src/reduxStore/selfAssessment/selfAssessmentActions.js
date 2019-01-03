import {
  SELF_ASSESSMENT_SET_VOLUME,
  SELF_ASSESSMENT_NEXT_SLIDE,
  SELF_ASSESSMENT_PREV_SLIDE,
  SELF_ASSESSMENT_SUBMIT_RESULTS,
  SELF_ASSESSMENT_SUBMIT_RESULTS_SUCCESS,
  SELF_ASSESSMENT_INITIALIZE,
  SELF_ASSESSMENT_INITIALIZED,
  SELF_ASSESSMENT_ADD_ANSWER_ID,
  SELF_ASSESSMENT_LOAD_RESULTS,
  SELF_ASSESSMENT_LOAD_RESULTS_SUCCESS
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

export const addAnswerId = ({ assessmentName, questionId, answerId }) => ({
  type: SELF_ASSESSMENT_ADD_ANSWER_ID,
  payload: { assessmentName, questionId, answerId }
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
  type: SELF_ASSESSMENT_SUBMIT_RESULTS,
  payload: { assessmentName, contactInfo }
})

export const getResultsSuccess = ({ assessmentName, responseId, email }) => ({
  type: SELF_ASSESSMENT_SUBMIT_RESULTS_SUCCESS,
  payload: { assessmentName, responseId, email }
})

//

export const loadResults = ({ resultId }) => ({
  type: SELF_ASSESSMENT_LOAD_RESULTS,
  payload: { resultId }
})

export const loadResultsSuccess = ({ resultId, results }) => ({
  type: SELF_ASSESSMENT_LOAD_RESULTS_SUCCESS,
  payload: { resultId, results }
})
