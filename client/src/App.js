import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { authenticate } from 'redux/auth/authActions'
import {
  Confidentiality,
  HelpMe,
  HelpMyTeam,
  Home,
  HowWeWork,
  NotFound,
  OurTeam,
  Privacy,
  Services
} from 'pages'
import { ScrollToTop } from 'components'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM,
  ROUTE_OUR_TEAM,
  ROUTE_PRIVACY,
  ROUTE_CONFIDENTIALITY,
  ROUTE_HOW_WE_WORK,
  ROUTE_SERVICES
} from './redux/routes/routesConstants'

import 'bootstrap'
import 'styles/fonts.scss'
import 'styles/theme.scss'
import 'video-react/dist/video-react.css'

class App extends PureComponent {
  static propTypes = {
    doAuthenticate: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const { doAuthenticate } = this.props
    doAuthenticate(null)
  }

  render() {
    const routes = {
      [ROUTE_HOME]: Home,
      [ROUTE_HELP_ME]: HelpMe,
      [ROUTE_HELP_MY_TEAM]: HelpMyTeam,
      [ROUTE_HOW_WE_WORK]: HowWeWork,
      [ROUTE_OUR_TEAM]: OurTeam,
      [ROUTE_CONFIDENTIALITY]: Confidentiality,
      [ROUTE_PRIVACY]: Privacy,
      [ROUTE_SERVICES]: Services
    }

    return (
      <ScrollToTop {...this.props}>
        <Helmet>
          {/* site-wide defaults, which can be overridden by each page */}
          <title>180 Decibels</title>
        </Helmet>

        <Switch>
          {Object.entries(routes).map(([path, Component]) => (
            <Route
              exact
              path={path}
              key={path}
              render={() => <Component {...this.props} />}
            />
          ))}

          <Route render={() => <NotFound />} />
        </Switch>
      </ScrollToTop>
    )
  }
}

// NOTE: Documentation of `withRouter`: https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(
  connect(
    (state /* , ownProps */) => ({}),
    dispatch => ({
      doAuthenticate: () => dispatch(authenticate())
    })
  )(App)
)
