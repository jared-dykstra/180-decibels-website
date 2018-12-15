import { filter as _filter } from 'lodash'
import { createSelector } from 'reselect'
import {
  getFormMeta,
  getFormSyncErrors,
  getFormAsyncErrors
} from 'redux-form/immutable'
import {
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY
} from '180-decibels-shared/registration'
import { REGISTER_FORM_KEY } from 'reduxStore/auth/authConstants'
import { mountPoint } from '.'

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

export const registerFormHasContactErrorSelector = createSelector(
  getFormMeta(REGISTER_FORM_KEY),
  getFormSyncErrors(REGISTER_FORM_KEY),
  getFormAsyncErrors(REGISTER_FORM_KEY),
  (meta, syncErrors, asyncErrors) => {
    const touchedFields = Object.entries(meta.toJS()).reduce(
      (acc, [id, info]) => {
        if (info.touched) {
          acc[id] = true
        }
        return acc
      },
      {}
    )

    const errorFields = Object.keys(touchedFields).reduce((acc, field) => {
      acc[field] = syncErrors[field] || asyncErrors[field]
      return acc
    }, {})

    // console.log(`touchedFields=${JSON.stringify(touchedFields)}`)
    // console.log(`errorFields=${JSON.stringify(errorFields)}`)

    return Object.keys(errorFields).length > 0
  }
)
