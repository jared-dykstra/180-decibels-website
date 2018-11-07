import { all, fork } from 'redux-saga/effects'
import { reducer as eosReducer, saga as eosSaga } from './eos'

export const reducers = {
  eos: eosReducer
}

export function* rootSaga() {
  yield all([fork(eosSaga)])
}
