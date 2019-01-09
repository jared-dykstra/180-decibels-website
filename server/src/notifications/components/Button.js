import React from 'react'
import PropTypes from 'prop-types'

// See: https://www.muicss.com/docs/v1/email/buttons
const Button = ({ href, children, color, flat, raised, size }) => {
  const classNames = [
    'mui-btn',
    color ? `mui-btn--${color}` : '',
    flat ? 'mui-btn--flat' : '',
    raised ? 'mui-btn--raised' : '',
    size ? `mui-btn--${size}` : ''
  ]
  return (
    <a href={href} className={classNames.join(' ')}>
      {children}
    </a>
  )
}

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'danger', 'accent']),
  flat: PropTypes.bool,
  raised: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large'])
}

Button.defaultProps = {
  href: '#',
  color: undefined,
  flat: false,
  raised: false,
  size: undefined
}

export default Button
