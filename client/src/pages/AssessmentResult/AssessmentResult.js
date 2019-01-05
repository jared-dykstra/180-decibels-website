import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Paper
} from '@material-ui/core'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'

import { Template } from 'components'

import { loadResults } from 'reduxStore/selfAssessment/selfAssessmentActions'
import {
  displayNameSelector,
  // idSelector,
  gradesSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

class AssessmentResult extends PureComponent {
  static propTypes = {
    doLoadResults: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    // id: PropTypes.string.isRequired,
    grades: PropTypes.arrayOf(
      PropTypes.shape({
        competencyId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbsUp: PropTypes.bool.isRequired,
        comment: PropTypes.string.isRequired
      })
    ).isRequired,
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
    const { displayName, grades } = this.props
    return (
      <Template>
        <h2>How are you Doing?</h2>
        <p>
          <i>Prepared for {displayName}</i>
        </p>
        <Grid container>
          {grades.map(grade => (
            <Paper key={grade.competencyId} style={{ margin: '1em' }}>
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <h3>{grade.name}</h3>
                </Grid>
                <Grid item xs={2}>
                  <h2>{grade.thumbsUp ? <ThumbUp /> : <ThumbDown />}</h2>
                </Grid>
                <Grid item xs={5}>
                  <p>
                    {grade.comment}
                    <Button color="primary">{grade.link}</Button>
                  </p>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Grid item xs={4}>
            Icons
          </Grid>
          <Grid item xs={8}>
            <p>
              Teams that are strong in all competencies tend to be healthy with
              minimal politics &amp; confusion plus high degrees of morale &amp;
              productivity.
            </p>
          </Grid>
        </Grid>
      </Template>
    )
  }
}

export default connect(
  (state, props) => ({
    // id: idSelector(state, props),
    displayName: displayNameSelector(state, props),
    grades: gradesSelector(state, props)
  }),
  (dispatch, props) => ({
    doLoadResults: () =>
      dispatch(loadResults({ resultId: props.match.params.id }))
  })
)(AssessmentResult)
