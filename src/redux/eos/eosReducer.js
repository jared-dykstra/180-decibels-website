import initialState from './eosInitialState'
import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS_ERROR
} from './eosConstants'

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BLOCKS:
      return state.setIn(['updating'], true)
    case LOAD_BLOCKS_SUCCESS:
      return state
        .setIn(['updating'], false)
        .setIn(['blocks'], action.payload.blocks)
        .setIn(['error'], initialState.error)
    case LOAD_BLOCKS_ERROR:
      // TODO: Check assumption that it's preferable to retain old blocks.  If not, set blocks to initialState.blocks
      return state
        .setIn(['updating'], false)
        .setIn(['error'], action.payload.error)
    default:
      return state
  }
}
