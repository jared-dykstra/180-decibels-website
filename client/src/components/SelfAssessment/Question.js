import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { connect } from 'react-redux'
import he from 'he'
import Slider from 'rc-slider'

import { actions } from 'reduxStore/selfAssessment'
import {
  makeVolumeSelector,
  makeMaxVolumeSelector,
  makeMinVolumeSelector,
  makeVolumeStepSelector,
  makeCanGoToNextQuestionSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import 'rc-slider/assets/index.css'

import styles from './Questions.module.scss'

class Question extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    setVolume: PropTypes.func.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volumeStep: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    canGoToNextQuestion: PropTypes.bool.isRequired,
    next: PropTypes.func.isRequired
  }

  doSetVolume = value => {
    const { assessmentName, questionId, setVolume } = this.props
    setVolume({ assessmentName, volume: value, questionId })
  }

  render() {
    const {
      questionText,
      volume,
      minVolume,
      maxVolume,
      volumeStep,
      canGoToNextQuestion,
      next
    } = this.props
    return (
      <div>
        {/* The he library is used to decode HTML character entities like &apos; */}
        <h2>{he.decode(questionText)}</h2>
        <div className={`justify-content-center ${styles.volume}`}>
          <span className={styles[`vol${volume}`]}>{volume}</span>
        </div>
        <Row className={styles['control-row']}>
          <Col>
            <Slider
              value={volume}
              min={minVolume}
              max={maxVolume}
              step={volumeStep}
              dots={false}
              onChange={this.doSetVolume}
              className={styles.slider}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <Button
              size="lg"
              color="primary"
              disabled={!canGoToNextQuestion}
              onClick={next}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    const volumeSelector = makeVolumeSelector()
    const volumeStepSelector = makeVolumeStepSelector()
    const minVolumeSelector = makeMinVolumeSelector()
    const maxVolumeSelector = makeMaxVolumeSelector()
    const canGoToNextQuestionSelector = makeCanGoToNextQuestionSelector()
    return {
      volume: volumeSelector(state, props),
      maxVolume: maxVolumeSelector(state, props),
      minVolume: minVolumeSelector(state, props),
      volumeStep: volumeStepSelector(state, props),
      canGoToNextQuestion: canGoToNextQuestionSelector(state, props)
    }
  },
  dispatch => ({
    setVolume: ({ assessmentName, questionId, volume }) =>
      dispatch(actions.setVolume({ assessmentName, questionId, volume }))
  })
)(Question)
