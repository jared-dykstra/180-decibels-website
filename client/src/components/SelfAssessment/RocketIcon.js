import React from 'react'
import PropTypes from 'prop-types'
import { SvgIcon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Logo } from 'components'

const styles = {
  fontSizeLarge: {
    fontSize: '4em'
  }
}

const RocketIcon = ({ cssColor, ...props }) => (
  <SvgIcon {...props} style={cssColor ? { color: cssColor } : undefined}>
    <Logo />
  </SvgIcon>
)

RocketIcon.propTypes = {
  cssColor: PropTypes.string
}

RocketIcon.defaultProps = {
  cssColor: undefined
}

export default withStyles(styles)(RocketIcon)
