import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Helmet } from 'react-helmet'
import { Button, Col, Jumbotron, Row } from 'reactstrap'
import Waypoint from 'react-waypoint'
import { Paper } from '@material-ui/core'

import { GetStartedButton, Quote, Template, Video } from 'components'
import {
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from 'reduxStore/routes/routesConstants'

import { get as configGet } from '../../config'
import styles from './Home.module.scss'

const CDN = configGet('cdn')

export class Home extends PureComponent {
  handleWaypoint = (id = '') => {
    const { location, history } = this.props
    history.replace({
      pathname: location.path,
      search: location.search,
      hash: id
    })
  }

  render() {
    const { doClickHelpMe, doClickHelpMyTeam } = this.props
    const tagline = 'Removing the Complexity from Managing Your Team'
    return (
      <Template className={styles.home}>
        <Helmet>
          <meta name="description" content={tagline} />
        </Helmet>
        <Col>
          <div className={styles.wrapper}>
            <div className={styles.banner}>
              <div className={styles.overlay}>
                <h1 className="pt-2 pt-sm-4 pt-lg-5">{tagline}</h1>
                <div className={`mb-2 pb-sm-3 ${styles['btn-container']}`}>
                  <GetStartedButton size="lg" className="p-lg-3">
                    Schedule a Complimentary Results Coaching Session Now
                  </GetStartedButton>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Row id="i-am">
          <Col sm="6">
            <Paper elevation={6}>
              <Jumbotron
                className={`${styles.persona} ${styles.owner}`}
                onClick={doClickHelpMe}
              >
                <h2>I am an Owner Operator</h2>
                <p>
                  We re-focus managers on driving to outcome and on creating
                  urgency. We offer a practical, results-oriented process to
                  build a high-performing culture so you can start feeling more
                  competent and more confident--getting huge productivity gains
                  out of your team.
                </p>
                <Button
                  size="lg"
                  block
                  color="primary"
                  onClick={e => {
                    doClickHelpMe()
                    e.stopPropagation()
                  }}
                >
                  Discover how 180 Decibels can help you
                </Button>
              </Jumbotron>
            </Paper>
          </Col>
          <Col sm="6">
            <Paper elevation={6}>
              <Jumbotron
                className={`${styles.persona} ${styles.manager}`}
                onClick={doClickHelpMyTeam}
              >
                <h2>I am a Manager</h2>
                <p>
                  Are you a manager or leader who is frustrated by your team’s
                  results? Is there confusion on who is accountable for what? Do
                  team members KNOW what they need to do EACH DAY to meet
                  targets? IF THIS SOUNDS LIKE YOUR COMPANY, WE GET IT AND WE
                  CAN HELP.
                </p>
                <Button
                  size="lg"
                  block
                  color="primary"
                  onClick={e => {
                    doClickHelpMyTeam()
                    e.stopPropagation()
                  }}
                >
                  Discover what 180 Decibels can do for your team
                </Button>
              </Jumbotron>
            </Paper>
          </Col>
        </Row>
        <Row className={styles['video-row']}>
          <Col md="4" className="d-none d-md-block">
            <Quote className="h3" cite="Vincent, CEO">
              180 Decibels increased my team&apos;s results by 22%
            </Quote>
          </Col>
          <Col md="8">
            <Waypoint
              onEnter={() => this.handleWaypoint('intro')}
              onLeave={() => this.handleWaypoint()}
            >
              <section id="intro">
                <Paper>
                  <Video
                    {...{
                      poster: `${CDN}/intro-video-poster.jpg`,
                      src: `${CDN}/180Voiceover2.mp4`
                    }}
                  />
                </Paper>
              </section>
            </Waypoint>
          </Col>
        </Row>
        <Row className={styles['video-row']}>
          <Col md="8">
            <section id="focus">
              <Paper>
                <Video
                  {...{
                    poster: `${CDN}/sun-video-poster.jpg`,
                    src: `${CDN}/180DecibelsSunMetaphor.mp4`
                  }}
                />
              </Paper>
            </section>
          </Col>
          <Col md="4" className="d-none d-md-block">
            <Quote right className="h3" cite="Patrick, Technical Lead">
              We are not <i>meeting</i> goals; We are <i>crushing</i> them
            </Quote>
          </Col>
        </Row>
      </Template>
    )
  }
}

Home.propTypes = {
  doClickHelpMe: PropTypes.func.isRequired,
  doClickHelpMyTeam: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired, // <-- Passed down from react router
  location: PropTypes.shape({
    location: PropTypes.string,
    path: PropTypes.string
  }).isRequired // <-- Passed down from react router
}

export default connect(
  () => ({}),
  dispatch => ({
    doClickHelpMe: () => dispatch(push(ROUTE_HELP_ME)),
    doClickHelpMyTeam: () => dispatch(push(ROUTE_HELP_MY_TEAM))
  })
)(Home)
