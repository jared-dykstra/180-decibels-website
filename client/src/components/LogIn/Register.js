import Immutable from 'seamless-immutable'
import { isEmpty as _isEmpty } from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'

import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import { withStyles } from '@material-ui/core/styles'

import { actions } from 'reduxStore/auth'
import { REGISTER_FORM_KEY } from 'reduxStore/auth/authConstants'
import {
  makeFormHasErrorSelector,
  makeFormSectionCompleteSelector
} from 'reduxStore/auth/authSelectors'
import { isEmailInUse } from 'reduxStore/auth/fetcher'

import {
  validateRegistration,
  REGISTER_FORM_COMPANY_KEY,
  REGISTER_FORM_FIRST_NAME_KEY,
  REGISTER_FORM_LAST_NAME_KEY,
  REGISTER_FORM_EMAIL_KEY,
  REGISTER_FORM_PHONE_KEY,
  REGISTER_FORM_PASSWORD1_KEY,
  REGISTER_FORM_PASSWORD2_KEY
} from '180-decibels-shared/registration'

import renderField from './renderField'
import Buttons from './Buttons'

const formSections = [
  {
    label: 'A bit about Yourself',
    fields: [
      REGISTER_FORM_FIRST_NAME_KEY,
      REGISTER_FORM_LAST_NAME_KEY,
      REGISTER_FORM_COMPANY_KEY
    ]
  },
  {
    label: 'How can you be reached?',
    fields: [REGISTER_FORM_EMAIL_KEY, REGISTER_FORM_PHONE_KEY]
  },
  {
    label: 'Choose a Password',
    fields: [REGISTER_FORM_PASSWORD1_KEY, REGISTER_FORM_PASSWORD2_KEY]
  }
]

const asyncValidate = async values => {
  // Values is immutableJS instance
  const email = values.get(REGISTER_FORM_EMAIL_KEY)
  const isTaken = email ? await isEmailInUse(email) : false

  const errors = {}
  if (isTaken) {
    errors[REGISTER_FORM_EMAIL_KEY] = 'That email address is already in use'
  }

  if (!_isEmpty(errors)) {
    throw errors
  }
}

const muiStyles = {
  root: {
    'padding-left': 0,
    'padding-right': 0
  }
}

class Register extends PureComponent {
  static propTypes = {
    doRegister: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    resetLabel: PropTypes.string.isRequired,
    aboutSectionHasError: PropTypes.bool.isRequired,
    contactSectionHasError: PropTypes.bool.isRequired,
    passwordSectionHasError: PropTypes.bool.isRequired,
    aboutSectionComplete: PropTypes.bool.isRequired,
    contactSectionComplete: PropTypes.bool.isRequired,
    passwordSectionComplete: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    ...propTypes
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      activeStep: 0
    })
  }

  // handleNext = () => {
  //   this.setState(state =>
  //     Immutable.from({
  //       activeStep: state.activeStep + 1
  //     })
  //   )
  // }

  // handleBack = () => {
  //   this.setState(state =>
  //     Immutable.from({
  //       activeStep: state.activeStep - 1
  //     })
  //   )
  // }

  handleFormSubmit = e => {
    const {
      handleSubmit,
      doRegister,
      aboutSectionComplete,
      contactSectionComplete,
      passwordSectionComplete
    } = this.props
    const { activeStep } = this.state

    // Prevent default submit
    e.preventDefault()
    e.stopPropagation()

    switch (activeStep) {
      case 0:
        if (aboutSectionComplete) {
          this.setStep(1)
        }
        break
      case 1:
        if (contactSectionComplete) {
          this.setStep(2)
        }
        break
      case 2:
        // if (passwordSectionComplete) {
        // }
        // Actually submit the form
        return handleSubmit(doRegister)
      default:
    }

    return false
  }

  setStep = step => {
    this.setState(
      Immutable.from({
        activeStep: step
      })
    )
  }

  render() {
    const {
      classes,
      pristine,
      reset,
      submitting,
      submitLabel,
      cancelLabel,
      resetLabel,
      aboutSectionHasError,
      contactSectionHasError,
      passwordSectionHasError,
      aboutSectionComplete,
      contactSectionComplete,
      passwordSectionComplete
    } = this.props
    const { activeStep } = this.state
    const isSubmitDisabled = submitting
    const isResetDisabled = pristine || submitting

    const selectedStep = activeStep
    const allSectionsComplete =
      aboutSectionComplete && contactSectionComplete && passwordSectionComplete

    return (
      <form onSubmit={this.handleFormSubmit}>
        <Stepper
          activeStep={selectedStep}
          orientation="vertical"
          classes={classes}
        >
          <Step key={0} completed={aboutSectionComplete}>
            <StepLabel
              error={aboutSectionHasError}
              onClick={() => this.setStep(0)}
            >
              {formSections[0].label}
            </StepLabel>
            <StepContent>
              <Grid container spacing={24}>
                <Grid item md={6}>
                  <Field
                    label="First Name"
                    id={REGISTER_FORM_FIRST_NAME_KEY}
                    name={REGISTER_FORM_FIRST_NAME_KEY}
                    type="text"
                    component={renderField}
                    placeholder="Wiley, E"
                    autoComplete="given-name"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <Field
                    label="Last Name"
                    id={REGISTER_FORM_LAST_NAME_KEY}
                    name={REGISTER_FORM_LAST_NAME_KEY}
                    type="text"
                    component={renderField}
                    placeholder="Coyote"
                    autoComplete="family-name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Company"
                    id={REGISTER_FORM_COMPANY_KEY}
                    name={REGISTER_FORM_COMPANY_KEY}
                    type="text"
                    component={renderField}
                    placeholder="ACME"
                    autoComplete="organization"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={1} completed={contactSectionComplete}>
            <StepLabel
              error={contactSectionHasError}
              onClick={() => this.setStep(1)}
            >
              {formSections[1].label}
            </StepLabel>
            <StepContent>
              <Grid container spacing={24}>
                <Grid item md={6}>
                  <Field
                    label="Email"
                    id={REGISTER_FORM_EMAIL_KEY}
                    name={REGISTER_FORM_EMAIL_KEY}
                    type="text"
                    component={renderField}
                    placeholder="wiley@acme.com"
                    autoComplete="email"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <Field
                    label="Phone"
                    id={REGISTER_FORM_PHONE_KEY}
                    name={REGISTER_FORM_PHONE_KEY}
                    type="text"
                    component={renderField}
                    placeholder="403.555.1212"
                    autoComplete="tel"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key={2} completed={passwordSectionComplete}>
            <StepLabel
              error={passwordSectionHasError}
              onClick={() => this.setStep(2)}
            >
              {formSections[2].label}
            </StepLabel>
            <StepContent>
              <Grid container spacing={24}>
                <Grid item md={6}>
                  <Field
                    label="Password"
                    id={REGISTER_FORM_PASSWORD1_KEY}
                    name={REGISTER_FORM_PASSWORD1_KEY}
                    type="password"
                    component={renderField}
                    placeholder="new password"
                    autoComplete="new-password"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <Field
                    label="Confirm Password"
                    id={REGISTER_FORM_PASSWORD2_KEY}
                    name={REGISTER_FORM_PASSWORD2_KEY}
                    type="password"
                    component={renderField}
                    placeholder="confirm"
                    autoComplete="new-password"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>
        <Buttons
          {...{
            isSubmitDisabled,
            isResetDisabled,
            reset,
            submitLabel: allSectionsComplete ? submitLabel : 'Next',
            cancelLabel,
            resetLabel
          }}
        />
      </form>
    )
  }
}

const ConnectedRegister = connect(
  (state, props) => {
    const aboutSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[0].fields
    })
    const contactSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[1].fields
    })
    const passwordSectionHasErrorSelector = makeFormHasErrorSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[2].fields
    })

    const aboutSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[0].fields
    })
    const contactSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[1].fields
    })
    const passwordSectionCompleteSelector = makeFormSectionCompleteSelector({
      formId: REGISTER_FORM_KEY,
      fields: formSections[2].fields
    })

    return {
      aboutSectionHasError: aboutSectionHasErrorSelector(state, props),
      contactSectionHasError: contactSectionHasErrorSelector(state, props),
      passwordSectionHasError: passwordSectionHasErrorSelector(state, props),
      aboutSectionComplete: aboutSectionCompleteSelector(state, props),
      contactSectionComplete: contactSectionCompleteSelector(state, props),
      passwordSectionComplete: passwordSectionCompleteSelector(state, props)
    }
  },
  dispatch => ({
    doRegister: values => dispatch(actions.register(values))
  })
)(withStyles(muiStyles)(Register))

export default reduxForm({
  form: REGISTER_FORM_KEY,
  validate: validateRegistration,
  asyncValidate,
  destroyOnUnmount: false
})(ConnectedRegister)
