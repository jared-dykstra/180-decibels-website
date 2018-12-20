import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeResultsSelector } from 'reduxStore/selfAssessment/selfAssessmentSelectors'

const Result = ({ assessmentName, results }) => {
  const comments = Object.entries(results).map(([dimension, result]) => (
    <h2 key={dimension}>{result.comment}</h2>
  ))
  return (
    <div>
      <h2>Results</h2>
      {comments}
    </div>
  )
}

Result.propTypes = {
  assessmentName: PropTypes.string.isRequired,
  results: PropTypes.shape({
    dimensions: PropTypes.objectOf(PropTypes.string)
  }).isRequired
}

export default connect((state, props) => {
  const resultsSelector = makeResultsSelector()
  return {
    results: resultsSelector(state, props)
  }
})(Result)
