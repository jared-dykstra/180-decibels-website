import React from 'react'
import PropTypes from 'prop-types'
import { Grid, SvgIcon, Typography } from '@material-ui/core'

const Intro = ({ className, button }) => (
  <Grid
    container
    direction="column"
    justify="space-around"
    alignItems="center"
    className={className}
  >
    <Grid item style={{ width: '50%' }}>
      <Typography paragraph variant="h3" align="center" color="secondary">
        Operational Intelligence
      </Typography>
      <Typography
        paragraph
        variant="h5"
        align="center"
        style={{ marginBottom: '1em' }}
      >
        Visualize your Operation
      </Typography>

      <ul>
        <li>
          <Typography paragraph>
            A view of &quot;Everyting&quot; shows how complex the organization
            is.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            Understand connections: Try starting with &quot;People&quot; and use
            a node&apos;s &quot;Connection&quot; action in the context menu to
            follow paths
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            Understand change: As the business changes over time, add/remove
            people, accountabilities and connections
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            Streamline your business: Quickly identify outliers, overloaded
            people, and accountabilities associated with nobody or associated
            with multiple people
          </Typography>
        </li>
      </ul>
    </Grid>
    <Grid item style={{ width: '80%' }}>
      <Typography variant="h5" align="center" color="primary">
        Click or Tap the {button} button to create a view.
      </Typography>
      <Typography variant="h4" style={{ fontSize: '15rem' }}>
        <SvgIcon color="disabled" fontSize="inherit">
          <path d="M15.5,5.69L18.31,8.5L11.94,14.89H16.89V18.31H5.69V7.11H9.12V12.06L15.5,5.69Z" />
        </SvgIcon>
      </Typography>
    </Grid>
  </Grid>
)

Intro.propTypes = {
  button: PropTypes.node.isRequired,
  className: PropTypes.string
}

Intro.defaultProps = {
  className: ''
}

export default Intro
