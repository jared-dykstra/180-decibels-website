import { LOAD_BLOCKS_SUCCESS, LOAD_BLOCKS_ERROR } from './eosConstants'

/**
 * Dispatched when the blocks are loaded by the request saga
 *
 * @param  {array} blocks The block's data
 * @return {object}      An action object with a type of LOAD_BLOCKS_SUCCESS passing the blocks
 */
export const blocksLoaded = blocks => ({
  type: LOAD_BLOCKS_SUCCESS,
  payload: { blocks }
})

/**
 * Dispatched when loading the blocks fails
 *
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOAD_BLOCKS_ERROR passing the error
 */
export const blockLoadingError = error => ({
  type: LOAD_BLOCKS_ERROR,
  payload: { error }
})
