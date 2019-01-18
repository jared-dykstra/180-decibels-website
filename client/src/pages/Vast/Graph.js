import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import vis from 'vis'

import {
  networkOptionsSelector,
  getEdgesSelector,
  makeGetFilteredNodesSelector,
  selectedGroupSelector
} from 'reduxStore/vast/vastSelectors'

import visDataSetPropType from './visDataSetPropType'

class Graph extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object.isRequired,
    nodes: visDataSetPropType.isRequired,
    edges: visDataSetPropType.isRequired,
    selectedGroup: PropTypes.string
  }

  static defaultProps = {
    selectedGroup: ''
  }

  constructor(props) {
    super(props)
    this.vis = null
    this.network = null
    this.nodesView = null
  }

  componentDidMount() {
    const { options, nodes, edges } = this.props
    this.nodesView = new vis.DataView(nodes, { filter: this.filterNodes })
    const data = {
      nodes: this.nodesView,
      edges
    }

    // subscribe to any change in the DataView
    this.nodesView.on('*', (event, properties, senderId) => {
      console.log('NodesView event', event, properties)
    })

    this.network = new vis.Network(this.vis, data, options)
    this.network.on('select', selection => this.handleNodeClick(selection))
  }

  // Refresh the network when filter preferences change
  componentDidUpdate(prevProps) {
    const { selectedGroup } = this.props
    if (prevProps.selectedGroup !== selectedGroup) {
      this.nodesView.refresh()
    }
  }

  filterNodes = item => {
    const { selectedGroup } = this.props
    console.log(`selectedGroup=${selectedGroup} item.group=${item.group}`)
    const isInSelectedGroup =
      selectedGroup === '' || item.group === selectedGroup
    return isInSelectedGroup
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
  state => {
    const getFilteredNodesSelector = makeGetFilteredNodesSelector()
    return {
      options: networkOptionsSelector(state),
      nodes: getFilteredNodesSelector(state),
      edges: getEdgesSelector(state),
      selectedGroup: selectedGroupSelector(state)
    }
  },
  dispatch => ({})
)(Graph)
