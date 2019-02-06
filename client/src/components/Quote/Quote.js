import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  quote: {
    background: theme.decibels.softWhite,
    color: theme.palette.secondary.main,
    fontSize: 'larger',

    '&>blockquote': {
      margin: '0',
      fontSize: '1em',
      padding: '0.5em 10px'
    }
  },

  left: {
    borderLeft: `10px solid ${theme.palette.secondary.main}`
  },

  right: {
    textAlign: 'right',
    borderRight: `10px solid ${theme.palette.secondary.main}`
  },

  glyph: {
    color: theme.decibels.lightGrey,
    fontSize: '4em',
    lineHeight: '0.1em',
    marginRight: '0.25em',
    verticalAlign: '-0.4em'
  },

  footer: {
    fontSize: '80%',
    color: theme.decibels.lightGrey
  }
})

const Quote = ({ elevation, children, cite, className, classes, right }) => (
  <div className={`${className} ${classes.quote}`}>
    <blockquote className={`${right ? classes.right : classes.left}`}>
      <span className={classes.glyph}>&ldquo;</span>
      {children}
      {cite && (
        <footer className={classes.footer}>
          <cite>&ndash; {cite}</cite>
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
  className: ''
}

export default withStyles(styles)(Quote)
