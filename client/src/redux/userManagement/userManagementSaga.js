// Adapt the fetcher to redux & redux-form using redux-saga.

import { call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import {
  USER_MANAGEMENT_REGISTER,
  REGISTER_FORM_KEY
} from './userManagementConstants'
import { registerUser } from './fetcher'

function* registerHandler(action) {
  try {
    yield put(startSubmit(REGISTER_FORM_KEY))
    const { payload } = action
    /* const retval = */ yield call(registerUser, payload)
    yield put(stopSubmit(REGISTER_FORM_KEY, {}))
    // console.log(
    //   `User Registration Succeeded.  retval=${JSON.stringify(retval)}`
    // )
  } catch (err) {
    yield put(stopSubmit(REGISTER_FORM_KEY, err))
    // console.log(`User Registration Error. err=${JSON.stringify(err)}`)
  }
}

export default function*() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(USER_MANAGEMENT_REGISTER, registerHandler)
}
