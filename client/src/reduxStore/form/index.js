import { reducer as myReducer } from 'redux-form/immutable'

export const mountPoint = 'form'

// For redux-dynamic-modules
export const module = () => ({
  id: mountPoint,
  reducerMap: {
    [mountPoint]: myReducer
  },
  // This module uses redux-saga middleware. This property will be be used by the SagaExtension
  sagas: [],
  initialActions: [],
  finalActions: []
})
