import Immutable from 'seamless-immutable'
import React, { PureComponent } from 'react'

import { Template } from 'components'

import Graph from './Graph'

class Vast extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      nodes: Immutable.from([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ]),
      edges: Immutable.from([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ])
    }
  }

  render() {
    const { location } = this.props
    const { nodes, edges } = this.state
    return (
      <Template
        {...{
          title: '180 Decibels - Vast',
          location
        }}
      >
        <h1>Vast</h1>
        <Graph {...{ nodes, edges }} />
      </Template>
    )
  }
}

export default Vast
