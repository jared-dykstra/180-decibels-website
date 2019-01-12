// import Immutable from 'seamless-immutable'
// import { fromJS } from 'immutable'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { reducer as formReducer } from 'redux-form/immutable'
import createSagaMiddleware from 'redux-saga'

import { reducers, rootSaga } from '.'

/* eslint-disable no-underscore-dangle  */

const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension =
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

  // // Grab the state from a global variable injected into the server-generated HTML
  // const getPreloadedState = () => {
  //   if (!window.__DECIBELS_PRELOADED_STATE__) {
  //     return undefined
  //   }

  //   const getFormState = () => {
  //     const store = createStore(formReducer)
  //     return store.getState()
  //   }

  //   // TODO: The 'form' reducer (Redux Form) is the only one using Immutable.js  Turn off Immutable.js and update
  //   // selectors accordingly (They use .get(...))
  //   const state = Immutable.from(window.__DECIBELS_PRELOADED_STATE__).setIn(
  //     ['form'],
  //     getFormState()
  //   )
  //   // // Allow the passed state to be garbage-collected
  //   // delete window.__DECIBELS_PRELOADED_STATE__
  //   // delete window.__DECIBELS_PRELOADED_FORM_STATE__

  //   return state
  // }

  // const preloadedState = getPreloadedState()
  // const store = preloadedState
  //   ? createStore(
  //       createReducer(reducers),
  //       preloadedState,
  //       composeEnhancers(
  //         applyMiddleware(sagaMiddleware, routerMiddleware(history))
  //       )
  //     )
  //   : createStore(
  //       createReducer(reducers),
  //       composeEnhancers(
  //         applyMiddleware(sagaMiddleware, routerMiddleware(history))
  //       )
  //     )

  // // Tell react-snap how to save Redux state resulting from prerender
  // window.snapSaveState = () => {
  //   const storeState = store.getState()
  //   const { form, ...rest } = storeState
  //   return {
  //     __DECIBELS_PRELOADED_STATE__: rest,
  //     // Instances of ImmutableJS
  //     __DECIBELS_PRELOADED_FORM_STATE__: form.toJS()
  //   }
  // }

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
