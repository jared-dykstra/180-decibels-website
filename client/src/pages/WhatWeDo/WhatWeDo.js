import React from 'react'
import PropTypes from 'prop-types'
import { Fab, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { GetStartedButton, Template, Quote } from 'components'
import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles(theme),
  action: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 6
  },
  mission: {
    margin: theme.spacing.unit * 6
  },
  quote: {
    margin: theme.spacing.unit * 10
  }
})

const WhatWeDo = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - What We Do',
      location
    }}
  >
    <Paper className={classes.paper}>
      <h1>What We Do</h1>
      <Typography variant="body1">
        At 180 Decibels, we you let you set the strategic direction while we
        saturate your organization with a proven process for getting where you
        want to go.
      </Typography>

      <Typography variant="body1">
        If you notice symptoms like, low morale, low productivity, conflict and
        confusion on what the top priorities are, we can help.
      </Typography>

      <Typography
        variant="h5"
        align="center"
        color="secondary"
        className={classes.mission}
      >
        <em>
          Our mission is to measurably improve team productivity with tactical
          operational tools and processes.
        </em>
      </Typography>

      <Typography variant="body1">
        Maybe your company grew very quickly or maybe you have people in seats
        that were never trained to manage…that is all very normal. But an
        undirected team operates naturally in survival mode which quickly leads
        to overwhelm. Without clear accountability and day-to-day discipline,
        teams get bogged down and performance suffers (along with morale).
      </Typography>

      <Quote cite="Patrick, Technical Lead" className={`h4 ${classes.quote}`}>
        I have much more confidence and feel like I am achieving something in a
        day. I have a tonne more motivation to work on what I am supposed to be
        working on.
      </Quote>

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

      <Typography variant="body1">
        Everything we do is centred around implementing best practices to create
        healthy, high performing teams to maximize revenue, optimize costs and
        create more wealth and success.
      </Typography>

      <Typography variant="body1">
        We offer the following services to help your company:
      </Typography>

      <h2>Operations</h2>
      <Typography variant="body1">
        We focus on the People side of Operations. As managers we really only
        have one accountability: to get the maximum amount of productivity out
        of our teams at the lowest cost possible. We work with clients to remove
        complexity and get there quickly and easily.
      </Typography>

      <h2>Organization and Team Health</h2>
      <Typography variant="body1">
        Unhealthy teams produce mediocre results at best. “Health” sounds vague,
        but it is easy to measure. Healthy teams have minimal politics and
        confusion, boast high morale and productivity and very low turnover of
        good people. Our mission is to remove the complexity from managing your
        team.
      </Typography>

      <h2>Enterprise Performance Management</h2>
      <Typography variant="body1">
        Performance measurement strives to set measurable short-term goals
        through the lens of long-term objectives. We help design and build
        leading measures that provide a gauge of success.
      </Typography>

      <h2>People Advisory Services</h2>
      <Typography variant="body1">
        Rapid speed of innovation, for many industries, has reduced the
        advantage that we used to get from technology or product cycles alone.
        It has become clear that the most competitive and successful
        organizations are that way because of their people. Every organization
        should know how to gain a competitive advantage through its people.
      </Typography>
      <Typography variant="body1">
        In our world, knowing whether you have the right people in the right
        roles can actually be an objective exercise. We help clients analyze
        their people through the lenses of long-term objectives, short term
        objectives, values and unique role accountabilities. In parallel, we
        engage team members and nurture the culture to create the right
        environment for a high performing team.
      </Typography>
      <Typography align="center" className={classes.action}>
        <GetStartedButton size="large" component={Fab} variant="extended">
          Get Started with 180 Decibels Today!
        </GetStartedButton>
      </Typography>
    </Paper>
  </Template>
)

WhatWeDo.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(WhatWeDo)