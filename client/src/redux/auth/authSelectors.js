import { createSelector } from 'reselect'
import { mountPoint } from '.'
import { REGISTER_FORM_FIRST_NAME_KEY } from './authConstants'

const authSelector = state => state[mountPoint]

export const signInModalIsOpenSelector = createSelector(
  authSelector,
  auth => auth.signInModalIsOpen
)

const userSelector = createSelector(
  authSelector,
  auth => auth.user
)

export const isAuthenticatingSelector = createSelector(
  authSelector,
  auth => auth.isAuthenticating
)

export const isSignedInSelector = createSelector(
  userSelector,
  user => !!user
)

export const nameSelector = createSelector(
  userSelector,
  user => (user ? user[REGISTER_FORM_FIRST_NAME_KEY] : null)
)
