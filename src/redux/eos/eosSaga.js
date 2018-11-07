// Adapt the fetcher to redux using redux-saga.

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { LOAD_BLOCKS } from './eosConstants'
import { blocksLoaded, blockLoadingError } from './eosPrivateActions'
import { getBlocks } from './fetcher'

const selectConfigFromState = state => ({
  endpoint: state.eos.endpoint,
  count: state.eos.desiredNumberOfBlocks
})

function* getData() {
  try {
    // Get the config details from redux state, such that if the endpoint or number of requested blocks changes, we're
    // always using up-to-date configuration
    const config = yield select(selectConfigFromState)
    // Get the actual data
    const blocks = yield call(getBlocks, config)
    yield put(blocksLoaded(blocks))
  } catch (err) {
    yield put(blockLoadingError(err))
  }
}

export default function* eosSaga() {
  // Watches for LOAD_BLOCKS actions and calls getData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_BLOCKS, getData)
}
