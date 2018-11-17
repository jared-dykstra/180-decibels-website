import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import he from 'he'
import Slider from 'rc-slider'

import { actions } from '../../redux/selfAssessment'
import {
  makeVolumeSelector,
  makeMuteSelector,
  maxVolumeSelector,
  minVolumeSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

import 'rc-slider/assets/index.css'

import styles from './SelfAssessment.module.scss'

class Question extends PureComponent {
  static propTypes = {
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
  }

  doToggleMute = () => {
    const { questionId, toggleMute } = this.props
    toggleMute({ questionId })
  }

  doSetVolume = value => {
    const { questionId, setVolume } = this.props
    setVolume({ volume: value, questionId })
  }

  render() {
    const { questionText, isMuted, volume, minVolume, maxVolume } = this.props
    const muteButtonColor = isMuted ? 'danger' : 'success'
    const muteButtonText = isMuted ? 'muted' : 'mute'
    return (
      <div className={styles.question}>
        <Row>
          <Col md={12}>
            {/* The he library is used to decode HTML character entities like &apos; */}
            <h2>{he.decode(questionText)}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={3}>
            <div
              className={`${styles.volume} ${isMuted ? styles.volMuted : ''}`}
            >
              <span className={styles[`vol${volume}`]}>
                {isMuted ? '-' : volume}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Button
              color={muteButtonColor}
              active={isMuted}
              onClick={this.doToggleMute}
            >
              {muteButtonText}
            </Button>
          </Col>
          <Col xs={10}>
            <Slider
              value={volume}
              min={minVolume}
              max={maxVolume}
              step={1}
              dots
              disabled={isMuted}
              className={styles.slider}
              onChange={this.doSetVolume}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    const volumeSelector = makeVolumeSelector()
    const muteSelector = makeMuteSelector()
    return {
      volume: volumeSelector(state, props),
      isMuted: muteSelector(state, props),
      maxVolume: maxVolumeSelector(state),
      minVolume: minVolumeSelector(state)
    }
  },
  dispatch => ({
    toggleMute: ({ questionId }) =>
      dispatch(actions.toggleMute({ questionId })),
    setVolume: ({ questionId, volume }) =>
      dispatch(actions.setVolume({ questionId, volume }))
  })
)(Question)
