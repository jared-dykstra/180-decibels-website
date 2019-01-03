import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  resultsUrlSelector,
  emailSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

const Results = ({ resultsUrl, resultsEmail }) => (
  <div>
    <h2>Results</h2>
    <p>
      Thank you for taking the time to answer. Results will be sent to{' '}
      <a href={`mailto:${resultsEmail}`}>{resultsEmail}</a>
    </p>
    <p>Or use the following link:</p>
    <p>
      <a href={resultsUrl}>{resultsUrl}</a>
    </p>
  </div>
)

Results.propTypes = {
  resultsUrl: PropTypes.string.isRequired,
  resultsEmail: PropTypes.string.isRequired
}

export default connect(
  (state, props) => ({
    resultsUrl: resultsUrlSelector(state, props),
    resultsEmail: emailSelector(state, props)
  }),
  dispatch => ({})
)(Results)
