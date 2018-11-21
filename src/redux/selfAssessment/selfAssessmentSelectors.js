import { createSelector } from 'reselect'
import { mountPoint } from '.'
import resultsGenerator from './ResultsGenerator'

const selfAssessmentSelector = (state, props) => {
  const { assessmentName } = props
  return state[mountPoint][assessmentName]
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

export const questionListSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.questionList
)

const currentResponseSelector = createSelector(
  selfAssessmentSelector,
  currentQuestionIdSelector,
  (selfAssessment, questionId) => selfAssessment.responses[questionId]
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

export const makeMuteSelector = () =>
  createSelector(
    currentResponseSelector,
    response => response.mute
  )

export const makeResultsSelector = () =>
  createSelector(
    selfAssessmentSelector,
    configSelector,
    (selfAssessment, config) =>
      resultsGenerator({
        responses: selfAssessment.responses,
        config
      })
  )
