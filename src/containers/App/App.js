import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row
} from 'reactstrap'

import './App.scss'

import BlockList from '../../components/BlockList/BlockList'
import { blockListPropType } from '../../components/BlockList/blockListPropTypes'
import Status from './Status'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import Carousel from './Carousel'

import {
  actions as eosActions,
  selectors as eosSelector
} from '../../redux/eos'

class App extends Component {
  static propTypes = {
    doUpdateBlocks: propTypes.func.isRequired,
    blocks: blockListPropType.isRequired
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
    const { doUpdateBlocks, blocks } = this.props
    const { collapsed, showBrand } = this.state
    return (
      <Container>
        <Navbar color="faded" light expand="md">
          {showBrand && (
            <NavbarBrand href="/about">
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
        <section className="section-splash">
          <div className="logo">
            <Logo />
            <h1>180 Decibels</h1>
            <p>Management Consulting for the Modern Manager</p>
          </div>
        </section>
        <section className="section-help-my-team">
          <h2 className="action">Help My Team</h2>
          <p>
            Are you a manager or leader who is frustrated by your team’s
            results? Is there confusion on who is accountable for what? Do team
            members KNOW what they need to do EACH DAY to meet targets? IF THIS
            SOUNDS LIKE YOUR COMPANY, WE GET IT AND WE CAN HELP.
          </p>
          <Button>Discover what 180 Decibels can do for your team</Button>
        </section>
        <section className="section-help-me">
          <h2 className="action">Help Me</h2>
          <p>
            We re-focus managers on driving to outcome and on creating urgency.
            We offer a practical, results-oriented process to build a
            high-performing culture so you can start feeling more competent and
            more confident--getting huge productivity gains out of your team.
          </p>
          <Button>Discover how 180 Decibels can help you</Button>
        </section>
        {/*
        <section>
          <h2>Organizations using 180 Decibels</h2>
          <Carousel />
        </section>
        */}
        <Navbar color="faded" light className="fixed-bottom">
          <Container>
            <a href="mailto:info@180decibels.com">info@180decibels.com</a>
            <a href="tel:+18883214531">1-888-321-4531</a>
          </Container>
        </Navbar>
      </Container>
    )
  }
}

export default connect(
  (state /* , ownProps */) => ({
    blocks: eosSelector.blocks(state),
    latestTimestamp: eosSelector.latestBlockTimestamp(state),
    isUpdating: eosSelector.isUpdating(state)
  }),
  dispatch => ({
    doUpdateBlocks: () => dispatch(eosActions.loadBlocks())
  })
)(App)
