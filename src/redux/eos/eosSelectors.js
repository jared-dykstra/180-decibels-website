import { createSelector } from 'reselect'

import initialState from './eosInitialState'

const eosSelector = state => state.eos

export const hasError = createSelector(
  eosSelector,
  eos => eos.error !== initialState.error
)

export const errorText = createSelector(
  eosSelector,
  hasError,
  // eos.error should be of type Error.  If could end up as a different type, update this selector to reduce it to text
  (eos, doesHaveError) => (doesHaveError ? eos.error.message : '')
)

export const isUpdating = createSelector(eosSelector, eos => eos.updating)

export const blocks = createSelector(eosSelector, eos => eos.blocks)

export const latestBlockTimestamp = createSelector(blocks, values =>
  values[0] ? values[0].timestamp : undefined
)
