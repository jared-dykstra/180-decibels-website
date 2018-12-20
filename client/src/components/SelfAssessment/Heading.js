import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles, withWidth } from '@material-ui/core'

const styles = {
  root: { minHeight: '2em' }
}

const Heading = ({ width, children, ...hProps }) => (
  <Typography variant={width === 'xs' ? 'h4' : 'h3'} {...hProps}>
    {children}
  </Typography>
)

Heading.propTypes = {
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
  children: PropTypes.string.isRequired
}

Heading.defaultProps = {
  width: 'lg'
}

export default withStyles(styles)(withWidth()(Heading))
