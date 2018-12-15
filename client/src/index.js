import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import ReactGA from 'react-ga'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'

import createStore from 'reduxStore/createStore'

import styles from 'styles/custom.scss'

import { get as configGet } from './config'
import * as serviceWorker from './serviceWorker'
import App from './App'

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

// NOTE: Keep in sync with bootstrap, until bootstrap is removed.
const THEME = createMuiTheme({
  palette: {
    primary: {
      main: styles['var-primary'],
      contrastText: styles['var-white']
    },
    secondary: {
      main: styles['var-secondary']
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: styles['var-font-family-sans-serif'],
    fontWeightLight: styles['var-font-weight-light'],
    fontWeightRegular: styles['var-font-weight-normal'],
    fontWeightMedium: styles['var-font-weight-bold']
  }
})

class Router extends PureComponent {
  componentDidMount = () => {
    const { pathname, search } = window.location
    logPageView({ pathname, search })
  }

  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Router />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
