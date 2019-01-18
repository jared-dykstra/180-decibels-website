import { all, fork } from 'redux-saga/effects'
import {
  mountPoint as selfAssessmentMountPoint,
  reducer as selfAssessmentReducer,
  saga as selfAssessmentSaga
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
import {
  mountPoint as vastMountPoint,
  reducer as vastReducer
  // saga as getStartedSaga
} from './vast'

export const reducers = {
  [selfAssessmentMountPoint]: selfAssessmentReducer,
  [authMountPoint]: authReducer,
  [getStartedMountPoint]: getStartedReducer,
  [vastMountPoint]: vastReducer
}

export function* rootSaga() {
  yield all([fork(authSaga), fork(getStartedSaga), fork(selfAssessmentSaga)])
}
