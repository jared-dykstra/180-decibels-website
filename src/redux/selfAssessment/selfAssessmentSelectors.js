import { find as _find } from 'lodash'
import { createSelector } from 'reselect'
import { mountPoint } from '.'

const selfAssessmentSelector = state => state[mountPoint]

const configurationSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.configuration
)

export const questionListSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.questionList
)

export const currentIndexSelector = createSelector(
  selfAssessmentSelector,
  selfAssessment => selfAssessment.currentIndex
)

export const isFirstQuestionSelector = createSelector(
  currentIndexSelector,
  currentIndex => currentIndex <= 0
)

export const isLastQuestionSelector = createSelector(
  currentIndexSelector,
  questionListSelector,
  (currentIndex, questionList) => currentIndex >= questionList.length - 1
)

export const currentQuestionIdSelector = createSelector(
  currentIndexSelector,
  questionListSelector,
  (currentIndex, questionList) => questionList[currentIndex].id
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

export const maxVolumeSelector = () => 10
export const minVolumeSelector = () => 0
export const midVolumeSelector = () =>
  Math.round((maxVolumeSelector() - minVolumeSelector()) / 2)
