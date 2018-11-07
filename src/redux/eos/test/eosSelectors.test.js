import Immutable from 'seamless-immutable'

import initialEosState from '../eosInitialState'
import { errorText, hasError, latestBlockTimestamp } from '../eosSelectors'

import { fixture as storeState } from './mock'

const initialState = Immutable.from({ eos: initialEosState })

describe('eos redux module selectors', () => {
  describe('latestBlockTimestamp selector', () => {
    it('Gets the correct timestamp when there is one block', () => {
      expect(latestBlockTimestamp(storeState)).toEqual(
        '2018-04-18T16:24:23.500'
      )
    })

    it('Gets an undefined timestamp when there are no blocks', () => {
      expect(latestBlockTimestamp(initialState)).toEqual(undefined)
    })
  })

  describe('latestBlockTimestamp selector', () => {
    it('Handles an non-error state correctly', () => {
      expect(hasError(initialState)).toEqual(false)
      expect(errorText(initialState)).toEqual('')
    })

    it('Handles an error state correctly', () => {
      const initialStateWithError = initialState.setIn(
        ['eos', 'error'],
        new Error('Meow')
      )
      expect(hasError(initialStateWithError)).toEqual(true)
      expect(errorText(initialStateWithError)).toEqual('Meow')
    })
  })
})
