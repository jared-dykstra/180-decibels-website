import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

import App from './ConnectedApp'

// NOTE: Keep in sync with bootstrap, until bootstrap is removed.

const decibelsRed = 'rgb(146, 26, 15)'
const decibelsTeal = 'rgb(54, 207, 218)'
const decibelsSoftWhite = 'rgb(249, 249, 249)'
const decibelsLightGrey = 'rgb(100, 100, 100)'
const decibelsDarkGrey = 'rgb(50, 50, 50)'
const white = '#fff'
const fontWeightLight = 200
const fontWeightNormal = 300
const fontWeightBold = 800

const THEME = createMuiTheme({
  decibels: {
    red: decibelsRed,
    teal: decibelsTeal,
    softWhite: decibelsSoftWhite,
    lightGrey: decibelsLightGrey,
    darkGrey: decibelsDarkGrey,
    white
  },
  palette: {
    primary: {
      main: decibelsTeal,
      contrastText: white
    },
    secondary: {
      main: decibelsRed
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: `'Ubuntu', sans-serif`,
    fontWeightLight,
    fontWeightRegular: fontWeightNormal,
    fontWeightMedium: fontWeightBold
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: '1.25rem'
      }
    },
    MuiButton: {
      root: {
        fontWeight: fontWeightLight,
        textTransform: 'inherit'
      }
    },
    MuiFab: {
      root: {
        fontWeight: fontWeightLight,
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
