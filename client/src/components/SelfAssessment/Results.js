import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

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
      <h5 style={{ marginTop: '1em' }}>
        Congratulations! You&apos;re on your way towards improving productivity
        and reducing costs.
      </h5>
      <p>
        Your results will be sent to{' '}
        <a
          href={`mailto:${resultsEmail}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          {resultsEmail}
        </a>
      </p>
    </Grid>
    <Grid item>
      Or copy and use the following link to access to your results--and tips on
      how to improve:
    </Grid>
    <Grid item align="center">
      <a href={resultsUrl} target="_blank" rel="noopener noreferrer">
        {resultsUrl}
      </a>
    </Grid>
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
