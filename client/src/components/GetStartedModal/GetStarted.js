import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addWeeks } from 'date-fns/fp'
import { InlineDateTimePicker } from 'material-ui-pickers'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

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
    this.state = {
      activeStep: 0,
      selectedDate: null
    }
  }

  setStep = requestedStep => {
    const { activeStep } = this.state
    if (activeStep === requestedStep) {
      return
    }

    this.setState(state => ({
      activeStep: requestedStep
    }))
  }

  setDate = value => {
    this.setState(state => ({
      selectedDate: value
    }))
  }

  render = () => {
    const { classes } = this.props
    const { activeStep, selectedDate } = this.state
    const calendarSectionComplete = false
    const calendarSectionHasError = false
    const aboutSectionComplete = false
    const aboutSectionHasError = false
    const contactSectionComplete = false
    const contactSectionHasError = false
    const addTwoWeeks = addWeeks(2)
    return (
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
            <StepContent>
              Book a day that works for you within the next two weeks
              <InlineDateTimePicker
                keyboard
                label="Date and Time"
                maxDateMessage="Must be Within the next two weeks"
                minDateMessage="Must be Within the next two weeks"
                value={selectedDate}
                onChange={this.setDate}
                disablePast
                maxDate={addTwoWeeks(new Date())}
              />
            </StepContent>
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
      </form>
    )
  }
}

export default connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    // doToggleDialog: () => dispatch(toggleDialog)
  })
)(withStyles(muiStyles)(GetStarted))
