import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import createStore from 'reduxStore/createStore'

import * as serviceWorker from './serviceWorker'
import App from './App'

const history = createBrowserHistory()
const store = createStore(history)

const rootElement = document.getElementById('root')
const props = { store, history }

ReactDOM.render(<App {...props} />, rootElement)

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      // eslint-disable-next-line no-console
      console.warn('[HMR] - Updating App')
      // eslint-disable-next-line global-require
      const NextApp = require('./App').default
      ReactDOM.render(<NextApp {...props} />, rootElement)
    })
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
