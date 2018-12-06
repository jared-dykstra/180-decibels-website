import React from 'react'
import PropTypes from 'prop-types'

import styles from './Quote.module.scss'

const Quote = ({ children, cite }) => (
  <div className={styles.quote}>
    <blockquote key="body">{children}</blockquote>
    {cite && <cite key="cite">– {cite}</cite>}
  </div>
)

Quote.propTypes = {
  cite: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Quote.defaultProps = {
  cite: null
}

export default Quote
