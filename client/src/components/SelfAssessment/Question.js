import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import he from 'he'
import Rating from 'react-rating'
import { Button, Grid } from '@material-ui/core'

import { actions } from 'reduxStore/selfAssessment'
import {
  makeHasBeenRespondedToSelector,
  makeVolumeSelector,
  makeMaxVolumeSelector,
  makeMinVolumeSelector,
  makeVolumeStepSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import RocketIcon from './RocketIcon'

class Question extends PureComponent {
  static propTypes = {
    assessmentName: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    setVolume: PropTypes.func.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volumeStep: PropTypes.number.isRequired,
    hasResponse: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    hintLow: PropTypes.string,
    hintHigh: PropTypes.string
  }

  static defaultProps = {
    hintLow: 'Disagree',
    hintHigh: 'Agree'
  }

  doSetVolume = value => {
    const { assessmentName, questionId, setVolume } = this.props
    setVolume({ assessmentName, volume: value, questionId })
  }

  render() {
    const {
      questionText,
      hasResponse,
      volume,
      minVolume,
      maxVolume,
      volumeStep,
      next,
      hintLow,
      hintHigh
    } = this.props

    const fullSymbols = [
      ...Array((maxVolume - minVolume) / volumeStep + 1).keys()
    ].map(i => {
      const currentValue = (i + minVolume) * volumeStep
      const percent = currentValue / maxVolume
      // range: 1/3...3/3
      const opacity = (percent / 3) * 2 + 0.33
      return (
        <div>
          <RocketIcon fontSize="large" color="secondary" opacity={opacity} />
          <h4>{currentValue}</h4>
        </div>
      )
    })
    return (
      <Grid
        container
        spacing={24}
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          {/* The he library is used to decode HTML character entities like &apos; */}
          <h2>{he.decode(questionText)}</h2>
        </Grid>
        <Grid item>
          <Grid container spacing={24}>
            <Grid
              item
              xs={12}
              style={{
                textAlign: 'center',
                marginTop: '1em'
              }}
            >
              <Rating
                start={minVolume}
                stop={maxVolume + volumeStep}
                step={volumeStep}
                initialRating={hasResponse ? volume + volumeStep : undefined}
                onChange={value => {
                  console.log(`Volume=${value - volumeStep}`)
                  this.doSetVolume(value - volumeStep)
                  next()
                }}
                quiet={false}
                emptySymbol={<RocketIcon fontSize="large" color="disabled" />}
                fullSymbol={fullSymbols}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color="secondary"
                onClick={() => this.doSetVolume(minVolume)}
              >
                {hintLow}
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                textAlign: 'right'
              }}
            >
              <Button
                color="secondary"
                onClick={() => this.doSetVolume(maxVolume)}
              >
                {hintHigh}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  (state, props) => {
    const hasBeenRespondedToSelector = makeHasBeenRespondedToSelector()
    const volumeSelector = makeVolumeSelector()
    const volumeStepSelector = makeVolumeStepSelector()
    const minVolumeSelector = makeMinVolumeSelector()
    const maxVolumeSelector = makeMaxVolumeSelector()
    return {
      hasResponse: hasBeenRespondedToSelector(state, props),
      volume: volumeSelector(state, props),
      maxVolume: maxVolumeSelector(state, props),
      minVolume: minVolumeSelector(state, props),
      volumeStep: volumeStepSelector(state, props)
    }
  },
  dispatch => ({
    setVolume: ({ assessmentName, questionId, volume }) =>
      dispatch(actions.setVolume({ assessmentName, questionId, volume }))
  })
)(Question)
