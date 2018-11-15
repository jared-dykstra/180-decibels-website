import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { Knob } from 'react-rotary-knob'
import { connect } from 'react-redux'
import { s7 as knobSkin } from 'react-rotary-knob-skin-pack'

import { actions } from '../../redux/selfAssessment'
import {
  currentVolumeSelector,
  currentMuteStateSelector,
  maxVolumeSelector,
  minVolumeSelector,
  midVolumeSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

// import knobSkin from './knobSkin'
import styles from './SelfAssessment.module.scss'

const midVolume = midVolumeSelector()

class SelfAssessment extends PureComponent {
  static propTypes = {
    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volume: PropTypes.number
  }

  static defaultProps = {
    volume: midVolume
  }

  render() {
    const {
      toggleMute,
      setVolume,
      isMuted,
      volume,
      minVolume,
      maxVolume
    } = this.props
    const muteButtonColor = isMuted ? 'danger' : 'success'
    const muteButtonText = isMuted ? 'muted' : 'mute'
    return (
      <Row>
        <Col md={{ offset: 2, size: 'auto' }}>
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
        <Col md="2">
          <Button color={muteButtonColor} active={isMuted} onClick={toggleMute}>
            {muteButtonText}
          </Button>
        </Col>
      </Row>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    volume: currentVolumeSelector(state),
    isMuted: currentMuteStateSelector(state),
    maxVolume: maxVolumeSelector(state),
    minVolume: minVolumeSelector(state)
  }),
  dispatch => ({
    toggleMute: () => dispatch(actions.toggleMute()),
    setVolume: val => dispatch(actions.setVolume(val))
  })
)(SelfAssessment)
