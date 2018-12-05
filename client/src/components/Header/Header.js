import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap'

import { LogInModal, Logo } from 'components'
import { isHomePageSelector } from 'redux/routes/routesSelectors'
import {
  ROUTE_HOME
  // ROUTE_HELP_ME,
  // ROUTE_HELP_MY_TEAM
} from 'redux/routes/routesConstants'

import styles from './Header.module.scss'

class Header extends PureComponent {
  static propTypes = {
    isHomePage: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = Immutable.from({
      isOpen: false
    })
  }

  toggleNavbar = () => {
    this.setState(prevState =>
      Immutable.from({
        isOpen: !prevState.isOpen
      })
    )
  }

  render() {
    const { isOpen } = this.state
    const { isHomePage } = this.props

    const navItems = [
      // {
      //   url: ROUTE_HELP_MY_TEAM,
      //   text: 'Help My Team'
      // },
      // {
      //   url: ROUTE_HELP_ME,
      //   text: 'Help Me'
      // }
    ].map(({ url, text }) => (
      <NavItem key={url}>
        <Link className={`${styles['nav-action']} nav-link`} to={url}>
          {text}
        </Link>
      </NavItem>
    ))

    const brandLinkClassName = `${styles['mini-brand']}`
    return (
      <Navbar color="faded" light expand="md">
        {!isHomePage && (
          <Link className={brandLinkClassName} to={ROUTE_HOME}>
            <Logo />
            180 Decibels
          </Link>
        )}
        {isHomePage && (
          <div className={brandLinkClassName}>
            <Logo />
            180 Decibels
          </div>
        )}
        <NavLink href="tel:+18883214531">1-888-321-4531</NavLink>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {navItems}
            <NavItem className={styles.login}>
              <LogInModal className="float-right" />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default connect(state => ({
  isHomePage: isHomePageSelector(state)
}))(Header)
