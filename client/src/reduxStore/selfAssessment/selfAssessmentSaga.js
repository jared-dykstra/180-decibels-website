// Adapt the fetcher to redux & redux-form using redux-saga.
import { isEmpty as _isEmpty } from 'lodash'
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import { getValidationErrors } from 'apiUtils'

import {
  SELF_ASSESSMENT_GET_RESULTS,
  ASSESSMENT_RESULT_FORM_KEY,
  SELF_ASSESSMENT_INITIALIZE,
  SELF_ASSESSMENT_SET_VOLUME
} from './selfAssessmentConstants'
import { getQuiz, answerQuestion, answerQuiz } from './fetcher'
import {
  initialized,
  getResultsSuccess,
  addAnswerId
} from './selfAssessmentActions'
import { mountPoint } from '.'

function* initHandler(action) {
  try {
    const { payload } = action
    const { assessmentName } = payload
    const state = yield select(s => s[mountPoint][assessmentName])
    if (!state.ui.initialized) {
      const quiz = yield call(getQuiz, assessmentName)
      yield put(initialized({ assessmentName, quiz }))
    }
  } catch (err) {
    console.error(`Get Quiz Error. err=${JSON.stringify(err)}`)
    throw err
  }
}

function* contactHandler(action) {
  try {
    yield put(startSubmit(ASSESSMENT_RESULT_FORM_KEY))
    const { payload } = action
    const { assessmentName, contactInfo } = payload
    const state = yield select(s => s[mountPoint][assessmentName])
    const response = yield call(answerQuiz, {
      quizId: state.configuration.quizId,
      quizName: assessmentName,
      contactInfo,
      responses: state.responses
    })
    const validationErrors = getValidationErrors(response)
    yield put(stopSubmit(ASSESSMENT_RESULT_FORM_KEY, validationErrors || {}))
    if (_isEmpty(validationErrors)) {
      yield put(getResultsSuccess())
    }
  } catch (err) {
    yield put(stopSubmit(ASSESSMENT_RESULT_FORM_KEY, {}))
    console.error(`contactHandler Error. err=${JSON.stringify(err)}`)
    throw err
  }
}

function* setVolumeHandler(action) {
  try {
    const { payload } = action
    const { assessmentName, questionId, volume } = payload
    const state = yield select(s => s[mountPoint][assessmentName])
    const answerId = yield call(answerQuestion, {
      quizId: state.configuration.quizId,
      questionId,
      value: volume
    })
    yield put(addAnswerId({ assessmentName, questionId, answerId }))
  } catch (err) {
    console.error(`setVolumeHandlerError.  err=${JSON.stringify(err)}`)
    throw err
  }
}

/* eslint-enable no-console */

export default function*() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield all([
    takeEvery(SELF_ASSESSMENT_INITIALIZE, initHandler),
    takeEvery(SELF_ASSESSMENT_SET_VOLUME, setVolumeHandler),
    takeLatest(SELF_ASSESSMENT_GET_RESULTS, contactHandler)
  ])
}
