import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadResults } from 'reduxStore/selfAssessment/selfAssessmentActions'

class AssessmentResult extends PureComponent {
  static propTypes = {
    doLoadResults: PropTypes.func.isRequired,
    // Supplied by react-router
    match: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props)
    const { doLoadResults } = props
    doLoadResults()
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <h1>Assessment Result</h1>
        <h3>ID: {match.params.id}</h3>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch, props) => ({
    doLoadResults: () =>
      dispatch(loadResults({ resultId: props.match.params.id }))
  })
)(AssessmentResult)
