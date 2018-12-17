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
} from 'reduxStore/form/formSelectors'
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
import PasswordField from './PasswordField'

const formSections = [
  {
    label: 'A bit about Yourself...',
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
  },
  clickable: {
    cursor: 'pointer !important'
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

  componentDidUpdate = (prevProps, prevState) => {
    const { aboutSectionHasError, contactSectionHasError } = this.props
    const { activeStep } = this.state
    const stepChanged = prevState.activeStep !== activeStep

    if (stepChanged) {
      if (aboutSectionHasError) {
        this.setStep(0)
      } else if (contactSectionHasError) {
        this.setStep(1)
      }
    }
  }

  handleFormSubmit = (e, ...rest) => {
    const { handleSubmit, doRegister, touch } = this.props
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
        return handleSubmit(doRegister)(e, ...rest)
      default:
    }

    return false
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

  render() {
    const {
      classes,
      anyTouched,
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
    const isResetDisabled = (pristine && !anyTouched) || submitting

    return (
      <form onSubmit={this.handleFormSubmit}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          classes={classes}
        >
          <Step key={0} completed={aboutSectionComplete}>
            <StepLabel
              error={aboutSectionHasError}
              onClick={() => this.setStep(0)}
              className={classes.clickable}
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
              className={classes.clickable}
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
              className={classes.clickable}
            >
              {formSections[2].label}
            </StepLabel>
            <StepContent>
              <Grid container spacing={24}>
                <Grid item md={6}>
                  <PasswordField
                    // Whenever activeStep is changed, react elements using that value of a key are re-rendered, and their internal state is reset
                    // This resets the "show password" functionality when the form is reset
                    key={activeStep}
                    label="Password"
                    formKey={REGISTER_FORM_PASSWORD1_KEY}
                    placeholder="new password"
                    autoComplete="new-password"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <PasswordField
                    key={activeStep}
                    label="Confirm Password"
                    formKey={REGISTER_FORM_PASSWORD2_KEY}
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
            reset: () => {
              this.setStep(0)
              reset()
            },
            submitLabel:
              activeStep === formSections.length - 1 ? submitLabel : 'Next',
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
