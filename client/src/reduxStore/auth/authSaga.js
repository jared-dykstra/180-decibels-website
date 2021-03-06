// Adapt the fetcher to redux & redux-form using redux-saga.
import { isEmpty as _isEmpty } from 'lodash'
import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { clearFields, startSubmit, stopSubmit } from 'redux-form'

import {
  REGISTER_FORM_PASSWORD1_KEY,
  REGISTER_FORM_PASSWORD2_KEY
} from '180-decibels-shared/registration'

import {
  SIGNIN_FORM_EMAIL_KEY,
  SIGNIN_FORM_PASSWORD_KEY
} from '180-decibels-shared/signIn'

import { getValidationErrors } from 'apiUtils'

import {
  REGISTER_FORM_KEY,
  SIGNIN_FORM_KEY,
  AUTH_AUTHENTICATE,
  AUTH_REGISTER,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_LOG_PAGE_VIEW,
  AUTH_LOG_MODAL_VIEW,
  AUTH_LOG_EVENT,
  AUTH_LOG_ERROR
} from './authConstants'
import { signInSuccess } from './authPrivateActions'
import {
  authenticate,
  signIn,
  signOut,
  registerUser,
  logPageView,
  logModalView,
  logEvent,
  logError
} from './fetcher'

/* eslint-disable no-console */

function* authenticateHandler() {
  try {
    const response = yield call(authenticate)
    yield put(signInSuccess(response))
  } catch (err) {
    console.warn(`Authentication Error.  err=${JSON.stringify(err)}`)
    throw err
  }
}

function* signOutHandler() {
  yield call(signOut)
}

function* signInHandler(action) {
  try {
    yield put(startSubmit(SIGNIN_FORM_KEY))
    const { payload } = action
    const { credentials } = payload
    const response = yield call(signIn, credentials)
    const validationErrors = getValidationErrors(response)
    yield put(stopSubmit(SIGNIN_FORM_KEY, validationErrors || {}))
    if (_isEmpty(validationErrors)) {
      yield put(signInSuccess(response))
      yield put(
        clearFields(SIGNIN_FORM_KEY, true, true, SIGNIN_FORM_PASSWORD_KEY)
      )
    }
  } catch (err) {
    yield put(
      stopSubmit(SIGNIN_FORM_KEY, {
        [SIGNIN_FORM_EMAIL_KEY]: ' ',
        [SIGNIN_FORM_PASSWORD_KEY]: err.message
      })
    )
    console.error(`User SignIn Error. err=${JSON.stringify(err)}`)
    throw err
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
      yield put(signInSuccess(response))
      yield put(
        clearFields(
          REGISTER_FORM_KEY,
          true,
          true,
          REGISTER_FORM_PASSWORD1_KEY,
          REGISTER_FORM_PASSWORD2_KEY
        )
      )
    }
  } catch (err) {
    yield put(stopSubmit(REGISTER_FORM_KEY, {}))
    console.error(`User Registration Error. err=${JSON.stringify(err)}`)
    throw err
  }
}

function* handleLogAction(action) {
  const { payload } = action
  try {
    switch (action.type) {
      case AUTH_LOG_PAGE_VIEW:
        yield call(logPageView, payload)
        break
      case AUTH_LOG_MODAL_VIEW:
        yield call(logModalView, payload)
        break
      case AUTH_LOG_EVENT:
        yield call(logEvent, payload)
        break
      case AUTH_LOG_ERROR:
        yield call(logError, payload)
        break
      default:
        console.error('Ignoring Unexpected Action in handleLog saga')
    }
  } catch (err) {
    console.error(`logPageView failed.  err=${JSON.stringify(err)}`)
  }
}

/* eslint-enable no-console */

export default function*() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield all([
    takeLatest(AUTH_AUTHENTICATE, authenticateHandler),
    takeLatest(AUTH_SIGNIN, signInHandler),
    takeLatest(AUTH_SIGNOUT, signOutHandler),
    takeLatest(AUTH_REGISTER, registerHandler),
    takeEvery(AUTH_LOG_PAGE_VIEW, handleLogAction),
    takeEvery(AUTH_LOG_MODAL_VIEW, handleLogAction),
    takeEvery(AUTH_LOG_EVENT, handleLogAction),
    takeEvery(AUTH_LOG_ERROR, handleLogAction)
  ])
}
