import { createSelector } from 'reselect'
import { mountPoint } from '.'
import { REGISTER_FORM_FIRST_NAME_KEY } from './userManagementConstants'

const userManagementSelector = state => state[mountPoint]

export const signInModalIsOpenSelector = createSelector(
  userManagementSelector,
  userManagement => userManagement.signInModalIsOpen
)

const userSelector = createSelector(
  userManagementSelector,
  userManagement => userManagement.user
)

export const isSignedInSelector = createSelector(
  userSelector,
  user => !!user
)

export const nameSelector = createSelector(
  userSelector,
  user => (user ? user[REGISTER_FORM_FIRST_NAME_KEY] : null)
)
