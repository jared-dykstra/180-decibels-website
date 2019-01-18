import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Template } from 'components'

import { addNode } from 'reduxStore/vast/vastActions'

import Graph from './Graph'

class Vast extends PureComponent {
  static propTypes = {
    doAddNode: PropTypes.func.isRequired
  }

  render() {
    const { location, doAddNode } = this.props
    return (
      <Template
        {...{
          title: '180 Decibels - Vast',
          location
        }}
      >
        <h1>Vast</h1>
        <button type="button" onClick={() => doAddNode()}>
          Add Node
        </button>
        <Graph />
      </Template>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    doAddNode: () => dispatch(addNode())
  })
)(Vast)
