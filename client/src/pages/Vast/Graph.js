import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

import {
  CLASS_HIDDEN,
  NODE_DATA_ORG_POS,
  CLASS_FADED,
  CLASS_HIGHLIGHTED
} from 'reduxStore/vast/vastConstants'

import {
  graphSelector,
  contextMenuDefaultsSelector,
  edgeHandlesDefaultsSelector,
  editModeSelector,
  selectedNodeSelector,
  editingNodeSelector
} from 'reduxStore/vast/vastSelectors'
import {
  layout,
  editNode,
  selectNode,
  showConnections,
  addConnection
} from 'reduxStore/vast/vastActions'

import DetailPane from './DetailPane'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Graph extends PureComponent {
  static propTypes = {
    selectedNode: PropTypes.string,
    editingNode: PropTypes.string,
    editMode: PropTypes.bool.isRequired,
    layoutPadding: PropTypes.number,
    layoutOpts: PropTypes.shape({
      name: PropTypes.string.isRequired,
      fit: PropTypes.bool.isRequired,
      animate: PropTypes.bool.isRequired,
      avoidOverlap: PropTypes.bool.isRequired
    }),
    easing: PropTypes.string,
    animationDurationMs: PropTypes.number,
    animationDelayMs: PropTypes.number,
    hideWhileTraversing: PropTypes.bool,
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
    doSelectNode: PropTypes.func.isRequired,
    doEditNode: PropTypes.func.isRequired,
    doShowConnections: PropTypes.func.isRequired,
    doAddConnection: PropTypes.func.isRequired,
    doLayout: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    selectedNode: null,
    editingNode: null,
    layoutPadding: 50,
    layoutOpts: {
      name: 'concentric',
      fit: false,
      animate: true,
      avoidOverlap: true,
      nodeDimensionsIncludeLabels: true
    },
    easing: 'linear',
    animationDurationMs: 500,
    animationDelayMs: 125,
    hideWhileTraversing: false,
    className: ''
  }

  constructor(props) {
    super(props)

    this.ref = null
    this.menu = null
    this.edgeHandles = null

    // Used for highlight logic
    this.lastHighlighted = null
    this.lastUnhighlighted = null
  }

  // Mount the graph (previously running headless)
  componentDidMount() {
    // console.log(`Graph componentDidMount ${this.props.viewId}`)
    if (this.ref) {
      const { graph } = this.props
      if (graph) {
        // Mount the graph to the DOM
        graph.mount(this.ref)

        // Initialize the contextMenu extension
        {
          const { contextMenuDefaults } = this.props
          this.menu = graph.cxtmenu({
            ...contextMenuDefaults,
            commands: this.contextCommands()
          })
        }

        // Initialize the edgeHandles extension
        {
          const { edgeHandlesDefaults, doAddConnection, editMode } = this.props

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

          this.applyEditMode(editMode)
        }

        // Initialize the selection/highlight logic
        graph.on('select unselect', () => this.handleSelectNode())

        // Perform an initial layout.  Layout requires a bounding box, which is derived from the component to which the graph is mounted
        const { doLayout } = this.props
        doLayout()
      }
    }
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps) {
    // Edge Detection - Did editMode change?
    const { editMode } = this.props
    if (editMode && !prevProps.editMode) {
      this.applyEditMode(true)
    }
    if (!editMode && prevProps.editMode) {
      this.applyEditMode(false)
    }

    // Edge Detection - Did the selectedNode change?
    const { selectedNode } = this.props
    if (selectedNode !== prevProps.selectedNode) {
      Promise.resolve().then(() => this.applySelectedNode())
    }
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

  applyEditMode = enabled => {
    if (enabled) {
      this.edgeHandles.enableDrawMode()
      this.edgeHandles.enable()
    } else {
      this.edgeHandles.hide()
      this.edgeHandles.disableDrawMode()
      this.edgeHandles.disable()
    }
  }

  handleSelectNode = selectedNode => {
    const { graph, editMode, doSelectNode } = this.props

    // Stop any animations
    this.stopAnimations()

    // Disable node selection when editing
    if (!editMode) {
      const node = selectedNode || graph.$('node:selected')
      doSelectNode(node.id())
    }
  }

  applySelectedNode = async () => {
    const { graph, selectedNode } = this.props
    if (!selectedNode) {
      await this.clear()
    } else {
      const node = graph.$(`#${selectedNode}`)
      if (node.nonempty()) {
        await this.highlight(node)
      } else {
        await this.clear()
      }
    }
  }

  handleClickEdit = node => {
    const { doEditNode } = this.props
    doEditNode(node.id())
  }

  handleHideDetails = () => {
    const { doEditNode } = this.props
    doEditNode(null)
  }

  classHidden = () => {
    const { hideWhileTraversing } = this.props
    return hideWhileTraversing ? CLASS_HIDDEN : `xxx-${CLASS_HIDDEN}`
  }

  animateFit = async elements => {
    const { graph, layoutPadding, easing, animationDurationMs } = this.props
    await graph
      .animation({
        fit: {
          eles: elements,
          padding: layoutPadding
        },
        easing,
        duration: animationDurationMs
      })
      .play()
      .promise()
  }

  // See: https://github.com/cytoscape/wineandcheesemap/blob/gh-pages/demo.js
  highlight = async node => {
    const {
      graph,
      layoutPadding,
      layoutOpts,
      easing,
      animationDurationMs,
      animationDelayMs
    } = this.props

    // const oldNhood = this.lastHighlighted
    this.lastHighlighted = node.closedNeighborhood()
    this.lastUnhighlighted = graph.elements().not(this.lastHighlighted)

    const nhood = this.lastHighlighted
    const others = this.lastUnhighlighted
    const classHidden = this.classHidden()

    const reset = async () => {
      graph.batch(() => {
        others.addClass(classHidden)
        nhood.removeClass(classHidden)
        nhood.removeClass(CLASS_FADED)
        nhood.addClass(CLASS_HIGHLIGHTED)
      })

      await this.animateFit(nhood.filter(':visible'))
      await sleep(animationDurationMs)
    }

    const runLayout = async () => {
      // If the node is brand new, it may not have a recorded position (layout not yet run)
      const originalPosition = node.data(NODE_DATA_ORG_POS)
      const currentPosition = node.position()
      const p = originalPosition || currentPosition

      const opts = {
        ...layoutOpts,
        animationDuration: animationDurationMs,
        animationEasing: easing,
        boundingBox: {
          x1: p.x - 1,
          x2: p.x + 1,
          y1: p.y - 1,
          y2: p.y + 1
        },
        padding: layoutPadding * 4,
        concentric: ele => {
          if (ele.same(node)) {
            return 2
          }
          return 1
        },
        levelWidth: () => 1
      }

      const l = nhood.filter(':visible').makeLayout(opts)
      const promise = graph.promiseOn('layoutstop')
      l.run()

      await promise
    }

    const showOthersFaded = async () => {
      await sleep(animationDelayMs * 2)
      graph.batch(() => {
        others.removeClass(classHidden).addClass(CLASS_FADED)
      })
    }

    await reset()
    await runLayout()
    await this.animateFit(nhood.filter(':visible'))
    await showOthersFaded()
  }

  // Stop any animations
  stopAnimations = () => {
    const { graph } = this.props
    graph.stop()
    const allNodes = graph.nodes()
    allNodes.stop()
  }

  clear = async () => {
    const {
      graph,
      animationDurationMs,
      animationDelayMs,
      layoutPadding,
      easing
    } = this.props
    const classHidden = this.classHidden()

    this.stopAnimations()

    const nhood = this.lastHighlighted
    const others = this.lastUnhighlighted

    this.lastHighlighted = null
    this.lastUnhighlighted = null

    const showOthers = async () => {
      graph.batch(() => {
        others.removeClass(classHidden)
        others.removeClass(CLASS_FADED)
      })

      await sleep(animationDurationMs)
    }

    const restorePositions = async () => {
      const opts = {
        name: 'preset',
        positions: n => {
          const originalPosition = n.data(NODE_DATA_ORG_POS)
          return originalPosition
        },
        animate: true,
        animationDuration: animationDurationMs,
        animationEasing: easing,
        padding: layoutPadding * 4
      }

      const l = graph
        .nodes()
        .filter(':visible')
        .makeLayout(opts)
      const promise = graph.promiseOn('layoutstop')
      l.run()

      await promise
    }

    nhood.removeClass(CLASS_HIGHLIGHTED)
    await restorePositions()
    await sleep(animationDelayMs * 2)
    await showOthers()
    await this.animateFit(graph.elements().filter(':visible'))
  }

  contextCommands = (/* element */) => {
    const { doShowConnections } = this.props
    const self = this
    return [
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Edit', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          // a function to execute when the command is selected
          self.handleClickEdit(ele)
        },
        enabled: true // whether the command is selectable
      },
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Connections', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          // console.log(`Connections: ${ele.id()}`) // `ele` holds the reference to the active element
          doShowConnections(ele.id())
        },
        enabled: true // whether the command is selectable
      },
      {
        // fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Select', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select(ele) {
          // a function to execute when the command is selected
          self.handleSelectNode(ele)
        },
        enabled: true // whether the command is selectable
      }
    ]
  }

  handleResize = () => {
    const { graph, doLayout } = this.props
    if (graph) {
      doLayout()
    }
  }

  render() {
    const { className, graph, editingNode } = this.props
    // Resolve the node from the id, if editing
    const detailsNode = editingNode ? graph.$(`#${editingNode}`) : null
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
          <Typography variant="h6" color="secondary">
            {detailsNode[0].data().label}
          </Typography>
          <Typography>TODO: Add UI to edit attributes of this node</Typography>
        </DetailPane>
      )
    ]
  }
}

export default connect(
  state => ({
    graph: graphSelector(state),
    contextMenuDefaults: contextMenuDefaultsSelector(state),
    edgeHandlesDefaults: edgeHandlesDefaultsSelector(state),
    selectedNode: selectedNodeSelector(state),
    editMode: editModeSelector(state),
    editingNode: editingNodeSelector(state)
  }),
  (dispatch, props) => ({
    doLayout: () => dispatch(layout(props)),
    doShowConnections: nodeId => {
      dispatch(showConnections(nodeId, props))
    },
    doAddConnection: ({ sourceNodeId, targetNodeId, addedEdgeId }) =>
      dispatch(
        addConnection({ sourceNodeId, targetNodeId, addedEdgeId }, props)
      ),
    doSelectNode: nodeId => dispatch(selectNode(nodeId, props)),
    doEditNode: nodeId => dispatch(editNode(nodeId, props))
  })
)(Graph)
