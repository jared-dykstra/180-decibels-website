import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import ReactGA from 'react-ga'

import createStore from 'redux/createStore'

import { get as configGet } from './config'
import * as serviceWorker from './serviceWorker'
import App from './App'

/* eslint-enable import/first */

const history = createBrowserHistory()
const store = createStore(history)

ReactGA.initialize(configGet('googleTrackingId'))

const logPageView = location => {
  const { search } = location
  const uri = window.location.pathname + search
  // TODO: Read the UserID from the cookie
  // TODO: Send event to our own API
  // TODO: Set the ReactGA UserID parameter - https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
  ReactGA.pageview(uri)
}

history.listen(location => {
  logPageView(location)
})

class Router extends PureComponent {
  componentDidMount = () => {
    const { pathname, search } = window.location
    logPageView({ pathname, search })
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Router />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
