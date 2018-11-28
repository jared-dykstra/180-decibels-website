import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap'

import { Logo } from 'components'
import { isHomePageSelector } from 'redux/routes/routesSelectors'
import {
  ROUTE_HOME,
  ROUTE_HELP_ME,
  ROUTE_HELP_MY_TEAM
} from 'redux/routes/routesConstants'

import styles from './Header.module.scss'

import LoginModal from './LoginModal'

// TODO: Use Redux for state and change to PureComponent

class Header extends Component {
  static propTypes = {
    isHomePage: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleNavbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
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
        <Link className={`${styles['nav-action']} nav-link`} to={url}>
          {text}
        </Link>
      </NavItem>
    ))

    return (
      <Navbar color="faded" light expand="md">
        {showBrand && (
          <Link className={`${styles['mini-brand']} nav-link`} to={ROUTE_HOME}>
            <Logo />
            180 Decibels
          </Link>
        )}
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          {isHomePage && <Nav navbar>{navItems}</Nav>}
          <Nav className="ml-auto" navbar>
            {!isHomePage && navItems}
            <NavItem>
              <LoginModal />
            </NavItem>
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
