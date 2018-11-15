import { find as _find } from 'lodash'
import { createSelector } from 'reselect'
import { mountPoint } from '.'

const selfAssessmentSelector = state => state[mountPoint]

const configurationSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.configuration
)

export const isFirstQuestionSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.currentIndex <= 0
)

export const isLastQuestionSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment =>
    selfAssessment.currentIndex >= selfAssessment.questionList.length
)

export const currentQuestionIdSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.questionList[selfAssessment.currentIndex]
)

const currentResponseSelector = createSelector(
  selfAssessmentSelector,
  currentQuestionIdSelector,
  (selfAssessment, questionId) => selfAssessment.responses[questionId]
)

const currentQuestionSelector = createSelector(
  configurationSelector,
  currentQuestionIdSelector,
  (configuration, questionId) =>
    _find(configuration.questions, q => q.id === questionId)
)

export const currentQuestionTextSelector = createSelector(
  currentQuestionSelector,
  currentQuestion => currentQuestion.text
)

export const currentVolumeSelector = createSelector(
  currentResponseSelector,
  response => response.volume
)

export const currentMuteStateSelector = createSelector(
  currentResponseSelector,
  response => response.mute
)
