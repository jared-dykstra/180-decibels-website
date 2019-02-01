import { connectRouter, routerMiddleware } from 'connected-react-router'

export const mountPoint = 'router'

// For redux-dynamic-modules
export const module = history => ({
  id: mountPoint,
  reducerMap: {
    [mountPoint]: connectRouter(history)
  },
  middlewares: [routerMiddleware(history)],
  // This module uses redux-saga middleware. This property will be be used by the SagaExtension
  sagas: [],
  initialActions: [],
  finalActions: []
})
