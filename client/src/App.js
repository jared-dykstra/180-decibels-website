import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'

import { authenticate } from 'redux/auth/authActions'
import { HelpMe, HelpMyTeam, Home, NotFound } from 'pages'
import { ScrollToTop } from 'components'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from './redux/routes/routesConstants'

import 'bootstrap'
import 'styles/fonts.scss'
import 'styles/custom.scss'

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
