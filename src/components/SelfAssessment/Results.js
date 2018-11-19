import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { resultsSelector } from '../../redux/selfAssessment/selfAssessmentSelectors'

import styles from './Results.module.scss'

const Result = ({ results }) => (
  <div className={styles.results}>
    <h2>Results</h2>
    <pre>{JSON.stringify(results, null, 2)}</pre>
  </div>
)

Result.propTypes = {
  results: PropTypes.shape({
    dimensions: PropTypes.objectOf(PropTypes.string)
  }).isRequired
}

export default connect(state => ({
  results: resultsSelector(state)
}))(Result)
