// Adapt the fetcher to redux & redux-form using redux-saga.
import { get as _get } from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import {
  REGISTER_FORM_KEY,
  SIGNIN_FORM_KEY,
  USER_MANAGEMENT_REGISTER,
  USER_MANAGEMENT_SIGNIN,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from './userManagementConstants'
import { signInSuccess } from './userManagementPrivateActions'
import { signIn, registerUser } from './fetcher'

// Parses a GraphQL response
const getValidationErrors = response => {
  if (response.errors) {
    const firstError = response.errors[0]
    // Check for ValidationError
    const code = _get(firstError, 'extensions.code')
    if (code === 'BAD_USER_INPUT') {
      const field = _get(firstError, 'extensions.exception.invalidArgs[0]')
      if (field) {
        const errors = { [field]: firstError.message }
        return errors
      }
    }
  }
  return null
}

function* signInHandler(action) {
  try {
    yield put(startSubmit(SIGNIN_FORM_KEY))
    const { payload } = action
    const { credentials } = payload
    const response = yield call(signIn, credentials)
    yield put(stopSubmit(SIGNIN_FORM_KEY, {}))
    const { user, token } = response
    yield put(signInSuccess({ user, token }))
  } catch (err) {
    yield put(
      stopSubmit(SIGNIN_FORM_KEY, {
        [SIGNIN_FORM_EMAIL_KEY]: ' ',
        [SIGNIN_FORM_PASSWORD_KEY]: 'Invalid email or password'
      })
    )
    console.error(`User SignIn Error. err=${JSON.stringify(err)}`)
  }
}

function* registerHandler(action) {
  try {
    yield put(startSubmit(REGISTER_FORM_KEY))
    const { payload } = action
    const { user } = payload
    const result = yield call(registerUser, user)
    const validationErrors = getValidationErrors(result)
    yield put(stopSubmit(REGISTER_FORM_KEY, validationErrors || {}))
  } catch (err) {
    yield put(stopSubmit(REGISTER_FORM_KEY, {}))
    console.error(`User Registration Error. err=${JSON.stringify(err)}`)
  }
}

export default function*() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield all([
    takeLatest(USER_MANAGEMENT_SIGNIN, signInHandler),
    takeLatest(USER_MANAGEMENT_REGISTER, registerHandler)
  ])
}
