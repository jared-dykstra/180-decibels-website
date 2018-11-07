import { LOAD_BLOCKS } from './eosConstants'

/**
 * Load the blocks, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_BLOCKS
 */
export const loadBlocks = () => ({
  type: LOAD_BLOCKS
})
