import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import he from 'he'
import Rating from 'react-rating'
import Swipeable from 'react-swipeable'
import { Button, Grid, withWidth } from '@material-ui/core'

import { setVolume } from 'reduxStore/selfAssessment/selfAssessmentActions'
import {
  makeHasBeenRespondedToSelector,
  makeVolumeSelector,
  makeMaxVolumeSelector,
  makeMinVolumeSelector,
  makeVolumeStepSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import { RocketIcon } from 'components'
import Heading from './Heading'

class Question extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
    assessmentName: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    doSetVolume: PropTypes.func.isRequired,
    minVolume: PropTypes.number.isRequired,
    maxVolume: PropTypes.number.isRequired,
    volumeStep: PropTypes.number.isRequired,
    hasResponse: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    hintLow: PropTypes.string.isRequired,
    hintHigh: PropTypes.string.isRequired,
    autoAdvanceTimeMs: PropTypes.number,
    tracker: PropTypes.shape({
      event: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = {
    width: 'lg', // <== If using SSR, the width won't be defined, so default to PC
    autoAdvanceTimeMs: 250
  }

  constructor(props) {
    super(props)
    this.state = {
      volumeOverride: undefined
    }
  }

  // "animate" it by re-rendering... Just for fun
  animateVolume = (volume, setter) => {
    const { minVolume, volumeStep } = this.props
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    ;[...Array(Math.floor((volume - minVolume) / volumeStep)).keys()].reduce(
      async (promiseChain, i) => {
        await promiseChain
        await sleep(40)
        setter((i + 1) * volumeStep)
      },
      () => {}
    )
  }

  doSetTemporaryVolume = value => {
    if (!value) {
      this.setState(() => ({ volumeOverride: value }))
    } else {
      this.animateVolume(value, v =>
        this.setState(() => ({ volumeOverride: v }))
      )
    }
  }

  doSetVolumeAndTrack = value => {
    const { assessmentName, questionId, doSetVolume, tracker } = this.props
    doSetVolume({ assessmentName, volume: value, questionId })
    // This is important enough to warrant tracking
    tracker.event({
      category: 'SelfAssessment',
      action: 'SetVolume',
      value,
      label: questionId
    })
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
      hintHigh,
      autoAdvanceTimeMs,
      width
    } = this.props
    const { volumeOverride } = this.state
    const getRatingSize = () => {
      switch (width) {
        case 'xs':
          return '2em'
        case 'sm':
          return '3.5em'
        case 'md':
          return '5em'
        default:
          return '6em'
      }
    }
    const ratingSize = getRatingSize()
    const values = [...Array((maxVolume - minVolume) / volumeStep + 1).keys()]
    const symbols = values.map(i => {
      const currentValue = (i + minVolume) * volumeStep
      const percent = currentValue / maxVolume
      const opacity = (percent / 3) * 2 + 0.3333 // <== // range: 1/3...1
      const size = percent / 2 + 0.5 // <== // range: 1/2...1
      const style = { fontSize: `${size * 100}%` }
      return {
        empty: (
          <span style={style}>
            <RocketIcon color="disabled" />
          </span>
        ),
        full: (
          <span style={style}>
            <RocketIcon color="secondary" opacity={opacity} />
            <div
              style={{
                fontSize: '20px',
                marginBottom: '.5rem'
              }}
            >
              {currentValue}
            </div>
          </span>
          // <h4>{currentValue}</h4>
        )
      }
    })

    const getRating = () => {
      if (volumeOverride !== undefined) {
        return volumeOverride
      }
      return hasResponse ? volume : undefined
    }

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
          <Heading>{he.decode(questionText)}</Heading>
        </Grid>

        {/* Consume Swipe events over the clickable rating */}
        <Swipeable
          onSwipedLeft={e => {
            e.stopPropagation()
          }}
          onSwipedRight={e => {
            e.stopPropagation()
          }}
          stopPropagation
          preventDefaultTouchmoveEvent
          trackMouse
        >
          <Grid item>
            <Grid container spacing={24}>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: 'center',
                  marginTop: '.25em',
                  fontSize: ratingSize
                }}
              >
                <Rating
                  start={minVolume}
                  stop={maxVolume + volumeStep}
                  step={volumeStep}
                  initialRating={getRating() + volumeStep}
                  onChange={value => {
                    this.doSetVolumeAndTrack(value - volumeStep)
                    if (!hasResponse && autoAdvanceTimeMs > 0) {
                      // Auto-advance if this is the first answer
                      window.setTimeout(next, autoAdvanceTimeMs)
                    }
                  }}
                  quiet={false}
                  emptySymbol={symbols.map(s => s.empty)}
                  fullSymbol={symbols.map(s => s.full)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="secondary"
                  onClick={() => this.doSetVolumeAndTrack(minVolume)}
                  onMouseEnter={() => this.doSetTemporaryVolume(minVolume)}
                  onMouseLeave={() => this.doSetTemporaryVolume(undefined)}
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
                  onClick={() => this.doSetVolumeAndTrack(maxVolume)}
                  onMouseEnter={() => this.doSetTemporaryVolume(maxVolume)}
                  onMouseLeave={() => this.doSetTemporaryVolume(undefined)}
                >
                  {hintHigh}
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                textAlign: 'center'
              }}
            >
              {hasResponse && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={next}
                >
                  Next
                </Button>
              )}
            </Grid>
          </Grid>
        </Swipeable>
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
    doSetVolume: ({ assessmentName, questionId, volume }) =>
      dispatch(setVolume({ assessmentName, questionId, volume }))
  })
)(withWidth()(Question))
