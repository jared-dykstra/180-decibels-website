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
  component: Component,
  onClick,
  ...rest
}) => (
  <Component
    {...{
      color,
      variant,
      onClick: e => {
        doOpenDialog(e)
        onClick(e)
      },
      ...rest
    }}
  >
    {children}
  </Component>
)

GetStartedButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  component: PropTypes.func, // <== Function that returns a react Element
  onClick: PropTypes.func
}

GetStartedButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
  component: Button,
  onClick: () => {}
}

export default connect(
  () => ({}),
  dispatch => ({
    doOpenDialog: () => dispatch(openDialog())
  })
)(GetStartedButton)
