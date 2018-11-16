import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { Knob } from 'react-rotary-knob'
import { connect } from 'react-redux'
import { s7 as knobSkin } from 'react-rotary-knob-skin-pack'
import he from 'he'

import { actions } from '../../redux/selfAssessment'
import {
  makeVolumeSelector,
  makeMuteSelector,
  maxVolumeSelector,
  minVolumeSelector,
  midVolumeSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

// import knobSkin from './knobSkin'
import styles from './SelfAssessment.module.scss'

const midVolume = midVolumeSelector()

class Question extends PureComponent {
  static propTypes = {
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
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

  doToggleMute = () => {
    const { questionId, toggleMute } = this.props
    toggleMute({ questionId })
  }

  doSetVolume = val => {
    const { questionId, setVolume } = this.props
    setVolume({ volume: val, questionId })
  }

  render() {
    const { questionText, isMuted, volume, minVolume, maxVolume } = this.props
    const muteButtonColor = isMuted ? 'danger' : 'success'
    const muteButtonText = isMuted ? 'muted' : 'mute'
    return (
      <div>
        {/* The he library is used to decode HTML character entities like &apos; */}
        <h2>{he.decode(questionText)}</h2>
        <div className={styles.buttons}>
          <Row>
            <Col md={{ offset: 2, size: 'auto' }}>
              <Knob
                skin={knobSkin}
                className={styles.knob}
                onChange={this.doSetVolume}
                min={maxVolume}
                max={minVolume}
                preciseMode={false}
                value={volume}
              />
            </Col>
            <Col md="2">
              <Button
                color={muteButtonColor}
                active={isMuted}
                onClick={this.doToggleMute}
              >
                {muteButtonText}
              </Button>
            </Col>
          </Row>
        </div>
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
