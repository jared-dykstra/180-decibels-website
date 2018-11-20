import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeResultsSelector } from '../../redux/selfAssessment/selfAssessmentSelectors'

import styles from './Results.module.scss'

const Result = ({ assessmentName, results }) => (
  <div className={styles.results}>
    <h2>Results</h2>
    <pre>{JSON.stringify({ [assessmentName]: results }, null, 2)}</pre>
  </div>
)

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
