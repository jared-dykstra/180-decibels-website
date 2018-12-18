import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import { toggleDialog } from 'reduxStore/getStarted/getStartedActions'

import { DialogFormButtons } from '..'

const muiStyles = {
  root: {
    'padding-left': 0,
    'padding-right': 0
  }
}

class GetStarted extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired
    // ...propTypes
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      activeStep: 0
    })
  }

  setStep = requestedStep => {
    const { activeStep } = this.state
    if (activeStep === requestedStep) {
      return
    }

    this.setState(() =>
      Immutable.from({
        activeStep: requestedStep
      })
    )
  }

  render = () => {
    const { classes } = this.props
    const { activeStep } = this.state
    const calendarSectionComplete = false
    const calendarSectionHasError = false
    const aboutSectionComplete = false
    const aboutSectionHasError = false
    const contactSectionComplete = false
    const contactSectionHasError = false
    return (
      <div>
        <p>
          A 15 minute conversation will help us understand your needs. Book a
          Clarity Session now.
        </p>
        <p>
          Your Clarity Session helps us understand your needs and provides
          techniques you can apply in your business right away.
        </p>
        <form>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            classes={classes}
          >
            <Step key={0} completed={calendarSectionComplete}>
              <StepLabel error={calendarSectionHasError}>
                <Button
                  variant="text"
                  disableRipple
                  onClick={() => this.setStep(0)}
                >
                  Choose a day that works for you
                </Button>
              </StepLabel>
              <StepContent>TODO</StepContent>
            </Step>
            <Step key={1} completed={aboutSectionComplete}>
              <StepLabel error={aboutSectionHasError}>
                <Button
                  variant="text"
                  disableRipple
                  onClick={() => this.setStep(1)}
                >
                  A Bit about yourself...
                </Button>
              </StepLabel>
              <StepContent>TODO</StepContent>
            </Step>
            <Step key={2} completed={contactSectionComplete}>
              <StepLabel error={contactSectionHasError}>
                <Button
                  variant="text"
                  disableRipple
                  onClick={() => this.setStep(2)}
                >
                  How can you be reached?
                </Button>
              </StepLabel>
              <StepContent>TODO</StepContent>
            </Step>
          </Stepper>
          <DialogFormButtons
            {...{
              isSubmitDisabled: false,
              isResetDisabled: false,
              reset: () => {},
              submitLabel: 'OK',
              cancelLabel: 'cancel',
              resetLabel: 'reset',
              closeActionCreator: toggleDialog
            }}
          />
        </form>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    // doToggleDialog: () => dispatch(toggleDialog)
  })
)(withStyles(muiStyles)(GetStarted))
