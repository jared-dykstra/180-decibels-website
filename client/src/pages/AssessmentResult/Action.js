import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Action = ({ children, ...props }) => (
  <Button color="primary" {...props} style={{ padding: '0' }}>
    {children}
  </Button>
)

Action.propTypes = {
  children: PropTypes.string.isRequired
}

export default Action
