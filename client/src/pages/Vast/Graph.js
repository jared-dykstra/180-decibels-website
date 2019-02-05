import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  graphSelector,
  contextMenuDefaultsSelector,
  edgeHandlesDefaultsSelector
} from 'reduxStore/vast/vastSelectors'
import {
  layout,
  showConnections,
  addConnection
} from 'reduxStore/vast/vastActions'

import DetailPane from './DetailPane'

class Graph extends PureComponent {
  static propTypes = {
    // viewId is used in connect (below)
    // eslint-disable-next-line react/no-unused-prop-types
    viewId: PropTypes.string.isRequired,
    graph: PropTypes.shape({
      mount: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
      resize: PropTypes.func.isRequired
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    contextMenuDefaults: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    edgeHandlesDefaults: PropTypes.object.isRequired,
    doShowConnections: PropTypes.func.isRequired,
    doAddConnection: PropTypes.func.isRequired,
    doLayout: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props)
    // console.log(`Graph Constructor ${props.viewId}`)
    this.ref = null
    this.menu = null
    this.edgeHandles = null

    this.state = {
      detailsNode: null
    }
  }

  // Mount the graph (previously running headless)
  componentDidMount() {
    // console.log(`Graph componentDidMount ${this.props.viewId}`)
    if (this.ref) {
      const {
        graph,
        contextMenuDefaults,
        edgeHandlesDefaults,
        doAddConnection
      } = this.props
      if (graph) {
        graph.mount(this.ref)

        this.menu = graph.cxtmenu({
          ...contextMenuDefaults,
          commands: this.contextCommands()
        })

        this.edgeHandles = graph.edgehandles({
          ...edgeHandlesDefaults,
          complete(sourceNode, targetNode, addedElements) {
            // fired when edgehandles is done and elements are added
            // A new GUID was already generated as ID of the new element.  To customize, override `edgeParams()`
            doAddConnection({
              sourceNodeId: sourceNode.id(),
              targetNodeId: targetNode.id(),
              addedEdgeId: addedElements[0].id()
            })
          }
        })

        graph.resize()
        graph.fit()
        // Don't run the layout because it would be invoked when switching tabs
      }
    }
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate() {
    // console.log(`Graph componentDidUpdate ${this.props.viewId}`)
  }

  componentWillUnmount() {
    // console.log(`Graph componentWillUnmount ${this.props.viewId}`)
    window.removeEventListener('resize', this.handleResize)
    const { graph } = this.props
    if (this.menu) {
      this.menu.destroy()
    }
    if (this.edgeHandles) {
      this.edgeHandles.destroy()
    }
    if (graph) {
      graph.unmount()
    }
  }

  handleClickDetails = node => {
    this.setState(state => ({
      detailsNode: node
    }))
  }

  handleHideDetails = () => {
    this.setState({
      detailsNode: null
    })
  }

  contextCommands = (/* element */) => {
    const { doShowConnections } = this.props
    const self = this
    return [
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Details', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          // a function to execute when the command is selected
          self.handleClickDetails(ele)
        },
        enabled: true // whether the command is selectable
      },
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Connections', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          console.log(`Connections: ${ele.id()}`) // `ele` holds the reference to the active element
          doShowConnections(ele.id())
        },
        enabled: true // whether the command is selectable
      },
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Other', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          // a function to execute when the command is selected
          console.log(`Other: ${ele.id()}`) // `ele` holds the reference to the active element
        },
        enabled: true // whether the command is selectable
      }
    ]
  }

  handleResize = () => {
    const { graph, doLayout } = this.props
    if (graph) {
      graph.resize()
      graph.fit()
      doLayout()
    }
  }

  render() {
    const { className, graph } = this.props
    const { detailsNode } = this.state
    return [
      <div
        key="graph"
        style={{
          height: '100%',
          width: '100%'
        }}
        className={className}
        ref={ref => {
          this.ref = ref
        }}
      />,
      detailsNode && (
        <DetailPane
          key="detail"
          graph={graph}
          detailsNode={detailsNode}
          onClose={this.handleHideDetails}
        >
          TODO: Add Details
        </DetailPane>
      )
    ]
  }
}

export default connect(
  state => ({
    graph: graphSelector(state),
    contextMenuDefaults: contextMenuDefaultsSelector(state),
    edgeHandlesDefaults: edgeHandlesDefaultsSelector(state)
  }),
  (dispatch, props) => ({
    doLayout: () => dispatch(layout(props)),
    doShowConnections: nodeId => {
      dispatch(showConnections(nodeId, props))
    },
    doAddConnection: ({ sourceNodeId, targetNodeId, addedEdgeId }) =>
      dispatch(
        addConnection({ sourceNodeId, targetNodeId, addedEdgeId }, props)
      )
  })
)(Graph)
