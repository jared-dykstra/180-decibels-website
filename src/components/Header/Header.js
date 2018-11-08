import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap'

import { Logo, SocialLinks } from '..'

import './Header.scss'

// TODO: Use Redux for state and change to PureComponent

class Header extends Component {
  static propTypes = {
    // doUpdateBlocks: propTypes.func.isRequired,
    // blocks: blockListPropType.isRequired
  }

  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true,
      showBrand: true
    }
  }

  toggleNavbar() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    const { collapsed, showBrand } = this.state
    return (
      <Navbar color="faded" light expand="md">
        {showBrand && (
          <NavbarBrand href="/">
            <div className="mini-brand">
              <Logo />
              180 Decibels
            </div>
          </NavbarBrand>
        )}
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-action" href="/help-my-team">
                Help My Team
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-action" href="/help-me">
                Help Me
              </NavLink>
            </NavItem>
            <SocialLinks />
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    // blocks: eosSelector.blocks(state),
    // latestTimestamp: eosSelector.latestBlockTimestamp(state),
    // isUpdating: eosSelector.isUpdating(state)
  }),
  dispatch => ({
    // doUpdateBlocks: () => dispatch(eosActions.loadBlocks())
  })
)(Header)
