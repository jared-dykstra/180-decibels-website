import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Col, Row } from 'reactstrap'
import { Knob } from 'react-rotary-knob'
import { connect } from 'react-redux'
import { s7 as knobSkin } from 'react-rotary-knob-skin-pack'

import { actions } from '../../redux/selfAssessment'
import {
  currentQuestionTextSelector,
  currentVolumeSelector,
  currentMuteStateSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

// import knobSkin from './knobSkin'
import styles from './SelfAssessment.module.scss'

const minVolume = 0
const maxVolume = 10

class SelfAssessment extends PureComponent {
  static propTypes = {
    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    currentQuestion: PropTypes.string.isRequired,
    isMuted: PropTypes.bool.isRequired,
    volume: PropTypes.number
  }

  static defaultProps = {
    volume: (maxVolume - minVolume) / 2
  }

  render() {
    const {
      toggleMute,
      setVolume,
      currentQuestion,
      isMuted,
      volume
    } = this.props
    const muteButtonColor = isMuted ? 'danger' : 'secondary'
    const muteButtonText = isMuted ? 'muted' : 'mute'
    return (
      <Container fluid>
        <Row>
          <Col>{currentQuestion}</Col>
        </Row>
        <Row>
          <Col xs="5" />
          <Col>
            <Knob
              skin={knobSkin}
              className={styles.knob}
              onChange={setVolume}
              min={maxVolume}
              max={minVolume}
              preciseMode={false}
              value={volume}
            />
          </Col>
          <Col>
            <Button
              color={muteButtonColor}
              active={isMuted}
              onClick={toggleMute}
            >
              {muteButtonText}
            </Button>
          </Col>
          <Col xs="5" />
        </Row>
      </Container>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    currentQuestion: currentQuestionTextSelector(state),
    volume: currentVolumeSelector(state),
    isMuted: currentMuteStateSelector(state)
  }),
  dispatch => ({
    toggleMute: () => dispatch(actions.toggleMute()),
    setVolume: val => dispatch(actions.setVolume(val))
  })
)(SelfAssessment)
