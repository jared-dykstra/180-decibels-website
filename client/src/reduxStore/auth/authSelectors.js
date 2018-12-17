import { intersection as _intersection } from 'lodash'
import { createSelector } from 'reselect'
import {
  getFormMeta,
  getFormSyncErrors,
  getFormAsyncErrors
} from 'redux-form/immutable'
import { REGISTER_FORM_FIRST_NAME_KEY } from '180-decibels-shared/registration'
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

// Get all fields the user has touched
const getTouchedFields = meta => {
  const touchedFields = Object.entries(meta.toJS()).reduce(
    (acc, [id, info]) => {
      if (info.touched) {
        acc[id] = true
      }
      return acc
    },
    {}
  )
  return touchedFields
}

// Only consider it an error if the field has been touched, and if the field is listed in 'fields' array
const getErrors = ({ touchedFields, syncErrors, asyncErrors, fields }) => {
  const errorFields = _intersection(Object.keys(touchedFields), fields).reduce(
    (acc, field) => {
      // In the current version of redux-form, syncErrors is a vanilla object; asyncErrors is an Immutable Map
      const error =
        (syncErrors || {})[field] ||
        (asyncErrors ? asyncErrors.get(field) : undefined)
      if (error) {
        // Ensure the accumulator is never set to undefined
        acc[field] = error
      }
      return acc
    },
    {}
  )
  return errorFields
}

export const makeFormHasErrorSelector = ({ formId, fields }) =>
  createSelector(
    getFormMeta(formId),
    getFormSyncErrors(formId),
    getFormAsyncErrors(formId),
    (meta, syncErrors, asyncErrors) => {
      const touchedFields = getTouchedFields(meta)
      const errorFields = getErrors({
        touchedFields,
        syncErrors,
        asyncErrors,
        fields
      })

      const hasErrors = Object.keys(errorFields).length > 0
      return hasErrors
    }
  )

export const makeFormSectionCompleteSelector = ({ formId, fields }) =>
  createSelector(
    getFormMeta(formId),
    getFormSyncErrors(formId),
    getFormAsyncErrors(formId),
    (meta, syncErrors, asyncErrors) => {
      const touchedFields = getTouchedFields(meta)
      const errorFields = getErrors({
        touchedFields,
        syncErrors,
        asyncErrors,
        fields
      })
      const hasErrors = Object.keys(errorFields).length > 0

      // If there are errors, it's not complete
      if (hasErrors) {
        return false
      }

      // It's complete if all of the specified fields have been touched
      return (
        _intersection(Object.keys(touchedFields), fields).length ===
        fields.length
      )
    }
  )
