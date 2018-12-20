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

import {
  makeFormHasErrorSelector,
  makeFormSectionCompleteSelector
} from 'reduxStore/form/formSelectors'
import {
  closeDialog as closeActionCreator,
  contact
} from 'reduxStore/getStarted/getStartedActions'
import { GET_STARTED_FORM_KEY } from 'reduxStore/getStarted/getStartedConstants'
import { renderField, FIELD_TYPE_DATE_TIME } from 'formUtils'
import { AboutStep, ContactStep, DialogFormButtons } from 'components'

const formSections = [
  {
    fields: [GET_STARTED_FORM_DATE_TIME_KEY]
  },
  {
    fields: [
      GET_STARTED_FORM_FIRST_NAME_KEY,
      GET_STARTED_FORM_LAST_NAME_KEY,
      GET_STARTED_FORM_COMPANY_KEY
    ]
  },
  {
    fields: [GET_STARTED_FORM_EMAIL_KEY, GET_STARTED_FORM_PHONE_KEY]
  }
]

const muiStyles = {
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent'
  }
}

class GetStarted extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    calendarSectionHasError: PropTypes.bool.isRequired,
    aboutSectionHasError: PropTypes.bool.isRequired,
    contactSectionHasError: PropTypes.bool.isRequired,
    calendarSectionComplete: PropTypes.bool.isRequired,
    aboutSectionComplete: PropTypes.bool.isRequired,
    contactSectionComplete: PropTypes.bool.isRequired,
    ...propTypes
  }

  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { calendarSectionHasError, aboutSectionHasError } = this.props
    const { activeStep } = this.state
    const stepChanged = prevState.activeStep !== activeStep

    if (stepChanged) {
      if (calendarSectionHasError) {
        this.setStep(0)
      } else if (aboutSectionHasError) {
        this.setStep(1)
      }
    }
  }

  handleFormSubmit = (e, ...rest) => {
    const { handleSubmit, doGetStarted, touch } = this.props
    const { activeStep } = this.state

    // Prevent default submit
    e.preventDefault()
    e.stopPropagation()

    switch (activeStep) {
      case 0:
        // Invoke redux-form's validation on fields in the first section
        touch(...formSections[0].fields)
        this.setStep(1)
        break
      case 1:
        // Invoke redux-form's validation on fields in the first two sections
        touch(...formSections[0].fields, ...formSections[1].fields)
        this.setStep(2)
        break
      case 2:
        // Invoke redux-form's validation on fields in all the sections
        touch(
          ...formSections[0].fields,
          ...formSections[1].fields,
          ...formSections[2].fields
        )
        return handleSubmit(doGetStarted)(e, ...rest)
      default:
    }

    return false
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
    const {
      classes,
      reset,
      pristine,
      anyTouched,
      submitting,
      calendarSectionComplete,
      calendarSectionHasError,
      aboutSectionComplete,
      aboutSectionHasError,
      contactSectionComplete,
      contactSectionHasError
    } = this.props
    const { activeStep } = this.state
    const isSubmitDisabled = submitting
    const isResetDisabled = (pristine && !anyTouched) || submitting
    const addTwoWeeks = addWeeks(2)
    return (
      <form onSubmit={this.handleFormSubmit}>
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
                What time is Best?
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
            isSubmitDisabled,
            isResetDisabled,
            reset: () => {
              this.setStep(0)
              reset()
            },
            submitLabel:
              activeStep === formSections.length - 1 ? 'Get Started' : 'Next',
            cancelLabel: 'Cancel',
            resetLabel: 'Reset',
            closeActionCreator
          }}
        />
      </form>
    )
  }
}

const ConnectedGetStarted = connect(
  (state, props) => {
    const calendarSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[0].fields
    })
    const aboutSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[1].fields
    })
    const contactSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[2].fields
    })

    const calendarSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[0].fields
    })
    const aboutSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[1].fields
    })
    const contactSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: GET_STARTED_FORM_KEY,
      fields: formSections[2].fields
    })

    return {
      calendarSectionHasError: calendarSectionHasErrorSelector(state, props),
      aboutSectionHasError: aboutSectionHasErrorSelector(state, props),
      contactSectionHasError: contactSectionHasErrorSelector(state, props),
      calendarSectionComplete: calendarSectionCompleteSelector(state, props),
      aboutSectionComplete: aboutSectionCompleteSelector(state, props),
      contactSectionComplete: contactSectionCompleteSelector(state, props)
    }
  },
  (dispatch, props) => ({
    doGetStarted: values => dispatch(contact(values))
  })
)(withStyles(muiStyles)(GetStarted))

export default reduxForm({
  form: GET_STARTED_FORM_KEY,
  validate: validateGetStarted,
  destroyOnUnmount: false
})(ConnectedGetStarted)
