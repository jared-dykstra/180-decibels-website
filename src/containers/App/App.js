import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row
} from 'reactstrap'

import './App.css'

import BlockList from '../../components/BlockList/BlockList'
import { blockListPropType } from '../../components/BlockList/blockListPropTypes'
import Status from './Status'

import {
  actions as eosActions,
  selectors as eosSelector
} from '../../redux/eos'

class App extends PureComponent {
  static propTypes = {
    doUpdateBlocks: propTypes.func.isRequired,
    blocks: blockListPropType.isRequired
  }

  // Update the blocks right away, without waiting for the user to click a button
  componentDidMount() {
    const { doUpdateBlocks } = this.props
    doUpdateBlocks()
  }

  render() {
    const { doUpdateBlocks, blocks } = this.props
    return (
      <Container>
        <Navbar color="light" light expand="md">
          <NavbarBrand>EOS Block Viewer</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button onClick={doUpdateBlocks}>LOAD</Button>
            </NavItem>
          </Nav>
        </Navbar>
        <Row className="statusRow">
          <Col>
            <Status />
          </Col>
        </Row>
        <Row>
          <Col>
            <BlockList blocks={blocks} />
          </Col>
        </Row>
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
