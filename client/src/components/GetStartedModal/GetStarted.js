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
  GET_STARTED_FORM_DATE_TIME_KEY,
  GET_STARTED_FORM_COMPANY_KEY,
  GET_STARTED_FORM_FIRST_NAME_KEY,
  GET_STARTED_FORM_LAST_NAME_KEY,
  GET_STARTED_FORM_EMAIL_KEY,
  GET_STARTED_FORM_PHONE_KEY
} from '180-decibels-shared/getStarted'

import { closeDialog } from 'reduxStore/getStarted/getStartedActions'
import { GET_STARTED_FORM_KEY } from 'reduxStore/getStarted/getStartedConstants'
import { renderField, FIELD_TYPE_DATE_TIME } from 'formUtils'
import { AboutStep, ContactStep, DialogFormButtons } from 'components'

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
      activeStep: 0
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

  render = () => {
    const { classes, reset } = this.props
    const { activeStep } = this.state
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
          <AboutStep
            {...{
              stepKey: 1,
              setStep: this.setStep,
              isComplete: aboutSectionComplete,
              hasError: aboutSectionHasError,
              firstNameKey: GET_STARTED_FORM_FIRST_NAME_KEY,
              lastNameKey: GET_STARTED_FORM_LAST_NAME_KEY,
              companyKey: GET_STARTED_FORM_COMPANY_KEY
            }}
          />
          <ContactStep
            {...{
              stepKey: 2,
              setStep: this.setStep,
              isComplete: contactSectionComplete,
              hasError: contactSectionHasError,
              emailKey: GET_STARTED_FORM_EMAIL_KEY,
              phoneKey: GET_STARTED_FORM_PHONE_KEY
            }}
          />
        </Stepper>
        <DialogFormButtons
          {...{
            isSubmitDisabled: false,
            isResetDisabled: false,
            reset,
            submitLabel: 'OK',
            cancelLabel: 'cancel',
            resetLabel: 'reset',
            closeActionCreator: closeDialog
          }}
        />
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
