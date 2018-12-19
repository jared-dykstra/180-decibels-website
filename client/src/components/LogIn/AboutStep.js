import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'

import Grid from '@material-ui/core/Grid'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'

import { renderField, FIELD_TYPE_TEXT } from 'formUtils'

const AboutStep = ({
  stepKey,
  setStep,
  isComplete,
  hasError,
  firstNameKey,
  lastNameKey,
  companyKey,
  ...rest
}) => (
  <Step {...{ key: stepKey, completed: isComplete, ...rest }}>
    <StepLabel error={hasError}>
      <Button variant="text" disableRipple onClick={() => setStep(stepKey)}>
        A bit about Yourself...
      </Button>
    </StepLabel>
    <StepContent>
      <Grid container spacing={24}>
        <Grid item md={6}>
          <Field
            label="First Name"
            id={firstNameKey}
            name={firstNameKey}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="Wiley, E"
            autoComplete="given-name"
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <Field
            label="Last Name"
            id={lastNameKey}
            name={lastNameKey}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="Coyote"
            autoComplete="family-name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            label="Company"
            id={companyKey}
            name={companyKey}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="ACME"
            autoComplete="organization"
            fullWidth
          />
        </Grid>
      </Grid>
    </StepContent>
  </Step>
)

AboutStep.propTypes = {
  stepKey: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  firstNameKey: PropTypes.string.isRequired,
  lastNameKey: PropTypes.string.isRequired,
  companyKey: PropTypes.string.isRequired
}

export default AboutStep
