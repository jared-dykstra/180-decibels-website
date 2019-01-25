import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import { Template } from 'components'
import * as Sentry from '@sentry/browser'
import { withStyles } from '@material-ui/core/styles'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme })
})

const Error = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - Error',
      location,
      className: classes.root
    }}
  >
    <br />
    <p>Sorry, an unexpected error occurred on the page</p>
    <br />
    <br />
    <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={() => Sentry.showReportDialog()}
    >
      Report Feedback
    </Button>
  </Template>
)

Error.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(Error)
