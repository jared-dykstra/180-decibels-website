import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'

import {
  resultsUrlSelector,
  emailSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'
import {} from 'reduxStore/routes/routesConstants'

const Results = ({ resultsUrl, resultsEmail }) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    spacing={32}
  >
    <Grid item>
      <h2>Results</h2>
    </Grid>
    <Grid item>
      {/* Note: Any changes to the text here need to also be reflected in AssessmentResultsEmail.js */}
      <Typography variant="body1" paragraph align="center">
        Congratulations! You&apos;re on your way towards improving productivity
        and reducing costs.
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Your results will be sent to{' '}
        <a
          href={`mailto:${resultsEmail}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          {resultsEmail}
        </a>
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body1" paragraph align="center">
        Or copy and use the following link to access to your results--and tips
        on how to improve:
        <br />
        <a href={resultsUrl} target="_blank" rel="noopener noreferrer">
          {resultsUrl}
        </a>
      </Typography>
    </Grid>
    <Grid item align="center" />
  </Grid>
)

Results.propTypes = {
  resultsUrl: PropTypes.string.isRequired,
  resultsEmail: PropTypes.string
}

Results.defaultProps = {
  resultsEmail: undefined
}

export default connect(
  (state, props) => ({
    resultsUrl: resultsUrlSelector(state, props),
    resultsEmail: emailSelector(state, props)
  }),
  dispatch => ({})
)(Results)
