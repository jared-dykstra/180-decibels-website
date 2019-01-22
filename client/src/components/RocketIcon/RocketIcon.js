import React from 'react'
import PropTypes from 'prop-types'
import { SvgIcon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Logo } from 'components'

const styles = {
  fontSizeLarge: {
    fontSize: '6em'
  }
}

const RocketIcon = ({ opacity, ...props }) => (
  <SvgIcon {...props} style={{ opacity }}>
    <Logo />
  </SvgIcon>
)

RocketIcon.propTypes = {
  opacity: PropTypes.number,
  fontSize: PropTypes.oneOf(['inherit', 'small', 'large'])
}

RocketIcon.defaultProps = {
  opacity: 1,
  fontSize: 'inherit'
}

export default withStyles(styles)(RocketIcon)
