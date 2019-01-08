import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

import createStore from 'reduxStore/createStore'
import { get as configGet } from './config'

import * as serviceWorker from './serviceWorker'
import App from './App'

const history = createBrowserHistory()
const store = createStore(history)

ReactGA.initialize(configGet('googleTrackingId'))

console.log('HERE')

const logPageView = location => {
  const { pathname, search, hash } = location
  const uri = `${pathname}${search && search.length > 0 ? search : ''}${
    hash && hash.length > 0 ? hash : ''
  }`

  // TODO: Read the UserID from the cookie
  // TODO: Send event to our own API
  // TODO: Set the ReactGA UserID parameter - https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference

  // console.log(`logPageView: ${uri}`)

  ReactGA.pageview(uri)
}

history.listen(location => {
  logPageView(location)
})

const rootElement = document.getElementById('root')
const props = { store, history, logPageView }

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
