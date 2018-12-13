import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import { toggleDialog } from 'reduxStore/getStarted/getStartedActions'

const GetStarted = ({ doToggleDialog, children, size, className }) => (
  <Button color="primary" onClick={doToggleDialog} {...{ size, className }}>
    {children}
  </Button>
)

GetStarted.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string
}

GetStarted.defaultProps = {
  className: undefined,
  size: undefined
}

export default connect(
  () => ({}),
  dispatch => ({
    doToggleDialog: () => dispatch(toggleDialog())
  })
)(GetStarted)
