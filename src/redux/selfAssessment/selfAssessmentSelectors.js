import { findIndex as _findIndex } from 'lodash'
import { createSelector } from 'reselect'
import { mountPoint } from '.'

const selfAssessmentSelector = state => state[mountPoint]

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

// Get the index in questionList of props.questionId
const questionIndexSelector = (state, props) => {
  const { questionId } = props
  const questionList = questionListSelector(state)
  const index = _findIndex(questionList, q => q.id === questionId)
  return index
}

const currentResponseSelector = createSelector(
  selfAssessmentSelector,
  questionIndexSelector,
  questionListSelector,
  (selfAssessment, questionIndex, questionList) => {
    const questionId = questionList[questionIndex].id
    return selfAssessment.responses[questionId]
  }
)

export const makeVolumeSelector = () =>
  createSelector(currentResponseSelector, response => response.volume)

export const makeMuteSelector = () =>
  createSelector(currentResponseSelector, response => response.mute)

export const maxVolumeSelector = () => 10
export const minVolumeSelector = () => 0
export const midVolumeSelector = () =>
  Math.round((maxVolumeSelector() - minVolumeSelector()) / 2)
