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
      <h5 style={{ marginTop: '1em' }}>
        Thank you for taking the time to answer. Your results will be sent to{' '}
        <a href={`mailto:${resultsEmail}`} style={{ color: 'inherit' }}>
          {resultsEmail}
        </a>
      </h5>
    </Grid>
    <Grid item>
      Or copy and use the following link for direct access to your results:
    </Grid>
    <Grid item align="center">
      <a href={resultsUrl}>{resultsUrl}</a>
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
