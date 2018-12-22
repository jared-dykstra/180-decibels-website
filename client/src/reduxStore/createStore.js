import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { reducer as formReducer } from 'redux-form/immutable'
import createSagaMiddleware from 'redux-saga'

import { reducers, rootSaga } from '.'

const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension =
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

export default history => {
  const createReducer = myReducers =>
    combineReducers({
      router: connectRouter(history),
      form: formReducer,
      ...myReducers
    })
  const store = createStore(
    createReducer(reducers),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )
  let sagaTask = sagaMiddleware.run(rootSaga)

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

  return store
}
