import { all /* , fork */ } from 'redux-saga/effects'
import {
  mountPoint as selfAssessmentMountPoint,
  reducer as selfAssessmentReducer
  // , saga as selfAssessmentSaga
} from './selfAssessment'

export const reducers = {
  [selfAssessmentMountPoint]: selfAssessmentReducer
}

export function* rootSaga() {
  // yield all([fork(selfAssessmentSaga)])
  yield all()
}
