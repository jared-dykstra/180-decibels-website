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
  minVolumeSelector,
  volumeStepSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

import 'rc-slider/assets/index.css'

import styles from './Questions.module.scss'

class Question extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volumeStep: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
  }

  doToggleMute = () => {
    const { assessmentName, questionId, toggleMute } = this.props
    toggleMute({ assessmentName, questionId })
  }

  doSetVolume = value => {
    const { assessmentName, questionId, setVolume } = this.props
    setVolume({ assessmentName, volume: value, questionId })
  }

  render() {
    const {
      questionText,
      isMuted,
      volume,
      minVolume,
      maxVolume,
      volumeStep
    } = this.props
    const muteButtonColor = isMuted ? 'danger' : 'secondary'
    const muteButtonText = isMuted ? 'muted' : 'mute'
    return (
      <div>
        {/* The he library is used to decode HTML character entities like &apos; */}
        <h2>{he.decode(questionText)}</h2>
        <div
          className={`justify-content-center ${styles.volume} ${
            isMuted ? styles['vol-muted'] : ''
          }`}
        >
          <span className={styles[`vol${volume}`]}>
            {isMuted ? '-' : volume}
          </span>
        </div>
        <Row className={styles['control-row']}>
          <Col xs={3}>
            <Button
              color={muteButtonColor}
              active={isMuted}
              onClick={this.doToggleMute}
              className="float-right"
            >
              {muteButtonText}
            </Button>
          </Col>
          <Col>
            <Slider
              value={volume}
              min={minVolume}
              max={maxVolume}
              step={volumeStep}
              dots={false}
              disabled={isMuted}
              onChange={this.doSetVolume}
              className={styles.slider}
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
      maxVolume: maxVolumeSelector(state, props),
      minVolume: minVolumeSelector(state, props),
      volumeStep: volumeStepSelector(state, props)
    }
  },
  dispatch => ({
    toggleMute: ({ assessmentName, questionId }) =>
      dispatch(actions.toggleMute({ assessmentName, questionId })),
    setVolume: ({ assessmentName, questionId, volume }) =>
      dispatch(actions.setVolume({ assessmentName, questionId, volume }))
  })
)(Question)
