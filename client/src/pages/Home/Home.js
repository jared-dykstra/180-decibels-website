import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Button, Col, Jumbotron, Row } from 'reactstrap'

import { Logo, Template } from 'components'
import { ROUTE_HELP_ME, ROUTE_HELP_MY_TEAM } from 'redux/routes/routesConstants'

import styles from './Home.module.scss'

export const Home = ({ doClickHelpMe, doClickHelpMyTeam }) => (
  <Template className={styles.home}>
    <Row>
      <Col>
        <section className={styles['section-splash']}>
          <Logo />
          <h1>180 Decibels</h1>
          <h3>Management Consulting for the Modern Manager</h3>
        </section>
      </Col>
    </Row>
    <Row>
      <Col>
        <Jumbotron>
          <h1>Get Started with a Free Hour!</h1>
          <Button color="primary">Get Started</Button>
        </Jumbotron>
      </Col>
    </Row>
    <Row>
      <Col sm="6">
        <Jumbotron className="shadow-lg">
          <h2>I am an Owner Operator</h2>
          <p>
            We re-focus managers on driving to outcome and on creating urgency.
            We offer a practical, results-oriented process to build a
            high-performing culture so you can start feeling more competent and
            more confident--getting huge productivity gains out of your team.
          </p>
          <Button block color="primary" onClick={doClickHelpMe}>
            Discover how 180 Decibels can help you
          </Button>
        </Jumbotron>
      </Col>
      <Col sm="6">
        <Jumbotron className="shadow-lg">
          <h2>I am a Manager</h2>
          <p>
            Are you a manager or leader who is frustrated by your team’s
            results? Is there confusion on who is accountable for what? Do team
            members KNOW what they need to do EACH DAY to meet targets? IF THIS
            SOUNDS LIKE YOUR COMPANY, WE GET IT AND WE CAN HELP.
          </p>
          <Button block color="primary" onClick={doClickHelpMyTeam}>
            Discover what 180 Decibels can do for your team
          </Button>
        </Jumbotron>
      </Col>
    </Row>
    <Row className={styles['video-row']}>
      <Col sm={{ size: 8, offset: 4 }}>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="From Surviving to Excelling"
            className="embed-responsive-item"
            scrolling="no"
            frameBorder="0"
            type="text/html"
            src="https://www.screencast.com/users/dayton.foster/folders/Camtasia/media/14e25118-5cf7-4ae8-9048-2ce0b6dad758/embed"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          />
        </div>
      </Col>
    </Row>
    <Row className={styles['video-row']}>
      <Col sm={{ size: 8 }}>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="From Surviving to Excelling"
            className="embed-responsive-item"
            scrolling="no"
            frameBorder="0"
            type="text/html"
            src="https://www.screencast.com/users/dayton.foster/folders/Camtasia/media/14e25118-5cf7-4ae8-9048-2ce0b6dad758/embed"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          />
        </div>
      </Col>
    </Row>
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
