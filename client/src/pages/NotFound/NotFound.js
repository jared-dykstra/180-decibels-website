import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { Template } from 'components'
import { ROUTE_HOME } from 'reduxStore/routes/routesConstants'

const NotFound = ({ location }) => (
  <Template
    {...{
      title: '180 Decibels - 404',
      location
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
  }).isRequired // <-- Passed down from react router
}

export default NotFound
