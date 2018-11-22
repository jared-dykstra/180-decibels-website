import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Button } from 'reactstrap'

import {
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from '../../redux/routes/routesConstants'

import styles from './Home.module.scss'

import { Logo, Template } from '../../components'

const Home = ({ doClickHelpMe, doClickHelpMyTeam }) => (
  <Template className={styles.home}>
    <section className={styles['section-splash']}>
      <Logo />
      <h1>180 Decibels</h1>
      <h3>Management Consulting for the Modern Manager</h3>
    </section>
    <section>
      <h2>Help My Team</h2>
      <p>
        Are you a manager or leader who is frustrated by your team’s results? Is
        there confusion on who is accountable for what? Do team members KNOW
        what they need to do EACH DAY to meet targets? IF THIS SOUNDS LIKE YOUR
        COMPANY, WE GET IT AND WE CAN HELP.
      </p>
      <Button color="primary" onClick={doClickHelpMyTeam}>
        Discover what 180 Decibels can do for your team
      </Button>
    </section>
    <section>
      <h2>Help Me</h2>
      <p>
        We re-focus managers on driving to outcome and on creating urgency. We
        offer a practical, results-oriented process to build a high-performing
        culture so you can start feeling more competent and more
        confident--getting huge productivity gains out of your team.
      </p>
      <Button color="primary" onClick={doClickHelpMe}>
        Discover how 180 Decibels can help you
      </Button>
    </section>
    {/*
      <section>
        <h2>Organizations using 180 Decibels</h2>
        <Carousel />
      </section>
    */}
  </Template>
)

Home.propTypes = {
  doClickHelpMe: PropTypes.func.isRequired,
  doClickHelpMyTeam: PropTypes.func.isRequired
}

export default connect(
  (state /* , ownProps */) => ({
    // No props mapped
  }),
  dispatch => ({
    doClickHelpMe: () => dispatch(push(ROUTE_HELP_ME)),
    doClickHelpMyTeam: () => dispatch(push(ROUTE_HELP_MY_TEAM))
  })
)(Home)
