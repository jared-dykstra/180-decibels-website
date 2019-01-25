import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { Template } from 'components'

import pageStyles from '../pageStyles'
import Sssh from './sssh-cropped.jpg'

const styles = theme => ({
  ...pageStyles({ theme }),
  sssh: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    filter: 'sepia(20%) opacity(75%)'
  }
})

const Confidentiality = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - Confidentiality',
      location
    }}
  >
    <Paper className={classes.paper}>
      <img
        src={Sssh}
        alt="sssh"
        className={`rounded-circle img-thumbnail img-fluid mx-auto d-block w-50 ${
          classes.sssh
        }`}
      />
      <h1 className={classes.center}>180 Decibels</h1>
      <h1 className={classes.center}>
        <small className={classes.muted}>Confidentiality</small>
      </h1>
      <Typography variant="body1" paragraph align="center">
        We know that for our work to be successful, we need to get under the
        covers of your company. This means we often come across sensitive
        information. We are bound by a strict confidentiality pact that ensures
        our clients are to free to openly discuss personal and company
        information.
      </Typography>
      <Typography variant="body1" paragraph align="center">
        <b>Your business is Your business.</b>
      </Typography>
    </Paper>
  </Template>
)

Confidentiality.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired // <-- Passed down from react router
}

export default withStyles(styles)(Confidentiality)
