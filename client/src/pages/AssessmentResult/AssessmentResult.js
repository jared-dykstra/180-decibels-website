import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid
} from '@material-ui/core'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'

import { Template } from 'components'

import {
  ROUTE_HELP_MY_TEAM,
  ROUTE_HELP_ME,
  ROUTE_HOME
} from 'reduxStore/routes/routesConstants'
import { loadResults } from 'reduxStore/selfAssessment/selfAssessmentActions'
import {
  displayNameSelector,
  // idSelector,
  gradesSelector,
  resultsErrorSelector
} from 'reduxStore/selfAssessment/selfAssessmentSelectors'

import CompetencyIcon from './CompetencyIcon'
import CompetencyDetail from './CompetencyDetail'
import Podium from './PodiumIcon'

class AssessmentResult extends PureComponent {
  static propTypes = {
    doLoadResults: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
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

  static defaultProps = {
    hasError: undefined
  }

  constructor(props) {
    super(props)
    const { doLoadResults } = props
    doLoadResults()
  }

  render() {
    const { displayName, grades, hasError } = this.props

    // Should probably use withStyles() and make this a css class
    const flexCenter = {
      alignItems: 'center',
      display: 'flex'
    }

    const TakeTestAction = () => (
      <i>
        Would you like to take or re-take the assessment for{' '}
        <Link to={{ pathname: ROUTE_HELP_ME, hash: 'quiz' }}>yourself</Link> or{' '}
        <Link to={{ pathname: ROUTE_HELP_MY_TEAM, hash: 'quiz' }}>
          your team
        </Link>
        ?
      </i>
    )

    const Report = () => (
      <div>
        <h2>How are you Doing?</h2>
        <br />
        <Grid container>
          <Grid item xs={4} sm={3} align="right">
            <span
              style={{
                fontSize: '6rem',
                marginRight: '.5em'
              }}
            >
              <Podium fontSize="inherit" />
            </span>
          </Grid>
          <Grid item xs={8} sm={7} style={flexCenter}>
            <h5>
              Teams that are strong in all competencies tend to be healthy with
              minimal politics &amp; confusion plus high degrees of morale &amp;
              productivity.
            </h5>
          </Grid>
          <Grid item xs={12}>
            <p
              style={{
                marginTop: '2em',
                textAlign: 'center'
              }}
            >
              <i>Prepared for {displayName}</i>
            </p>
          </Grid>
          {grades.map(grade => (
            <ExpansionPanel key={grade.competencyId} style={{ margin: '1em' }}>
              <ExpansionPanelSummary>
                <Grid container spacing={24}>
                  <Grid
                    item
                    xs={2}
                    sm={1}
                    style={{
                      fontSize: '2.5rem',
                      ...flexCenter
                    }}
                  >
                    <CompetencyIcon
                      competencyId={grade.competencyId}
                      fontSize="inherit"
                    />
                  </Grid>
                  <Grid item xs={10} sm={5} md={3} style={flexCenter}>
                    <h3>{grade.name}</h3>
                  </Grid>
                  <Grid item xs={2} sm={1} style={flexCenter}>
                    <h2>
                      {grade.thumbsUp ? (
                        <ThumbUp fontSize="inherit" />
                      ) : (
                        <ThumbDown fontSize="inherit" color="disabled" />
                      )}
                    </h2>
                  </Grid>
                  <Grid item xs={10} sm={5} md={7}>
                    {grade.comment}
                    <Button
                      color="primary"
                      variant="outlined"
                      style={{
                        justifyContent: 'left',
                        textAlign: 'left',
                        width: '100%'
                      }}
                    >
                      {grade.link}
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CompetencyDetail competencyId={grade.competencyId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
          <Grid item xs={11} align="center">
            <TakeTestAction />
          </Grid>
        </Grid>
      </div>
    )

    return (
      <Template>
        <Helmet>
          <title>180 Decibels - Confidentiality</title>
          <meta name="description" content="How are you doing?" />
        </Helmet>
        {hasError === undefined && <h5>Loading...</h5>}
        {hasError === true && (
          <div>
            <br />
            <h2>Not Found</h2>
            <p>
              We&apos;re sorry, but the the requested assessment was not found
              or is no longer available
            </p>
            <TakeTestAction />
            <br />
            <br />
            <Button
              color="primary"
              variant="contained"
              size="large"
              component={Link}
              to={ROUTE_HOME}
            >
              Go to Home Page
            </Button>
          </div>
        )}
        {hasError === false && <Report />}
      </Template>
    )
  }
}

export default connect(
  (state, props) => ({
    // id: idSelector(state, props),
    hasError: resultsErrorSelector(state, props),
    displayName: displayNameSelector(state, props),
    grades: gradesSelector(state, props)
  }),
  (dispatch, props) => ({
    doLoadResults: () =>
      dispatch(loadResults({ resultId: props.match.params.id }))
  })
)(AssessmentResult)
