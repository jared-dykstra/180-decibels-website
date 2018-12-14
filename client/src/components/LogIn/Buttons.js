import React from 'react'
import PropTypes from 'prop-types'

// import { Button, Col, FormGroup, Row } from 'reactstrap'
import Button from '@material-ui/core/Button'

const Buttons = ({
  isSubmitDisabled,
  isResetDisabled,
  reset,
  submitLabel,
  resetLabel
}) => (
  <div>
    <Button
      variant="contained"
      type="submit"
      color={!isSubmitDisabled ? 'primary' : undefined}
      disabled={isSubmitDisabled}
      className="float-right"
    >
      {submitLabel}
    </Button>
    <Button
      type="reset"
      color="link"
      disabled={isResetDisabled}
      onClick={reset}
      className="float-right"
    >
      {resetLabel}
    </Button>
  </div>
)

Buttons.propTypes = {
  isSubmitDisabled: PropTypes.bool.isRequired,
  isResetDisabled: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  resetLabel: PropTypes.string.isRequired
}

export default Buttons
