import React, { PureComponent } from 'react'

import { Template } from 'components'

import Graph from './Graph'

class Vast extends PureComponent {
  render() {
    const { location } = this.props
    return (
      <Template
        {...{
          title: '180 Decibels - Vast',
          location
        }}
      >
        <h1>Vast</h1>
        <Graph />
      </Template>
    )
  }
}

export default Vast
