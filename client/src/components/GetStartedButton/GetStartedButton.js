import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import { openDialog } from 'reduxStore/getStarted/getStartedActions'

const GetStartedButton = ({ doOpenDialog, children, size, className }) => (
  <Button color="primary" onClick={doOpenDialog} {...{ size, className }}>
    {children}
  </Button>
)

GetStartedButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string
}

GetStartedButton.defaultProps = {
  className: undefined,
  size: undefined
}

export default connect(
  () => ({}),
  dispatch => ({
    doOpenDialog: () => dispatch(openDialog())
  })
)(GetStartedButton)
