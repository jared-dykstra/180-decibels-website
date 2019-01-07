import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { Template } from 'components'
import { ROUTE_HOME } from 'reduxStore/routes/routesConstants'

export default () => (
  <Template>
    <br />
    <h2>Not Found</h2>
    <p>Sorry, the page you were looking for cannot be found</p>
    <br />
    <br />
    <Button
      color="primary"
      variant="contained"
      size="lg"
      component={Link}
      to={ROUTE_HOME}
    >
      Go to Home Page
    </Button>
  </Template>
)
