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
import {
  mountPoint as getStartedMountPoint,
  reducer as getStartedReducer,
  saga as getStartedSaga
} from './getStarted'

export const reducers = {
  [selfAssessmentMountPoint]: selfAssessmentReducer,
  [authMountPoint]: authReducer,
  [getStartedMountPoint]: getStartedReducer
}

export function* rootSaga() {
  yield all([fork(authSaga), fork(getStartedSaga)])
  yield all()
}
