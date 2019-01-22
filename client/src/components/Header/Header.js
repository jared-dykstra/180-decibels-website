import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { RocketIcon, GetStartedButton, LogInModal } from 'components'
import { isHomePageSelector } from 'reduxStore/routes/routesSelectors'
import { ROUTE_HOME } from 'reduxStore/routes/routesConstants'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    '& svg': {
      fontSize: '1.5em'
    }
  },
  actionButton: {
    marginLeft: 10,
    marginRight: 10
  },
  logo: {
    fontSize: '2rem'
  },
  logoImage: {
    fontSize: '4rem'
  }
}

class Header extends PureComponent {
  static propTypes = {
    isHomePage: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  render() {
    const { isHomePage, classes } = this.props

    return (
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="primary"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow}>
            <Button
              component={Link}
              to={ROUTE_HOME}
              className={classes.logo}
              color="secondary"
            >
              <RocketIcon fontSize="inherit" className={classes.logoImage} />{' '}
              180 Decibels
            </Button>
          </div>
          {isHomePage && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              className={classes.actionButton}
            >
              What We Do
            </Button>
          )}
          <GetStartedButton
            variant="contained"
            size="large"
            className={classes.actionButton}
          >
            Contact Us
          </GetStartedButton>
          <LogInModal className={classes.actionButton} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default connect(state => ({
  isHomePage: isHomePageSelector(state)
}))(withStyles(styles)(Header))
