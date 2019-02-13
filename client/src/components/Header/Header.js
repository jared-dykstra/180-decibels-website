import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Button,
  ClickAwayListener,
  Grow,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Toolbar,
  IconButton
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { RocketIcon, GetStartedButton, LogInModal } from 'components'
import { isHomePageSelector } from 'reduxStore/routes/routesSelectors'
import {
  ROUTE_HOME,
  ROUTE_OUR_TEAM,
  ROUTE_HOW_WE_WORK,
  ROUTE_WHAT_WE_DO,
  ROUTE_VAST
} from 'reduxStore/routes/routesConstants'

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10,
    '& svg': {
      fontSize: '1.5em'
    }
  },
  actionButton: {
    marginLeft: 10
  },
  logo: {
    fontSize: '1.5em',
    whiteSpace: 'nowrap'
  },
  logoImage: {
    // fontSize: '4rem'
    fontSize: '1.5em'
  },
  popper: {
    zIndex: '100'
  }
})

class Header extends PureComponent {
  static propTypes = {
    isHomePage: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

    return (
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="primary"
            aria-label="Menu"
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={classes.popper}
          >
            {({ TransitionProps, placement }) => {
              const onBottom = placement === 'bottom'
              const growStyle = {
                transformOrigin: onBottom ? 'center top' : 'center bottom'
              }
              return (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={growStyle}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <nav>
                        <MenuList>
                          {
                            <Link to={ROUTE_HOME}>
                              <MenuItem onClick={this.handleClose}>
                                Home
                              </MenuItem>
                            </Link>
                          }
                          <Link to={ROUTE_WHAT_WE_DO}>
                            <MenuItem onClick={this.handleClose}>
                              What We Do
                            </MenuItem>
                          </Link>
                          <Link to={ROUTE_HOW_WE_WORK}>
                            <MenuItem onClick={this.handleClose}>
                              How We Work
                            </MenuItem>
                          </Link>
                          <Link to={ROUTE_VAST}>
                            <MenuItem onClick={this.handleClose}>
                              Operational Intelligence
                            </MenuItem>
                          </Link>
                          <Link to={ROUTE_OUR_TEAM}>
                            <MenuItem onClick={this.handleClose}>
                              Our Team
                            </MenuItem>
                          </Link>
                          <GetStartedButton
                            component={MenuItem}
                            onClick={this.handleClose}
                          >
                            Contact
                          </GetStartedButton>
                        </MenuList>
                      </nav>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )
            }}
          </Popper>
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
          {/* <Hidden xsDown>
            <Button
              color="primary"
              variant="contained"
              className={classes.actionButton}
              component={Link}
              to={ROUTE_WHAT_WE_DO}
            >
              What We Do
            </Button>
            <GetStartedButton
              variant="contained"
              className={classes.actionButton}
            >
              Contact Us
            </GetStartedButton>
          </Hidden> */}
          <LogInModal className={classes.actionButton} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default connect(state => ({
  isHomePage: isHomePageSelector(state)
}))(withStyles(styles)(Header))
