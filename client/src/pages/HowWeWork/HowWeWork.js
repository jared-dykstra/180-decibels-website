import React from 'react'
import PropTypes from 'prop-types'
import { Fab, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { GetStartedButton, Quote, Template, Video } from 'components'
import { ROUTE_VIDEO_SUN } from 'reduxStore/routes/routesConstants'
import {
  poster as sunVideoPoster,
  src as sunVideoSrc
} from 'pages/Video/SunVideo'
import { get as configGet } from '../../config'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme }),
  action: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 6
  }
})

const HowWeWork = ({ location, tracker, classes }) => {
  const rootUrl = configGet('rootUrl')
  return (
    <Template
      {...{
        title: '180 Decibels - How We Work',
        location,
        className: classes.root
      }}
    >
      <h1 id="experience">Experience a 180</h1>

      <Typography variant="body1" paragraph>
        <b>Do you want more respect? Less conflict? Higher morale?</b>
      </Typography>

      <Typography variant="body1" paragraph>
        We are uniquely qualified to help you turn the ship and experience a
        radical change in how you establish accountability and create a
        performance-driven culture.
      </Typography>

      <Video
        {...{
          poster: sunVideoPoster,
          src: sunVideoSrc,
          tracker,
          shareUrl: `${rootUrl}${ROUTE_VIDEO_SUN}`,
          className: classes.video
        }}
      />
      <h1 id="approach">Our Unique Approach</h1>
      <h2>No people-skills required</h2>
      <Typography variant="body1" paragraph>
        <i>You heard us right.</i> Our system does not depend on changing{' '}
        <b>
          <i>who</i>
        </b>{' '}
        you are as a person. Most management books/programs require you to
        unlock your people skills or to acquire magical powers of empathy. We
        don’t buy it. We can teach you to become a results-driven manager
        without changing who you are.
      </Typography>
      <h2>Blinding speed and powerful results</h2>
      <Typography variant="body1" paragraph>
        Because we don’t rely on making you over, we can equip you with tools to
        create dramatic change within weeks, not years. That’s right, no deep
        dive, no ‘extended engagement’s, just a fast, valuable process with
        impressive ROI.
      </Typography>
      <h2>Flexible approach</h2>
      <Typography variant="body1" paragraph>
        <b>Online or In-person support.</b> When your spouse asks you how your
        day was do you say, ‘hectic’, ‘crazy’, ‘constantly on the run’? We get
        it, time is precious - we can work in person or online.
      </Typography>

      <Quote cite="Sarah, Manager" className={classes.quote}>
        This process brought clarity and focus to our team. I was able to take
        alot OFF my plate. I now know what I am NOT accountable for. We even
        streamlined our meeting process and spent LESS time in meetings.
      </Quote>

      <Typography align="center" className={classes.action}>
        <GetStartedButton size="large" component={Fab} variant="extended">
          Get Started with our Unique Approach Today!
        </GetStartedButton>
      </Typography>
    </Template>
  )
}

HowWeWork.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  tracker: PropTypes.shape({
    event: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(HowWeWork)
