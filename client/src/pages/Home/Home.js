import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Fab, Grid, Hidden, Paper, Typography } from '@material-ui/core'
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
  posterAlt as sunVideoPoster,
  src as sunVideoSrc
} from 'pages/Video/SunVideo'

import { get as configGet } from '../../config'
import pageStyles from '../pageStyles'

import bannerImage from './noisy-kid.jpg'
import TeamIcon from './TeamIcon'

const styles = theme => ({
  ...pageStyles({ theme, pagePadding: false }),
  aboveTheFold: {
    minHeight: 'calc(100vh - 64px)', // AppBar is assumed to be 64px tall
    display: 'flex',
    flexDirection: 'column'
  },
  grow: {
    flexGrow: 1
  },
  container: {
    maxHeight: '20em',
    overflow: 'hidden'
  },
  banner: {
    marginBottom: '1em',
    minHeight: '15em',
    paddingBottom: '35%', // 56.25%;  // <-- 16:9 aspect ratio
    width: '100%',
    backgroundImage: `url(${bannerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  },
  overlay: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  title: {
    color: `${theme.decibels.white} !important`,
    fontWeight: theme.decibels.fontWeightMedium,
    fontSize: '2em',
    textShadow: '0 0 15px rgba(0,0,0,1)',
    marginLeft: 'auto !important',
    marginRight: 'auto',
    marginTop: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingTop: '.25em', // <== For IE 11
    paddingBottom: '1em', // <== For IE 11
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5em'
    }
  },
  maxWidth: {
    maxWidth: '100%' // <== For IE 11
  },
  intro: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5
  },
  actionIcon: {
    marginRight: '.5em'
  },
  highlight: {
    color: `${theme.palette.secondary.main} !important`,
    fontWeight: theme.decibels.fontWeightMedium
  },
  videoRow: {
    paddingBottom: '4em',
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  fab: {
    marginBottom: '2em'
  },
  quoteRight: {
    marginLeft: '1em'
  },
  quoteLeft: {
    marginRight: '1em'
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
          location,
          className: classes.root
        }}
      >
        <section id="main" className={classes.aboveTheFold}>
          <div className={classes.container}>
            <div className={classes.banner}>
              <div className={classes.overlay}>
                <Typography align="center" className={classes.title}>
                  {tagline}
                </Typography>
              </div>
            </div>
          </div>

          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            className={classes.grow}
          >
            <Grid item className={classes.maxWidth}>
              <Typography variant="body1" paragraph className={classes.intro}>
                <span className={classes.highlight}>
                  Do you want to unlock latent productivity in your team and
                  out-perform competitors?
                </span>
              </Typography>
              <Typography variant="body1" paragraph className={classes.intro}>
                We help managers drive to outcome and create urgency in their
                organization. You get a practical, results-oriented process to
                build a high-performing culture. Now you can start feeling
                confident that your team is getting the right things done.
              </Typography>
              <Typography variant="body1" paragraph className={classes.intro}>
                Use our confidential{' '}
                <Link to={ROUTE_HELP_MY_TEAM} className={classes.highlight}>
                  Team Assessment
                </Link>{' '}
                to determine your company&apos;s pain points and get a report
                with concrete, actionable next steps.
              </Typography>
            </Grid>
            <Grid item>
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
        </section>

        <section id="intro">
          <Grid container className={classes.videoRow}>
            <Hidden xsDown>
              <Grid item xs={12} sm={4}>
                <Quote cite="Vincent, CEO" className={classes.quoteLeft}>
                  180 Decibels increased my team&apos;s results by 22%
                </Quote>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={8}>
              <Video
                {...{
                  poster: overviewVideoPoster,
                  src: overviewVideoSrc,
                  tracker,
                  shareUrl: `${rootUrl}${ROUTE_VIDEO_INTRO}`
                }}
              />
            </Grid>
          </Grid>
        </section>

        <section id="sun">
          <Grid container className={classes.videoRow}>
            <Grid item xs={12} sm={8}>
              <Video
                {...{
                  poster: sunVideoPoster,
                  src: sunVideoSrc,
                  tracker,
                  shareUrl: `${rootUrl}${ROUTE_VIDEO_SUN}`
                }}
              />
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={4}>
                <Quote
                  right
                  cite="Patrick, Technical Lead"
                  className={classes.quoteRight}
                >
                  We are not <i>meeting</i> goals. We are <i>crushing</i> them!
                </Quote>
              </Grid>
            </Hidden>
          </Grid>
        </section>
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
