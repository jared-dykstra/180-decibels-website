import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import { openDialog } from 'reduxStore/getStarted/getStartedActions'

// TODO: Consolidate with GetStartedButton.js component once Bootstrap has been removed

const Action = ({ children, doOpenDialog, ...props }) => (
  <Button
    color="primary"
    {...props}
    style={{ padding: '0' }}
    onClick={doOpenDialog}
  >
    {children}
  </Button>
)

Action.propTypes = {
  children: PropTypes.string.isRequired,
  doOpenDialog: PropTypes.func.isRequired
}

export default connect(
  null,
  (dispatch, props) => ({
    doOpenDialog: () => dispatch(openDialog(props.children))
  })
)(Action)
