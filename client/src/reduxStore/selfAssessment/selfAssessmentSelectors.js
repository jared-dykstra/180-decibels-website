import { sortBy as _sortBy } from 'lodash'
import { createSelector } from 'reselect'
import {
  ROUTE_HELP_ME_RESULT,
  ROUTE_HELP_MY_TEAM_RESULT
} from 'reduxStore/routes/routesConstants'
import { mountPoint } from '.'

import { get as configGet } from '../../config'

/* Begin Self Assesment Selectors */

const selfAssessmentSelector = (state, props) => {
  const { assessmentName } = props
  return state[mountPoint] ? state[mountPoint][assessmentName] : null
}

const currentQuestionIdSelector = (state, props) => {
  const { questionId } = props || {}
  return questionId
}

const configSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.configuration
)

const volumeConfigSelector = createSelector(
  configSelector,
  config => config.volume
)

const quizIdSelector = createSelector(
  configSelector,
  config => config.quizId
)

export const questionListSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.questionList
)

export const responsesSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.responses
)

const currentResponseSelector = createSelector(
  responsesSelector,
  currentQuestionIdSelector,
  (responses, questionId) => responses[questionId]
)

export const initializedSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => (selfAssessment ? selfAssessment.ui.initialized : false)
)

export const currentSlideSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.ui.currentSlide
)

export const resultsUrlSelector = createSelector(
  selfAssessmentSelector,
  quizIdSelector,
  (selfAssessment, quizId) => {
    const rootUrl = configGet('rootUrl')
    const ID_HELP_ME = '439a564d-adc9-497b-9dba-a9d8de6caf75'
    const ID_HELP_MY_TEAM = '853020dd-ebc6-458c-8bf2-eb5a1cc6101f'

    if (!quizId) {
      return rootUrl
    }

    const getRoute = () => {
      // NOTE: Similar logic exists on the server, in assessment/dataSource
      // TODO: Include the URL in the payload sent back to the server, and remove server-side logic
      switch (quizId) {
        case ID_HELP_ME:
          return ROUTE_HELP_ME_RESULT
        case ID_HELP_MY_TEAM:
          return ROUTE_HELP_MY_TEAM_RESULT
        default:
          throw new Error(`Unexpected Quiz ID: "${quizId}"`)
      }
    }

    return `${rootUrl}${getRoute()}/${selfAssessment.results.responseId}`
  }
)

export const emailSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.results.email
)

export const makeMaxVolumeSelector = () =>
  createSelector(
    volumeConfigSelector,
    volumeConfig => volumeConfig.max
  )

export const makeMinVolumeSelector = () =>
  createSelector(
    volumeConfigSelector,
    volumeConfig => volumeConfig.min
  )

export const makeVolumeStepSelector = () =>
  createSelector(
    volumeConfigSelector,
    volumeConfig => volumeConfig.step
  )

// Export functions so that when multiple instances are present, reselect memoizes properly
export const makeVolumeSelector = () =>
  createSelector(
    volumeConfigSelector,
    currentResponseSelector,
    (volumeConfig, response) =>
      response.volume ? response.volume : volumeConfig.min
  )

export const makeHasBeenRespondedToSelector = () =>
  createSelector(
    currentResponseSelector,
    response => response.hasBeenRespondedTo
  )

export const makeCanGoToNextQuestionSelector = () =>
  createSelector(
    currentResponseSelector,
    response => response.hasBeenRespondedTo
  )

/* Begin SelfAssessment Result selectors */

// "match" is supplied by react-router
export const idSelector = (state, props) => props.match.params.id

const rawResultsSelector = (state, props) => {
  const id = idSelector(state, props)
  const raw = state[mountPoint].results[id]
  return raw || {}
}

export const resultsErrorSelector = createSelector(
  rawResultsSelector,
  raw => raw.error
)

export const resultsSelector = createSelector(
  rawResultsSelector,
  raw => (raw.error ? {} : raw.results || {})
)

const contactInfoSelector = createSelector(
  resultsSelector,
  results => results.contactInfo || {}
)

export const displayNameSelector = createSelector(
  contactInfoSelector,
  contactInfo => {
    let retval
    if (contactInfo.firstName || contactInfo.lastName) {
      retval = `${contactInfo.firstName} ${contactInfo.lastName} (${
        contactInfo.email
      })`
    } else {
      retval = contactInfo.email
    }
    if (contactInfo.company) {
      retval = `${retval} - ${contactInfo.company}`
    }
    return retval || ''
  }
)

export const gradesSelector = createSelector(
  resultsSelector,
  results => {
    const grades = results.grades ? results.grades : []
    return _sortBy(grades, o => o.order).map(
      ({ threshold, score, ...rest }) => ({
        ...rest,
        thumbsUp: score > threshold,
        score
      })
    )
  }
)
