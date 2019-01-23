import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import {
  ROUTE_CONFIDENTIALITY,
  ROUTE_HELP_MY_TEAM,
  ROUTE_HOME,
  ROUTE_OUR_TEAM,
  ROUTE_PRIVACY,
  ROUTE_HOW_WE_WORK,
  ROUTE_WHAT_WE_DO
} from 'reduxStore/routes/routesConstants'
import { SocialLinks } from 'components'

const styles2 = theme => {
  const decibelsSoftWhite = 'rgb(249, 249, 249)' // $decibels-soft-white; TODO: Add this color to the MUI theme
  const decibelsLightGrey = 'rgb(100, 100, 100)' // $decibels-light-grey; TODO: Add this color to the MUI theme
  const decibelsDarkGrey = 'rgb(50, 50, 50)' // $decibels-dark-grey; TODO: Add this color to the MUI theme
  return {
    root: {
      marginTop: '3em',
      padding: '1em',
      backgroundColor: decibelsDarkGrey,
      color: decibelsSoftWhite,
      fontSize: 'larger',
      '& hr': {
        borderColor: decibelsLightGrey
      },
      '& a': {
        color: decibelsSoftWhite
      },
      '& :hover': {
        color: `${theme.palette.primary.main}!important`
      }
    },
    siteMap: {
      '& ul': {
        listStyle: 'none'
      }
    },
    social: {
      // width: '400px',
      '& a': {
        // color: decibelsSoftWhite,
        paddingLeft: '1em',
        paddingRight: '1em'
      }
    }
  }
}

const footer = ({ classes }) => (
  <Grid container className={classes.root}>
    <Grid
      item
      container
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Grid item className={classes.siteMap}>
        <Link to={ROUTE_HOME}>
          <b>What We Do</b>
        </Link>
        <ul>
          <li>
            <Link to={ROUTE_WHAT_WE_DO}>What We Do</Link>
          </li>
          <li>
            <Link to={ROUTE_HOW_WE_WORK}>How We Work</Link>
          </li>
          <li>
            <Link to={ROUTE_HELP_MY_TEAM}>Self Assessment</Link>
          </li>
        </ul>
      </Grid>
      <Grid item className={classes.siteMap}>
        <Link to={ROUTE_HOME}>
          <b>Who We Are</b>
        </Link>
        <ul>
          <li>
            <Link to={ROUTE_OUR_TEAM}>Our Team</Link>
          </li>
          <li>
            <Link to={ROUTE_CONFIDENTIALITY}>Confidentiality</Link>
          </li>
          <li>
            <Link to={ROUTE_PRIVACY}>Privacy</Link>
          </li>
        </ul>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <hr />
    </Grid>
    <Grid
      item
      container
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Grid item>
        <a href="mailto:info@180decibels.com" className="text-nowrap">
          info@180decibels.com
        </a>
      </Grid>
      <Grid item className={classes.social}>
        <SocialLinks />
      </Grid>
      <Grid item>
        <a href="tel:+18883214531" className="text-nowrap">
          1-888-321-4531
        </a>
      </Grid>
    </Grid>
  </Grid>
)

footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles2)(footer)
