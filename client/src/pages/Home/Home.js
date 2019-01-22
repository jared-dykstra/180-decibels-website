import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Fab, Grid, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
// import NavigationIcon from '@material-ui/icons/Navigation'

import { /* GetStartedButton, */ Quote, Template, Video } from 'components'
import {
  ROUTE_HELP_MY_TEAM,
  ROUTE_VIDEO_INTRO,
  ROUTE_VIDEO_SUN
} from 'reduxStore/routes/routesConstants'

import {
  poster as overviewVideoPoster,
  src as overviewVideoSrc
} from 'pages/Video/IntroVideo'
import {
  poster as sunVideoPoster,
  src as sunVideoSrc
} from 'pages/Video/SunVideo'

import { get as configGet } from '../../config'

import bannerImage from './noisy-kid.jpg'
import TeamIcon from './TeamIcon'

const styles = theme => ({
  main: {
    paddingBottom: '4em'
  },
  banner: {
    marginBottom: '1em',
    minHeight: '20em',
    paddingBottom: '35%', // 56.25%;  // <-- 16:9 aspect ratio
    width: '100%',
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
  },
  overlay: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    position: 'absolute',
    top: '0',
    bottom: '0'
  },
  title: {
    color: 'white',
    fontWeight: '800',
    textShadow: '0 0 15px rgba(0,0,0,1)',
    maxWidth: '1000px',
    paddingTop: '.25em', // <== For IE 11
    paddingBottom: '1em' // <== For IE 11
  },
  titleContainer: {
    maxWidth: '100%' // <== For IE 11
  },
  intro: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    fontSize: 'larger'
  },
  actionIcon: {
    marginRight: '.5em'
  },
  highlight: {
    color: theme.palette.secondary.main,
    fontWeight: '800'
  },
  videoRow: {
    marginTop: '2em'
  }
})

export class Home extends PureComponent {
  render() {
    const { tracker, location, classes } = this.props
    const tagline = 'Removing the Complexity from Managing Your Team'
    const rootUrl = configGet('rootUrl')
    return (
      <Template
        {...{
          title: '180 Decibels',
          location
        }}
      >
        <Paper className={classes.main} elevation={2}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.banner} elevation={0} square>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  className={classes.overlay}
                >
                  <Grid item zeroMinWidth className={classes.titleContainer}>
                    <Typography
                      align="center"
                      variant="h3"
                      className={classes.title}
                    >
                      {tagline}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {/* <GetStartedButton size="large" variant="extendedFab">
                      <NavigationIcon fontSize="large"  className={classes.actionIcon} />
                      Schedule a Complimentary Results Coaching Session
                      Now
                    </GetStartedButton> */}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              spacing={24}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" className={classes.intro}>
                  <span className={classes.highlight}>
                    Do you want to unlock latent productivity in your team and
                    out-perform competitors?
                  </span>
                  <br />
                  <br />
                  We help managers drive to outcome and create urgency in their
                  organization. You get a practical, results-oriented process to
                  build a high-performing culture. Now you can start feeling
                  confident that your team is getting the right things done.
                  <br />
                  <br />
                  Use our confidential{' '}
                  <span className={classes.highlight}>Team Assessment</span> to
                  determine your company&apos;s pain points and get a report
                  with concrete, actionable next steps.
                </Typography>
              </Grid>
              <Grid item style={{ maxWidth: '50%' }}>
                <Fab
                  color="primary"
                  variant="extended"
                  size="large"
                  className={classes.fab}
                  component={Link}
                  to={ROUTE_HELP_MY_TEAM}
                >
                  <TeamIcon fontSize="large" className={classes.actionIcon} />
                  Assess Your Team
                </Fab>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ padding: '1em' }}>
              <Grid container spacing={24} className={classes.videoRow}>
                <Grid item xs={4}>
                  <Quote className="h3" cite="Vincent, CEO">
                    180 Decibels increased my team&apos;s results by 22%
                  </Quote>
                </Grid>
                <Grid item xs={8}>
                  <Paper style={{ paddingBottom: '3em' }}>
                    <Video
                      {...{
                        poster: overviewVideoPoster,
                        src: overviewVideoSrc,
                        tracker,
                        shareUrl: `${rootUrl}${ROUTE_VIDEO_INTRO}`
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: '1em' }}>
            <Grid container spacing={24} className={classes.videoRow}>
              <Grid item xs={8}>
                <Paper style={{ paddingBottom: '3em' }}>
                  <Video
                    {...{
                      poster: sunVideoPoster,
                      src: sunVideoSrc,
                      tracker,
                      shareUrl: `${rootUrl}${ROUTE_VIDEO_SUN}`
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Quote right className="h3" cite="Patrick, Technical Lead">
                  We are not <i>meeting</i> goals. We are <i>crushing</i> them
                </Quote>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Template>
    )
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired, // <-- Passed down from react router
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  tracker: PropTypes.shape({
    event: PropTypes.func.isRequired
  }).isRequired
}

export default withStyles(styles)(Home)
