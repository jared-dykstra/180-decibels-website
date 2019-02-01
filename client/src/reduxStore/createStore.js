import { createStore } from 'redux-dynamic-modules'
import { getSagaExtension } from 'redux-dynamic-modules-saga'

import { module as authModule } from './auth'
import { module as formModule } from './form'
import { module as routesModule } from './routes'

export default history => {
  const store = createStore(
    /* initial state */
    {},
    /* Enhancers */
    [
      /* sagaMiddleware, routerMiddleware(history) */
    ],
    /* Extensions */
    [getSagaExtension(/* saga context object */)],
    /* ...any additional modules */
    [authModule(), routesModule(history), formModule()]
  )

  /* TODO: HMR
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('.', () => {
        // eslint-disable-next-line no-console
        console.warn('[HMR] - Replacing reducer and restarting Root Saga')

        // eslint-disable-next-line global-require
        const next = require('.').default

        // Replace the reducer
        const nextReducers = next.reducers
        const nextReducer = createReducer(nextReducers)
        store.replaceReducer(nextReducer)

        // Start a new root Saga
        sagaTask.cancel()
        sagaTask.done.then(() => {
          sagaTask = sagaMiddleware.run(next.saga)
        })
      })
    }
  }
  */

  return store
}
