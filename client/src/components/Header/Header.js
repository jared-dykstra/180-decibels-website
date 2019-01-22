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
  ROUTE_HOW_WE_WORK
} from 'reduxStore/routes/routesConstants'

const styles = theme => ({
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
    const { isHomePage, classes } = this.props
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
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
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
                      <MenuList>
                        {
                          /* !isHomePage && */ <Link to={ROUTE_HOME}>
                            <MenuItem onClick={this.handleClose}>Home</MenuItem>
                          </Link>
                        }
                        <MenuItem onClick={this.handleClose}>
                          What We Do
                        </MenuItem>
                        <Link to={ROUTE_HOW_WE_WORK}>
                          <MenuItem onClick={this.handleClose}>
                            How We Work
                          </MenuItem>
                        </Link>
                        <Link to={ROUTE_OUR_TEAM}>
                          <MenuItem onClick={this.handleClose}>
                            About Us
                          </MenuItem>
                        </Link>
                      </MenuList>
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
