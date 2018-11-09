import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap'

import { isHomePageSelector } from '../../redux/routes/routesSelectors'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from '../../redux/routes/routesConstants'

import { Logo, SocialLinks } from '..'

import styles from './Header.module.scss'

// TODO: Use Redux for state and change to PureComponent

class Header extends Component {
  static propTypes = {
    doClickHome: PropTypes.func.isRequired,
    doClickHelpMe: PropTypes.func.isRequired,
    doClickHelpMyTeam: PropTypes.func.isRequired,
    isHomePage: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggleNavbar() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    const { isOpen } = this.state
    const {
      doClickHelpMyTeam,
      doClickHelpMe,
      doClickHome,
      isHomePage
    } = this.props
    const showBrand = !isHomePage

    const navItems = [
      {
        url: ROUTE_HELP_MY_TEAM,
        handler: doClickHelpMyTeam,
        text: 'Help My Team'
      },
      {
        url: ROUTE_HELP_ME,
        handler: doClickHelpMe,
        text: 'Help Me'
      }
    ].map(({ handler, url, text }) => (
      <NavItem key={url}>
        <NavLink className={styles.navAction} onClick={handler} href="#">
          {text}
        </NavLink>
      </NavItem>
    ))

    return (
      <Navbar color="faded" light expand="md">
        {showBrand && (
          <NavbarBrand onClick={doClickHome} href="#">
            <div className={styles.miniBrand}>
              <Logo />
              180 Decibels
            </div>
          </NavbarBrand>
        )}
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          {isHomePage && <Nav navbar>{navItems}</Nav>}
          <Nav className="ml-auto" navbar>
            {!isHomePage && navItems}
            <span className="d-none d-md-flex">
              <SocialLinks />
            </span>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    isHomePage: isHomePageSelector(state)
  }),
  dispatch => ({
    doClickHome: () => dispatch(push(ROUTE_HOME)),
    doClickHelpMe: () => dispatch(push(ROUTE_HELP_ME)),
    doClickHelpMyTeam: () => dispatch(push(ROUTE_HELP_MY_TEAM))
  })
)(Header)
