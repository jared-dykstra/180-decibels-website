import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'

import { authenticate } from 'redux/auth/authActions'
import {
  Confidentiality,
  HelpMe,
  HelpMyTeam,
  Home,
  HowWeWork,
  NotFound,
  OurTeam,
  Privacy
} from 'pages'
import { ScrollToTop } from 'components'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM,
  ROUTE_OUR_TEAM,
  ROUTE_PRIVACY,
  ROUTE_CONFIDENTIALITY,
  ROUTE_HOW_WE_WORK
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
    return (
      <ScrollToTop {...this.props}>
        <Switch>
          <Route exact path={ROUTE_HOME} render={() => <Home />} />
          <Route exact path={ROUTE_HELP_ME} render={() => <HelpMe />} />
          <Route
            exact
            path={ROUTE_HELP_MY_TEAM}
            render={() => <HelpMyTeam />}
          />
          <Route exact path={ROUTE_HOW_WE_WORK} render={() => <HowWeWork />} />
          <Route exact path={ROUTE_OUR_TEAM} render={() => <OurTeam />} />
          <Route
            exact
            path={ROUTE_CONFIDENTIALITY}
            render={() => <Confidentiality />}
          />
          <Route exact path={ROUTE_PRIVACY} render={() => <Privacy />} />
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
