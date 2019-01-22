import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { openDialog } from 'reduxStore/getStarted/getStartedActions'

const GetStartedButton = ({
  doOpenDialog,
  children,
  color,
  variant,
  ...rest
}) => (
  <Button
    {...{
      color,
      variant,
      onClick: doOpenDialog,
      ...rest
    }}
  >
    {children}
  </Button>
)

GetStartedButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string
}

GetStartedButton.defaultProps = {
  color: 'primary',
  variant: 'contained'
}

export default connect(
  () => ({}),
  dispatch => ({
    doOpenDialog: () => dispatch(openDialog())
  })
)(GetStartedButton)
