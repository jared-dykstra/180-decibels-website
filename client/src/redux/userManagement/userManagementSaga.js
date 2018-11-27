// Adapt the fetcher to redux & redux-form using redux-saga.
import { get as _get } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import {
  USER_MANAGEMENT_REGISTER,
  REGISTER_FORM_KEY
} from './userManagementConstants'
import { registerUser } from './fetcher'

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

function* registerHandler(action) {
  try {
    yield put(startSubmit(REGISTER_FORM_KEY))
    const { payload } = action
    const result = yield call(registerUser, payload)
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

  yield takeLatest(USER_MANAGEMENT_REGISTER, registerHandler)
}
