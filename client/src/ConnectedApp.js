import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { authenticate } from 'reduxStore/auth/authActions'
import { userIdSelector } from 'reduxStore/auth/authSelectors'
import {
  AssessmentResult,
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
import { GetStartedModal, ScrollToTop } from 'components'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM,
  ROUTE_OUR_TEAM,
  ROUTE_PRIVACY,
  ROUTE_CONFIDENTIALITY,
  ROUTE_HOW_WE_WORK,
  ROUTE_SERVICES
} from 'reduxStore/routes/routesConstants'

import 'bootstrap'
import 'styles/fonts.scss'
import 'styles/theme.scss'
import 'video-react/dist/video-react.css'

import ReactGA from 'react-ga'
import { get as configGet } from './config'

class App extends PureComponent {
  static propTypes = {
    userId: PropTypes.string,
    doAuthenticate: PropTypes.func.isRequired
  }

  static defaultProps = {
    userId: undefined
  }

  // Start by just defining componentDidCatch(), so at least errors get logged
  // static getDerivedStateFromError = error => ({ fatalError: true })

  constructor(props) {
    super(props)
    props.history.listen(location => {
      this.logPageView()
    })
  }

  componentDidUpdate = prevProps => {
    const { userId } = this.props
    const { userId: prevUserId } = prevProps
    if (userId !== prevUserId) {
      this.initializeTracker()
    }
  }

  componentDidMount = () => {
    const { doAuthenticate } = this.props
    doAuthenticate(null)
  }

  componentDidCatch = (error, info) => {
    this.logError({ error, info, fatal: true })
  }

  initializeTracker = () => {
    const { userId } = this.props
    const isInit = 'decibels_is_initialized'
    if (!window[isInit] && userId) {
      window[isInit] = true
      ReactGA.initialize(configGet('googleTrackingId'), {
        debug: process.env.NODE_ENV !== 'production',
        titleCase: false,
        gaOptions: {
          userId, // <== // Sets the ReactGA UserID parameter - https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
          siteSpeedSampleRate: 100 // <== By default, only 1% of data is sent; send it all
        }
      })
      // Since it's initialized, log the current page (which already loaded)
      this.logPageView()
    }
  }

  logPageView = () => {
    const { userId } = this.props
    // this.props.location doesn't always give the up-to-date pathname, but window.location does.  Not sure what that's all about
    const { pathname, search, hash } = window.location
    const uri = `${pathname}${search && search.length > 0 ? search : ''}${
      hash && hash.length > 0 ? hash : ''
    }`
    // TODO: Send event to our own API
    console.log(`Tracker - LogPageView: ${userId} - ${uri}`)
    ReactGA.pageview(uri)
  }

  logModalView = ({ modalName }) => {
    const { userId } = this.props
    // TODO: Send event to our own API
    console.log(`Tracker - ModalName: ${userId} - ${modalName}`)
    ReactGA.modalview(modalName)
  }

  // See: https://github.com/react-ga/react-ga#reactgaeventargs
  logEvent = ({ category, action, label, value }) => {
    const { userId } = this.props
    // TODO: Send event to our own API
    console.log(`Tracker - LogEvent ${userId}, ${category}, ${action}`)
    ReactGA.event({ category, action, label, value })
  }

  logError = ({ error, info, fatal = true }) => {
    const description = `Error: ${error}${
      info ? ` info=${JSON.stringify(info)}` : ''
    }`
    // TODO: Send event to our own API
    console.error(`Tracker - LogError ${description}`)
    ReactGA.exception({ description, fatal })
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

    const propsWithTracker = {
      ...this.props,
      tracker: {
        pageView: this.logPageView,
        event: this.logEvent,
        modalView: this.logModalView
      }
    }

    return (
      <ScrollToTop {...propsWithTracker}>
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
              render={() => <Component {...propsWithTracker} />}
            />
          ))}
          <Route
            path={`(${ROUTE_HELP_ME}|${ROUTE_HELP_MY_TEAM})/result/:id`}
            render={() => <AssessmentResult {...propsWithTracker} />}
          />
          <Route render={() => <NotFound {...propsWithTracker} />} />
        </Switch>

        <GetStartedModal {...propsWithTracker} />
      </ScrollToTop>
    )
  }
}

// NOTE: Documentation of `withRouter`: https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(
  connect(
    state => ({
      userId: userIdSelector(state)
    }),
    dispatch => ({
      doAuthenticate: () => dispatch(authenticate())
    })
  )(App)
)
