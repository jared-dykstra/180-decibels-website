import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

import styles from 'styles/custom.scss'

import App from './ConnectedApp'

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
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: styles['var-font-weight-light'],
        textTransform: 'inherit'
      }
    },
    MuiFab: {
      root: {
        fontWeight: styles['var-font-weight-light'],
        fontSize: 'larger',
        textTransform: 'inherit'
      }
    }
  }
})

class Router extends PureComponent {
  render() {
    const { store, history } = this.props
    return (
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </MuiPickersUtilsProvider>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

Router.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}

export default Router
