import { all, fork } from 'redux-saga/effects'
import {
  mountPoint as selfAssessmentMountPoint,
  reducer as selfAssessmentReducer
  // , saga as selfAssessmentSaga
} from './selfAssessment'
import {
  mountPoint as authMountPoint,
  reducer as authReducer,
  saga as authSaga
} from './auth'

export const reducers = {
  [selfAssessmentMountPoint]: selfAssessmentReducer,
  [authMountPoint]: authReducer
}

export function* rootSaga() {
  yield all([fork(authSaga)])
  yield all()
}
