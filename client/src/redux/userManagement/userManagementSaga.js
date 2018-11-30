// Adapt the fetcher to redux & redux-form using redux-saga.
import { get as _get, isEmpty as _isEmpty } from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { clearFields, startSubmit, stopSubmit } from 'redux-form'

import {
  REGISTER_FORM_KEY,
  SIGNIN_FORM_KEY,
  USER_MANAGEMENT_AUTHENTICATE,
  USER_MANAGEMENT_REGISTER,
  USER_MANAGEMENT_SIGNIN,
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY,
  REGISTER_FORM_PASSWORD1_KEY,
  REGISTER_FORM_PASSWORD2_KEY
} from './userManagementConstants'
import { signInSuccess } from './userManagementPrivateActions'
import { authenticate, signIn, registerUser } from './fetcher'

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

function* authenticateHandler() {
  try {
    const response = yield call(authenticate)
    yield put(signInSuccess(response))
  } catch (err) {
    console.warn(`Authentication Error.  err=${JSON.stringify(err)}`)
  }
}

function* signInHandler(action) {
  try {
    console.log('signIn handler')
    yield put(startSubmit(SIGNIN_FORM_KEY))
    const { payload } = action
    const { credentials } = payload
    const response = yield call(signIn, credentials)
    yield put(stopSubmit(SIGNIN_FORM_KEY, {}))
    yield put(signInSuccess(response))
    yield put(
      clearFields(SIGNIN_FORM_KEY, true, true, SIGNIN_FORM_PASSWORD_KEY)
    )
  } catch (err) {
    yield put(
      stopSubmit(SIGNIN_FORM_KEY, {
        [SIGNIN_FORM_EMAIL_KEY]: ' ',
        [SIGNIN_FORM_PASSWORD_KEY]: err.message
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
    const response = yield call(registerUser, user)
    const validationErrors = getValidationErrors(response)
    yield put(stopSubmit(REGISTER_FORM_KEY, validationErrors || {}))
    if (_isEmpty(validationErrors)) {
      console.log(`response=${JSON.stringify(response)}`)
      yield put(signInSuccess(response))
    }
    yield put(
      clearFields(
        SIGNIN_FORM_KEY,
        true,
        true,
        REGISTER_FORM_PASSWORD1_KEY,
        REGISTER_FORM_PASSWORD2_KEY
      )
    )
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
    takeLatest(USER_MANAGEMENT_AUTHENTICATE, authenticateHandler),
    takeLatest(USER_MANAGEMENT_SIGNIN, signInHandler),
    takeLatest(USER_MANAGEMENT_REGISTER, registerHandler)
  ])
}
