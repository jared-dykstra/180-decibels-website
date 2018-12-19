import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import { addWeeks } from 'date-fns/fp'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import {
  validateGetStarted,
  GET_STARTED_FORM_DATE_TIME_KEY
} from '180-decibels-shared/getStarted'

import { GET_STARTED_FORM_KEY } from 'reduxStore/getStarted/getStartedConstants'
import { renderField, FIELD_TYPE_DATE_TIME } from 'formUtils'

const muiStyles = {
  root: {
    'padding-left': 0,
    'padding-right': 0
  }
}

class GetStarted extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    ...propTypes
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

    this.setState(() => ({
      activeStep: requestedStep
    }))
  }

  setDate = value => {
    this.setState(() => ({
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
                When should we contact you?
              </Button>
            </StepLabel>
            <StepContent>
              Book a day that works for you within the next two weeks. If you
              prefer to get started right away, call{' '}
              <a href="tel:+18883214531" className="text-nowrap">
                1-888-321-4531
              </a>
              <Field
                label="Date and Time"
                id={GET_STARTED_FORM_DATE_TIME_KEY}
                name={GET_STARTED_FORM_DATE_TIME_KEY}
                type={FIELD_TYPE_DATE_TIME}
                component={renderField}
                disablePast
                maxDate={addTwoWeeks(new Date())}
                fullWidth
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

const ConnectedGetStarted = connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    // doToggleDialog: () => dispatch(toggleDialog)
  })
)(withStyles(muiStyles)(GetStarted))

export default reduxForm({
  form: GET_STARTED_FORM_KEY,
  validate: validateGetStarted,
  destroyOnUnmount: false
})(ConnectedGetStarted)
