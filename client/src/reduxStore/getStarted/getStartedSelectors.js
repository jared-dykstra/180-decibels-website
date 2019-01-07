import { createSelector } from 'reselect'
import { mountPoint } from '.'

const getStartedSelector = state => state[mountPoint]

export const getStartedModalIsOpenSelector = createSelector(
  getStartedSelector,
  getStarted => getStarted.isOpen
)

export const getStartedModalLinkTextSelector = createSelector(
  getStartedSelector,
  getStarted => getStarted.linkText
)
