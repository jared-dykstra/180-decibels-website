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
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      form: formReducer,
      ...reducers
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )
  sagaMiddleware.run(rootSaga)
  return store
}
