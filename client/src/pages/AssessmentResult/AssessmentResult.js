import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

import pageStyles from '../pageStyles'

import CompetencyIcon from './CompetencyIcon'
import CompetencyDetail from './CompetencyDetail'
import Podium from './PodiumIcon'

const styles = theme => ({
  ...pageStyles({ theme }),
  mainHeading: {
    marginTop: '0 !important'
  },
  preparedFor: {
    marginTop: '2em'
  },
  noMargin: {
    margin: '0 !important'
  },
  expansionPanel: {
    margin: '1em'
    // backgroundColor: theme.decibels.softWhite
  }
})

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
    }).isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired, // <-- Passed down from react router
    classes: PropTypes.objectOf(PropTypes.string).isRequired
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
    const { displayName, grades, hasError, location, classes } = this.props

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
        <Typography variant="body1" paragraph>
          Congratulations! You&apos;re on your way towards improving
          productivity and reducing costs.
        </Typography>
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
            <h3 className={classes.mainHeading}>
              Teams that are strong in all competencies tend to be healthy with
              minimal politics &amp; confusion plus high degrees of morale &amp;
              productivity.
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              paragraph
              align="center"
              className={classes.preparedFor}
            >
              <i>Prepared for {displayName}</i>
            </Typography>
          </Grid>
          {grades.map(grade => (
            <ExpansionPanel
              key={grade.competencyId}
              className={classes.expansionPanel}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={24}>
                  <Grid item xs={2} sm={1} style={flexCenter}>
                    <h1 className={classes.noMargin}>
                      <CompetencyIcon
                        competencyId={grade.competencyId}
                        fontSize="inherit"
                        nativeColor="black"
                      />
                    </h1>
                  </Grid>
                  <Grid item xs={10} sm={5} md={3} style={flexCenter}>
                    <h2 className={classes.noMargin}>{grade.name}</h2>
                  </Grid>
                  <Grid item xs={2} sm={1} style={flexCenter}>
                    <div>
                      <h1>
                        {grade.thumbsUp ? (
                          <ThumbUp fontSize="inherit" />
                        ) : (
                          <ThumbDown fontSize="inherit" color="disabled" />
                        )}
                      </h1>
                      <h3 className={classes.noMargin}>{`${Math.round(
                        grade.score * 100
                      )}%`}</h3>
                    </div>
                  </Grid>
                  <Grid item xs={10} sm={5} md={7}>
                    <Typography variant="body2" className={classes.noMargin}>
                      {grade.comment}
                    </Typography>
                    <Button color="primary" variant="contained">
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
          <Grid item xs={12} align="center">
            <Typography variant="body2" paragraph align="center">
              <TakeTestAction />
            </Typography>
          </Grid>
        </Grid>
      </div>
    )

    return (
      <Template
        {...{
          title: '180 Decibels - Assessment Results',
          location
        }}
      >
        <Paper className={classes.paper}>
          {hasError === undefined && <h5>Loading...</h5>}
          {hasError === true && (
            <div>
              <h2>Not Found</h2>
              <Typography variant="body1" paragraph>
                We&apos;re sorry, but the the requested assessment was not found
                or is no longer available
              </Typography>
              <Typography variant="body1" paragraph>
                <TakeTestAction />
              </Typography>
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
        </Paper>
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
)(withStyles(styles)(AssessmentResult))
