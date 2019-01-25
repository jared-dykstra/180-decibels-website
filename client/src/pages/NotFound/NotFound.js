import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { Template } from 'components'
import { ROUTE_HOME } from 'reduxStore/routes/routesConstants'

import { withStyles } from '@material-ui/core/styles'

import pageStyles from '../pageStyles'

const styles = theme => ({
  ...pageStyles({ theme })
})

const NotFound = ({ location, classes }) => (
  <Template
    {...{
      title: '180 Decibels - Not Found',
      location,
      className: classes.root
    }}
  >
    <br />
    <h2>Not Found</h2>
    <p>Sorry, the page you were looking for cannot be found</p>
    <br />
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
  </Template>
)

NotFound.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired, // <-- Passed down from react router
  classes: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withStyles(styles)(NotFound)
