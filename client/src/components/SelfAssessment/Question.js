import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import he from 'he'
import Rating from 'react-rating'
import { Grid } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'

import { actions } from 'reduxStore/selfAssessment'
import {
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
    volume: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    hintLow: PropTypes.string,
    hintHigh: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object.isRequired
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
      volume,
      minVolume,
      maxVolume,
      volumeStep,
      next,
      hintLow,
      hintHigh,
      theme
    } = this.props

    const primaryColor = theme.palette.primary.main
    const fullSymbols = [
      ...Array((maxVolume - minVolume) / volumeStep).keys()
    ].map(i => {
      const currentValue = (i + minVolume) * volumeStep
      const opacity = currentValue / maxVolume
      return (
        <div>
          <RocketIcon
            fontSize="large"
            color="primary"
            cssColor={`rgba(0, 255, 0, ${(opacity / 3) * 2 + 0.33})`}
          />
          <h1>{currentValue}</h1>
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
                stop={maxVolume}
                step={volumeStep}
                initialRating={volume}
                onChange={() => {
                  this.doSetVolume()
                  next()
                }}
                quiet={false}
                emptySymbol={<RocketIcon fontSize="large" color="disabled" />}
                fullSymbol={fullSymbols}
              />
            </Grid>
            <Grid item xs={6} style={{ color: primaryColor }}>
              {hintLow}
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                textAlign: 'right',
                color: primaryColor
              }}
            >
              {hintHigh}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  (state, props) => {
    const volumeSelector = makeVolumeSelector()
    const volumeStepSelector = makeVolumeStepSelector()
    const minVolumeSelector = makeMinVolumeSelector()
    const maxVolumeSelector = makeMaxVolumeSelector()
    return {
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
)(withTheme()(Question))
