import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { SelfAssessment, Template } from 'components'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme }),
  intro: {
    marginBottom: theme.spacing.unit * 7
  }
})

const HelpMyTeam = ({ location, classes, ...props }) => (
  <Template
    {...{
      title: '180 Decibels - Help My Team',
      location,
      className: classes.root
    }}
  >
    <h1>Self Assessment</h1>
    <Typography variant="body1" paragraph>
      It only takes one minute to get results you can use.
    </Typography>
    <Typography variant="body1" paragraph className={classes.intro}>
      Use this self-assessment to understand your situation. These questions are
      enough to create an initial report, which will contain concrete,
      actionable steps that you can immediately use.
    </Typography>
    <SelfAssessment assessmentName="helpMyTeam" {...props} />
  </Template>
)

HelpMyTeam.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(HelpMyTeam)
