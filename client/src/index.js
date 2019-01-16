// TODO: Confirm if the polyfill is still needed.  Originally added for google search console, but that was before
// adding unfetch and including Chrome 41 in the browser list
import 'babel-polyfill'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { createBrowserHistory } from 'history'
import * as Sentry from '@sentry/browser'

import createStore from 'reduxStore/createStore'

import * as serviceWorker from './serviceWorker'
import App from './App'

Sentry.init({
  dsn: 'https://ee37c41764604fbeb3a875ce09e6d9fe@sentry.io/1373036'
})

const history = createBrowserHistory()
const store = createStore(history)

const rootElement = document.getElementById('root')
const props = { store, history }

const renderRootNode = fn => {
  if (rootElement.hasChildNodes()) {
    hydrate(fn(), rootElement)
  } else {
    render(fn(), rootElement)
  }
}

renderRootNode(() => <App {...props} />)

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      // eslint-disable-next-line no-console
      console.warn('[HMR] - Updating App')
      // eslint-disable-next-line global-require
      const NextApp = require('./App').default
      renderRootNode(() => <NextApp {...props} />)
    })
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
