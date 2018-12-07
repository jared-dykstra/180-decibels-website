import React from 'react'
import PropTypes from 'prop-types'

import styles from './Quote.module.scss'

const Quote = ({ children, cite, className, right }) => (
  <div className={`${className} ${styles.quote}`}>
    <blockquote
      key="body"
      className={`${right ? `text-right ${styles.right}` : styles.left}`}
    >
      <span className={styles.glyph}>&ldquo;</span>
      {children}
      {cite && (
        <footer className="blockquote-footer">
          <cite key="cite">{cite}</cite>
        </footer>
      )}
    </blockquote>
  </div>
)

Quote.propTypes = {
  cite: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  right: PropTypes.bool,
  className: PropTypes.string
}

Quote.defaultProps = {
  cite: null,
  right: false,
  className: '' // Intended to be Bootstrap's .h1, .h2, .h3, etc. to set font size
}

export default Quote
