import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import vis from 'vis'

import {
  getNodesSelector,
  getEdgesSelector
} from 'reduxStore/vast/vastSelectors'

import visDataSetPropType from './visDataSetPropType'

class Graph extends PureComponent {
  static propTypes = {
    nodes: visDataSetPropType.isRequired,
    edges: visDataSetPropType.isRequired
  }

  constructor(props) {
    super(props)
    this.vis = null
    this.network = null
  }

  componentDidMount() {
    const { nodes, edges } = this.props
    const data = { nodes, edges }
    const options = {
      autoResize: true,
      height: '100%',
      width: '100%'
    }

    this.network = new vis.Network(this.vis, data, options)
    this.network.on('select', selection => this.handleNodeClick(selection))
  }

  handleNodeClick = selection => {
    console.log('Node Click')
    console.log(`Node ID=${selection.nodes[0]}`)
  }

  render() {
    return (
      <div
        style={{ height: '100vh' }}
        ref={ref => {
          this.vis = ref
        }}
      />
    )
  }
}

export default connect(
  state => ({
    nodes: getNodesSelector(state),
    edges: getEdgesSelector(state)
  }),
  dispatch => ({})
)(Graph)
