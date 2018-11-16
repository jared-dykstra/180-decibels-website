import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import he from 'he'
import ReactBootstrapSlider from 'react-bootstrap-slider'

import { actions } from '../../redux/selfAssessment'
import {
  makeVolumeSelector,
  makeMuteSelector,
  maxVolumeSelector,
  minVolumeSelector
} from '../../redux/selfAssessment/selfAssessmentSelectors'

import 'bootstrap-slider/dist/css/bootstrap-slider.min.css'

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

  doSetVolume = ({ target }) => {
    const { questionId, setVolume } = this.props
    const { value } = target
    setVolume({ volume: value, questionId })
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
            <Col md={{ offset: 3, size: 'auto' }}>
              <ReactBootstrapSlider
                value={volume}
                change={this.doSetVolume}
                slideStop={this.doSetVolume}
                step={2}
                max={maxVolume}
                min={minVolume}
                disabled={isMuted ? 'disabled' : null}
                // orientation="vertical"
              />
            </Col>
            <Col>
              <h2 className={styles.volume}>
                {!isMuted && (
                  <span className={styles[`vol${volume}`]}>{volume}</span>
                )}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 3, size: 'auto' }}>
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
