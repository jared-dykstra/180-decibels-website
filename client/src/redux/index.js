import { all, fork } from 'redux-saga/effects'
import {
  mountPoint as selfAssessmentMountPoint,
  reducer as selfAssessmentReducer
  // , saga as selfAssessmentSaga
} from './selfAssessment'
import {
  mountPoint as userManagementMountPoint,
  reducer as userManagementReducer,
  saga as userManagementSaga
} from './userManagement'

export const reducers = {
  [selfAssessmentMountPoint]: selfAssessmentReducer,
  [userManagementMountPoint]: userManagementReducer
}

export function* rootSaga() {
  yield all([fork(userManagementSaga)])
  yield all()
}
