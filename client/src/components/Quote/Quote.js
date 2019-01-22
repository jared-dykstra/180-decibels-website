import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  quote: {
    background: 'rgb(249, 249, 249)', // $decibels-soft-white;  TODO - Add color to mui theme
    color: theme.palette.secondary.main,

    '&>blockquote': {
      fontSize: '1em',
      padding: '0.5em 10px'
    }
  },

  left: {
    borderLeft: `10px solid ${theme.palette.secondary.main}`
  },

  right: {
    borderRight: `10px solid ${theme.palette.secondary.main}`
  },

  glyph: {
    color: 'rgb(100, 100, 100)', // $decibels-light-grey;  TODO - Add color to mui theme
    fontSize: '4em',
    lineHeight: '0.1em',
    marginRight: '0.25em',
    verticalAlign: '-0.4em'
  }
})

const Quote = ({ elevation, children, cite, className, classes, right }) => (
  <div className={`${className} ${classes.quote}`}>
    <blockquote
      key="body"
      className={`${right ? `text-right ${classes.right}` : classes.left}`}
    >
      <span className={classes.glyph}>&ldquo;</span>
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
  className: PropTypes.string,
  elevation: PropTypes.number,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

Quote.defaultProps = {
  cite: null,
  right: false,
  elevation: 0,
  className: '' // Intended to be Bootstrap's .h1, .h2, .h3, etc. to set font size
}

export default withStyles(styles)(Quote)
