import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { SelfAssessment, Quote, Template } from 'components'

import styles from './HelpMyTeam.module.scss'
import pageStyles from '../pageStyles'

const renderQuiz = props => (
  <SelfAssessment assessmentName="helpMyTeam" id="quiz" {...props} />
)

const styles2 = theme => ({
  ...pageStyles(theme),
  fullHeight: {
    minHeight: '100vh'
  },
  intro: {
    marginBottom: theme.spacing.unit * 7
  },
  addendum: {
    marginTop: theme.spacing.unit * 7
  },
  quote: {
    margin: theme.spacing.unit * 7
  }
})

const renderFullPage = props => {
  const { classes } = props
  return (
    <Paper className={`${classes.paper} ${classes.fullHeight}`}>
      <h1>Self Assessment</h1>

      <Typography variant="body1">
        It only takes one minute to get results you can use.
      </Typography>
      <Typography variant="body1" className={classes.intro}>
        Use this self-assessment to understand your situation. These questions
        are enough to create an initial report, which will contain concrete,
        actionable steps that you can immediately use.
      </Typography>
      {renderQuiz(props)}
      <Typography variant="body1" className={classes.addendum}>
        180 Decibels generates real ROI and substantially improves teams&apos;s
        ability to execute.
      </Typography>
      <Typography variant="body1">
        We let you set the direction while we saturate your organization with a
        proven process for getting where you want to go. Our mission is to
        measurably improve team productivity with tactical operational tools and
        processes.
      </Typography>
      <Quote
        right
        cite="John, Executive Director"
        className={`h4 ${classes.quote}`}
      >
        My very first sit down with 180 Decibels was eye opening, to say the
        least. From the first few questions I knew that I had much to discover
        and was about to enter a learning cycle that would take me to a great
        future. I am discovering new aspects of myself and how I can cooperate
        and lead my team.
      </Quote>
    </Paper>
  )
}

renderFullPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

const HelpMyTeam = ({ location, ...props }) => {
  const quizMode = location.pathname.endsWith('quiz')
  return (
    <Template
      {...{
        title: '180 Decibels - Help My Team',
        location,
        className: styles['help-my-team']
      }}
    >
      {quizMode && renderQuiz(props)}
      {!quizMode && renderFullPage(props)}
    </Template>
  )
}

HelpMyTeam.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles2)(HelpMyTeam)
