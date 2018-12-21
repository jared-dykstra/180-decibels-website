import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, propTypes } from 'redux-form/immutable'

import Stepper from '@material-ui/core/Stepper'
import { withStyles } from '@material-ui/core/styles'

import {
  validateAssessmentResults,
  ASSESSMENT_RESULT_FORM_COMPANY_KEY,
  ASSESSMENT_RESULT_FORM_FIRST_NAME_KEY,
  ASSESSMENT_RESULT_FORM_LAST_NAME_KEY,
  ASSESSMENT_RESULT_FORM_EMAIL_KEY,
  ASSESSMENT_RESULT_FORM_PHONE_KEY
} from '180-decibels-shared/assessmentResults'

import {
  makeFormHasErrorSelector,
  makeFormSectionCompleteSelector
} from 'reduxStore/form/formSelectors'
import {
  closeDialog as closeActionCreator,
  contact
} from 'reduxStore/getStarted/getStartedActions'
import { ASSESSMENT_RESULT_FORM_KEY } from 'reduxStore/selfAssessment/selfAssessmentConstants'
import { AboutStep, ContactStep, DialogFormButtons } from 'components'

const formSections = [
  {
    fields: [ASSESSMENT_RESULT_FORM_EMAIL_KEY, ASSESSMENT_RESULT_FORM_PHONE_KEY]
  },
  {
    fields: [
      ASSESSMENT_RESULT_FORM_FIRST_NAME_KEY,
      ASSESSMENT_RESULT_FORM_LAST_NAME_KEY,
      ASSESSMENT_RESULT_FORM_COMPANY_KEY
    ]
  }
]

const muiStyles = {
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent'
  }
}

class EmailMe extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    aboutSectionHasError: PropTypes.bool.isRequired,
    contactSectionHasError: PropTypes.bool.isRequired,
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
    const { contactSectionHasError } = this.props
    const { activeStep } = this.state
    const stepChanged = prevState.activeStep !== activeStep

    if (stepChanged) {
      if (contactSectionHasError) {
        this.setStep(0)
      }
    }
  }

  handleFormSubmit = (e, ...rest) => {
    const { handleSubmit, doEmailMe, touch } = this.props
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
        return handleSubmit(doEmailMe)(e, ...rest)
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
      aboutSectionComplete,
      aboutSectionHasError,
      contactSectionComplete,
      contactSectionHasError
    } = this.props
    const { activeStep } = this.state
    const isSubmitDisabled = submitting
    const isResetDisabled = (pristine && !anyTouched) || submitting
    return (
      <form onSubmit={this.handleFormSubmit}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          classes={classes}
        >
          <ContactStep
            {...{
              title: 'Where should we send it?',
              stepKey: 0,
              setStep: this.setStep,
              isComplete: contactSectionComplete,
              hasError: contactSectionHasError,
              emailKey: ASSESSMENT_RESULT_FORM_EMAIL_KEY,
              phoneKey: ASSESSMENT_RESULT_FORM_PHONE_KEY,
              promptForPhone: false
            }}
          >
            Your report will be sent to this email address
          </ContactStep>
          <AboutStep
            {...{
              stepKey: 1,
              setStep: this.setStep,
              isComplete: aboutSectionComplete,
              hasError: aboutSectionHasError,
              firstNameKey: ASSESSMENT_RESULT_FORM_FIRST_NAME_KEY,
              lastNameKey: ASSESSMENT_RESULT_FORM_LAST_NAME_KEY,
              companyKey: ASSESSMENT_RESULT_FORM_COMPANY_KEY
            }}
          >
            Optional: Include your name and/or Company name in the report
          </AboutStep>
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
              activeStep === formSections.length - 1 ? 'Get Report' : 'Next',
            cancelLabel: 'Cancel',
            resetLabel: 'Reset',
            closeActionCreator
          }}
        />
      </form>
    )
  }
}

const ConnectedEmailMe = connect(
  (state, props) => {
    const aboutSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: ASSESSMENT_RESULT_FORM_KEY,
      fields: formSections[1].fields
    })
    const contactSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: ASSESSMENT_RESULT_FORM_KEY,
      fields: formSections[0].fields
    })
    const aboutSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: ASSESSMENT_RESULT_FORM_KEY,
      fields: formSections[1].fields
    })
    const contactSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: ASSESSMENT_RESULT_FORM_KEY,
      fields: formSections[0].fields
    })

    return {
      aboutSectionHasError: aboutSectionHasErrorSelector(state, props),
      contactSectionHasError: contactSectionHasErrorSelector(state, props),
      aboutSectionComplete: aboutSectionCompleteSelector(state, props),
      contactSectionComplete: contactSectionCompleteSelector(state, props)
    }
  },
  (dispatch, props) => ({
    doEmailMe: values => dispatch(contact(values))
  })
)(withStyles(muiStyles)(EmailMe))

export default reduxForm({
  form: ASSESSMENT_RESULT_FORM_KEY,
  validate: validateAssessmentResults,
  destroyOnUnmount: false
})(ConnectedEmailMe)
