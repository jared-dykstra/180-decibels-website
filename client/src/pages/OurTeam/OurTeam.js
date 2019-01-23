import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Avatar, Paper, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { ROUTE_HOME } from 'reduxStore/routes/routesConstants'
import { Quote, Template } from 'components'

import pageStyles from '../pageStyles'

import dayton from './dayton.jpg'
import kerri from './kerri.jpg'
import jared from './jared.jpg'

const styles = theme => ({
  ...pageStyles(theme),
  intro: {
    marginBottom: theme.spacing.unit * 7
  },
  founder: {
    marginBottom: '6em'
  },
  avatar: {
    height: 'auto',
    maxWidth: '90%',
    borderRadius: '0',
    width: '100%'
  },
  address: {
    marginLeft: '4em'
  },
  quote: {
    marginTop: '1em',
    maxWidth: '800px',
    marginLeft: 'auto'
  }
})

const OurTeam = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - Our Team',
      location
    }}
  >
    <Paper className={classes.paper}>
      <h1>Our Team</h1>
      <Typography variant="body1" paragraph>
        Our founders are come-from-the trenches managers who have developed and
        built products and services, grown (and shrunk) teams in high-growth
        (and stagnant) environments and faced most of the challenges you have
        either experienced or imagined.
      </Typography>
      <Typography variant="body1" paragraph>
        We&apos;ve pivoted, down-sized, right-sized, re-vectored, in-sourced,
        out-sourced and been in and out of the box. Now, smarter and wiser, we
        have distilled our experiences into one efficient process that teaches
        overworked, frustrated managers with underperforming teams how to get on
        track.
      </Typography>
      <h2 id="founders">Founders</h2>
      <hr />
      <Grid container className={classes.founder}>
        <Grid item sm="1" />
        <Grid item xs>
          <Avatar src={dayton} alt="Dayton Foster" className={classes.avatar} />
        </Grid>
        <Grid item sm="1" />
        <Grid item xs>
          <h2>
            <small className={classes.muted}>Dayton Foster</small>
          </h2>
          <Typography variant="body1" paragraph>
            Dayton has a deep operational background managing high growth
            companies from start-up to exit. He is fanatical about learning and
            implementing world-class operational practices.
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Quote right className={classes.quote} cite="Chris, Board Chair">
            Dayton brings an abundance of obvious business experience in a well
            thought out package and exposed us to the kinds of questions we
            should be asking. He helped us focus on the most important issues
            and kept us from becoming mired in too much extraneous detail.
          </Quote>
        </Grid>
      </Grid>

      <Grid container className={classes.founder}>
        <Grid item sm="1" />
        <Grid item xs>
          <Avatar src={kerri} alt="Kerri McGovern" className={classes.avatar} />
        </Grid>
        <Grid item sm="1" />
        <Grid item xs>
          <h2>
            <small className={classes.muted}>Kerri McGovern</small>
          </h2>
          <Typography variant="body1" paragraph>
            Kerri has deep experience in high growth, venture-backed technology
            start-ups nationwide. She has a proven ability to initiate and build
            customer relationships, develop and motivate teams, and create
            urgency in organizations. Her straightforward, results-based
            approach to serving clients is matched only by her empathy and
            concern for affecting real change.
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Quote right className={classes.quote} cite="Derek, CEO">
            Kerri is an exceptionally talented individual who expertly seized
            and and excelled with any aspect of the business that I asked her to
            tackle. She has a remarkable ability to connect with her team, her
            peers, and all the key stakeholders of the venture, both internal
            and external.
          </Quote>
        </Grid>
      </Grid>

      <Grid container className={classes.founder}>
        <Grid item sm="1" />
        <Grid item xs>
          <Avatar src={jared} alt="Jared Dykstra" className={classes.avatar} />
        </Grid>
        <Grid item sm="1" />
        <Grid item xs>
          <h2>
            <small className={classes.muted}>Jared Dykstra</small>
          </h2>
          <Typography variant="body1" paragraph>
            Jared is a rare talent that imagines how to support real-world
            business process with technology tools. He is technical visionary
            meets business street smarts. From data to web, project to product,
            Jared maxes out value and turns vision into reality. He came to 180
            after building a blockchain platform for an industry front-runner.
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Quote right className={classes.quote} cite="Derek, CEO">
            Jared is passionate about software development and has a broad and
            deep range of technical skills spanning hardware, software,
            infrastructure, and the processes to support solution development.
            Jared has architected and implemented many solutions, all
            successfully delivered into production.
          </Quote>
        </Grid>
      </Grid>

      <h2 id="location">Get In Touch</h2>
      <hr />
      <h4>Address</h4>
      <div className={classes.address}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.ca/maps/place/180+Decibels/@51.0441532,-114.0819514,15z/data=!4m5!3m4!1s0x0:0xdea918161b2807cd!8m2!3d51.0441532!4d-114.0819514"
        >
          445 – 999 8TH ST. SW
          <br />
          CALGARY, AB
          <br />
          T2R 1J5
        </a>
      </div>
      <h4>Phone</h4>
      <div className={classes.address}>
        <a href="tel:+18883214531" className="text-nowrap">
          1-888-321-4531
        </a>{' '}
        or <a href="tel:+14039845457">(403) 984-5457</a>
      </div>
      <h4>Email</h4>
      <div className={classes.address}>
        <a href="mailto:info@180decibels.com" className="text-nowrap">
          info@180decibels.com
        </a>
        <br />
        <Link to={ROUTE_HOME}>www.180decibels.com</Link>
      </div>
    </Paper>
  </Template>
)

OurTeam.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired // <-- Passed down from react router
}

export default withStyles(styles)(OurTeam)
