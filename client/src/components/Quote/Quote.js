import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

import styles from './Quote.module.scss'

const Quote = ({ elevation, children, cite, className, right }) => (
  <Paper elevation={elevation}>
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
  </Paper>
)

Quote.propTypes = {
  cite: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  right: PropTypes.bool,
  className: PropTypes.string,
  elevation: PropTypes.number
}

Quote.defaultProps = {
  cite: null,
  right: false,
  elevation: 0,
  className: '' // Intended to be Bootstrap's .h1, .h2, .h3, etc. to set font size
}

export default Quote
