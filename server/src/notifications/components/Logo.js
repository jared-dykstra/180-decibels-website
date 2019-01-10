import React from 'react'
import PropTypes from 'prop-types'

import { banner } from './cids'

const Logo = ({ width, height, style }) => (
  // See: https://community.nodemailer.com/using-embedded-images/
  <img
    alt="180 Decibels"
    style={{ width, height, ...style }}
    src={`cid:${banner.cid}`}
  />
)

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string)
}

Logo.defaultProps = {
  width: '100%',
  height: 'auto',
  style: {}
}

export default Logo
