import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import createPalette from '@material-ui/core/styles/createPalette'
import createTypography from '@material-ui/core/styles/createTypography'
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
const fontWeightRegular = 300
const fontWeightMedium = 800

const palette = createPalette({
  primary: {
    main: decibelsTeal,
    contrastText: white
  },
  secondary: {
    main: decibelsRed
  }
})
const typography = createTypography(palette, {
  useNextVariants: true,
  htmlFontSize: 16, // px Using the MUI default.  See: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createTypography.js#L64
  fontSize: 18, // px.  MUI default is 14px
  fontFamily: `'Ubuntu', 'Helvetica', 'Arial', sans-serif`,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  button: {
    textTransform: 'none',
    fontWeight: fontWeightRegular
  }
})

const THEME = createMuiTheme({
  decibels: {
    red: decibelsRed,
    teal: decibelsTeal,
    softWhite: decibelsSoftWhite,
    lightGrey: decibelsLightGrey,
    darkGrey: decibelsDarkGrey,
    white,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium
  },
  palette,
  typography,
  overrides: {
    MuiButton: {
      containedPrimary: {
        // Prevents `a` styling from overriding when component={Link}
        color: `${palette.primary.contrastText} !important`
      },
      containedSecondary: {
        // Prevents `a` styling from overriding when component={Link}
        color: `${palette.secondary.contrastText} !important`
      },
      textSecondary: {
        // Prevents `a` styling from overriding when component={Link}
        color: `${palette.secondary.main} !important`
      }
    },
    MuiFab: {
      root: {
        fontWeight: fontWeightMedium,
        fontSize: 'larger'
      },
      primary: {
        // Prevents `a` styling from overriding when component={Link}
        color: `${palette.primary.contrastText} !important`
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
