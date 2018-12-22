// Adapt the fetcher to redux & redux-form using redux-saga.
import { isEmpty as _isEmpty } from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { getValidationErrors } from 'apiUtils/responseProcessor'

import {
  GET_STARTED_CONTACT,
  GET_STARTED_FORM_KEY
} from './getStartedConstants'
import { getStarted } from './fetcher'
import { contactSuccess } from './getStartedActions'

function* contactHandler(action) {
  try {
    // yield put(startSubmit(GET_STARTED_FORM_KEY))
    const { payload } = action
    const { user } = payload
    const response = yield call(getStarted, user)
    const validationErrors = getValidationErrors(response)
    yield put(stopSubmit(GET_STARTED_FORM_KEY, validationErrors || {}))
    if (_isEmpty(validationErrors)) {
      yield put(contactSuccess())
    }
  } catch (err) {
    yield put(stopSubmit(GET_STARTED_FORM_KEY, {}))
    console.error(`Get Started Error. err=${JSON.stringify(err)}`)
  }
}

/* eslint-enable no-console */

export default function*() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield all([takeLatest(GET_STARTED_CONTACT, contactHandler)])
}
