import React from 'react'
import PropTypes from 'prop-types'

import { Button, Col, FormGroup, Row } from 'reactstrap'

const Buttons = ({ isSubmitDisabled, isResetDisabled, reset }) => (
  <FormGroup>
    <Row>
      <Col>
        <Button
          type="submit"
          color={!isSubmitDisabled ? 'primary' : undefined}
          disabled={isSubmitDisabled}
          className="float-right"
        >
          Submit
        </Button>
        <Button
          type="reset"
          color="link"
          disabled={isResetDisabled}
          onClick={reset}
          className="float-right"
        >
          Reset
        </Button>
      </Col>
    </Row>
  </FormGroup>
)

Buttons.propTypes = {
  isSubmitDisabled: PropTypes.bool.isRequired,
  isResetDisabled: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default Buttons
