import { createSelector } from 'reselect'
import { mountPoint } from '.'
import resultsGenerator from './ResultsGenerator'

const selfAssessmentSelector = state => state[mountPoint]

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

const currentQuestionIdSelector = (state, props) => {
  const { questionId } = props
  return questionId
}

const currentResponseSelector = createSelector(
  selfAssessmentSelector,
  currentQuestionIdSelector,
  (selfAssessment, questionId) => selfAssessment.responses[questionId]
)

export const maxVolumeSelector = createSelector(
  volumeConfigSelector,
  volumeConfig => volumeConfig.max
)

export const minVolumeSelector = createSelector(
  volumeConfigSelector,
  volumeConfig => volumeConfig.min
)

export const volumeStepSelector = createSelector(
  volumeConfigSelector,
  volumeConfig => volumeConfig.step
)

// Export functions so that when multiple instances are present, reselect memoizes properly
export const makeVolumeSelector = () =>
  createSelector(
    minVolumeSelector,
    currentResponseSelector,
    (minVolume, response) => (response.volume ? response.volume : minVolume)
  )

export const makeMuteSelector = () =>
  createSelector(currentResponseSelector, response => response.mute)

export const resultsSelector = createSelector(
  selfAssessmentSelector,
  configSelector,
  (selfAssessment, config) =>
    resultsGenerator({
      responses: selfAssessment.responses,
      config
    })
)
