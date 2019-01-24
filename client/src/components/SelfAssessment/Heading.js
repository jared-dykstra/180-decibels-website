import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    minHeight: '5em',
    color: `${theme.decibels.darkGrey} !important`
  }
})

const Heading = ({ width, children, classes, ...hProps }) => (
  <h2 {...hProps} className={classes.root}>
    {children}
  </h2>
)

Heading.propTypes = {
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // <== See https://material-ui.com/layout/breakpoints/#withwidth-options-higher-order-component
  children: PropTypes.string.isRequired
}

Heading.defaultProps = {
  width: 'lg'
}

export default withStyles(styles)(Heading)
