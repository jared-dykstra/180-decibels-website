import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Jumbotron,
  Row
} from 'reactstrap'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import LazyHero from 'react-lazy-hero'

import { Quote, Template } from 'components'
import { ROUTE_HELP_ME, ROUTE_HELP_MY_TEAM } from 'redux/routes/routesConstants'

import styles from './Home.module.scss'

export const Home = ({ doClickHelpMe, doClickHelpMyTeam }) => (
  <div>
    <Template className={styles.home}>
      <Row>
        <Col>
          <LazyHero
            imageSrc="/teal-mountains.jpg"
            parallaxOffset={150}
            opacity={0.4}
            minHeight="40vh"
            className={styles.banner}
          >
            <h1>Management Consulting for the Modern Manager</h1>
            <Card body>
              <CardTitle>Get Started with a Free Hour!</CardTitle>
              <CardBody>
                <Row>
                  <Col lg="8">
                    Start today and see how you can immediately benefit from
                    what we have to offer
                  </Col>
                  <Col lg="4">
                    <Button color="primary">Get Started</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </LazyHero>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Jumbotron className="shadow-lg">
            <h2>I am an Owner Operator</h2>
            <p>
              We re-focus managers on driving to outcome and on creating
              urgency. We offer a practical, results-oriented process to build a
              high-performing culture so you can start feeling more competent
              and more confident--getting huge productivity gains out of your
              team.
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
              results? Is there confusion on who is accountable for what? Do
              team members KNOW what they need to do EACH DAY to meet targets?
              IF THIS SOUNDS LIKE YOUR COMPANY, WE GET IT AND WE CAN HELP.
            </p>
            <Button block color="primary" onClick={doClickHelpMyTeam}>
              Discover what 180 Decibels can do for your team
            </Button>
          </Jumbotron>
        </Col>
      </Row>
      <Row className={styles['video-row']}>
        <Col md="4" className="d-none d-md-block">
          <Quote cite="Aldous Huxley">
            180 Decibels increased my team&apos;s soma by 25%
          </Quote>
        </Col>
        <Col md="8">
          <Player
            // preload="auto"
            aspectRatio="16:9"
            poster="/intro-video-poster.jpg"
          >
            <source src="https://content.screencast.com/users/dayton.foster/folders/Camtasia/media/14e25118-5cf7-4ae8-9048-2ce0b6dad758/180Voiceover2.mp4" />
            <BigPlayButton position="center" />
            <ControlBar autoHide />
          </Player>
        </Col>
      </Row>
      <Row className={styles['video-row']}>
        <Col md="8">
          <Player
            // preload="auto"
            aspectRatio="16:9"
            poster="/sun-video-poster.jpg"
          >
            <source src="https://content.screencast.com/users/dayton.foster/folders/Camtasia/media/49dc876d-a7c5-4c55-bae5-f4e1abd4c084/180DecibelsSunMetaphor.mp4" />
            <BigPlayButton position="center" />
            <ControlBar autoHide />
          </Player>
        </Col>
        <Col md="4" className="d-none d-md-block">
          <Quote cite="George Orwell">
            We are not <i>meeting</i> goals; We are <i>crushing</i> them
          </Quote>
        </Col>
      </Row>
    </Template>
  </div>
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
