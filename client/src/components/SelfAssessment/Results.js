import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

const Results = ({ assessmentName }) => (
  // const comments = Object.entries(results).map(([dimension, result]) => (
  //   <h2 key={dimension}>{result.comment}</h2>
  // ))
  <div>
    <h2>Results</h2>
  </div>
)

Results.propTypes = {
  assessmentName: PropTypes.string.isRequired
  // results: PropTypes.shape({
  //   dimensions: PropTypes.objectOf(PropTypes.string)
  // }).isRequired
}

// export default connect((state, props) => {})(Result)

export default Results
