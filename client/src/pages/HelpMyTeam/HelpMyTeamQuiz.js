import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { SelfAssessment, Template } from 'components'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme })
})

const HelpMyTeam = ({ location, classes, ...props }) => (
  <Template
    {...{
      title: '180 Decibels - Help My Team',
      location,
      className: classes.root,
      elevation: 0
    }}
  >
    <div className={classes.maxWidth}>
      <h1>Self Assessment</h1>
      <SelfAssessment assessmentName="helpMyTeam" {...props} />
    </div>
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
