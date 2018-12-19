import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'

import Grid from '@material-ui/core/Grid'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'

import { renderField, FIELD_TYPE_TEXT } from 'formUtils'

const ContactStep = ({
  stepKey,
  setStep,
  isComplete,
  hasError,
  emailKey,
  phoneKey,
  ...rest
}) => (
  <Step {...{ key: stepKey, completed: isComplete, ...rest }}>
    <StepLabel error={hasError}>
      <Button variant="text" disableRipple onClick={() => setStep(stepKey)}>
        How can you be reached?
      </Button>
    </StepLabel>
    <StepContent>
      <Grid container spacing={24}>
        <Grid item md={6}>
          <Field
            label="Email"
            id={emailKey}
            name={emailKey}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="wiley@acme.com"
            autoComplete="email"
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <Field
            label="Phone"
            id={phoneKey}
            name={phoneKey}
            type={FIELD_TYPE_TEXT}
            component={renderField}
            placeholder="403.555.1212"
            autoComplete="tel"
            fullWidth
          />
        </Grid>
      </Grid>
    </StepContent>
  </Step>
)

ContactStep.propTypes = {
  stepKey: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  emailKey: PropTypes.string.isRequired,
  phoneKey: PropTypes.string.isRequired
}

export default ContactStep
