import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { Template } from 'components'
import * as Sentry from '@sentry/browser'

const Error = ({ location }) => (
  <Template
    {...{
      title: '180 Decibels - Error',
      location
    }}
  >
    <br />
    <h2>Not Found</h2>
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

export default Error
