import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as formReducer } from 'redux-form'
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

export default () => {
  const store = createStore(
    combineReducers({
      ...reducers,
      form: formReducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga)
  return store
}
