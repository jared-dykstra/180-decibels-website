import myReducer from './getStartedReducer'
import mySaga from './getStartedSaga'

export const mountPoint = 'getStarted'

// For redux-dynamic-modules
export const module = () => ({
  id: mountPoint,
  reducerMap: {
    [mountPoint]: myReducer
  },
  // This module uses redux-saga middleware. This property will be be used by the SagaExtension
  sagas: [mySaga]
  // Actions to fire when this module is added/removed
  // initialActions: [],
  // finalActions: [],
})
