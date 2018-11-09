import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
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
    const { isHomePage } = this.props
    const showBrand = !isHomePage

    const navItems = [
      {
        url: ROUTE_HELP_MY_TEAM,
        text: 'Help My Team'
      },
      {
        url: ROUTE_HELP_ME,
        text: 'Help Me'
      }
    ].map(({ url, text }) => (
      <NavItem key={url}>
        <Link className={`${styles.navAction} nav-link`} to={url}>
          {text}
        </Link>
      </NavItem>
    ))

    return (
      <Navbar color="faded" light expand="md">
        {showBrand && (
          <Link className={`${styles.miniBrand} nav-link`} to={ROUTE_HOME}>
            <Logo />
            180 Decibels
          </Link>
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
    // No events
  })
)(Header)
