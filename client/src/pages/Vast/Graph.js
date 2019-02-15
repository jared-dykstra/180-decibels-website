import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

import { CLASS_HIDDEN } from 'reduxStore/vast/vastConstants'

import {
  graphSelector,
  contextMenuDefaultsSelector,
  edgeHandlesDefaultsSelector,
  editModeSelector
} from 'reduxStore/vast/vastSelectors'
import {
  layout,
  showConnections,
  addConnection
} from 'reduxStore/vast/vastActions'

import DetailPane from './DetailPane'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Graph extends PureComponent {
  static propTypes = {
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
    doShowConnections: PropTypes.func.isRequired,
    doAddConnection: PropTypes.func.isRequired,
    doLayout: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
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

    this.state = {
      detailsNode: null
    }
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
        graph.on('select unselect', 'node', () => this.handleSelectNode())

        // Perform an initial layout.  Layout requires a bounding box, which is derived from the component to which the graph is mounted
        const { doLayout } = this.props
        doLayout()
      }
    }
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps) {
    // console.log(`Graph componentDidUpdate ${this.props.viewId}`)

    const { editMode } = this.props
    if (editMode && !prevProps.editMode) {
      this.applyEditMode(true)
    }
    if (!editMode && prevProps.editMode) {
      this.applyEditMode(false)
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
    const { graph, editMode } = this.props
    if (editMode) {
      // Disable node selection when editing
      return
    }

    const node = selectedNode || graph.$('node:selected')
    if (node.nonempty()) {
      Promise.resolve().then(() => this.highlight(node))
    } else {
      this.clear()
    }
  }

  handleClickEdit = node => {
    this.setState(() => ({
      detailsNode: node
    }))
  }

  handleHideDetails = () => {
    this.setState(() => ({
      detailsNode: null
    }))
  }

  isDirty = () => this.lastHighlighted != null

  classHidden = () => {
    const { hideWhileTraversing } = this.props
    return hideWhileTraversing ? CLASS_HIDDEN : `xxx-${CLASS_HIDDEN}`
  }

  // See: https://github.com/cytoscape/wineandcheesemap/blob/gh-pages/demo.js
  highlight = node => {
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

    const reset = () => {
      graph.batch(() => {
        others.addClass(classHidden)
        nhood.removeClass(classHidden)

        graph.elements().removeClass('faded highlighted')

        nhood.addClass('highlighted')

        others.nodes().forEach(n => {
          const p = n.data('orgPos')

          n.position({ x: p.x, y: p.y })
        })
      })

      return Promise.resolve()
        .then(() => {
          if (this.isDirty()) {
            return fit()
          }
          return Promise.resolve()
        })
        .then(() => sleep(animationDurationMs))
    }

    const runLayout = () => {
      const p = node.data('orgPos')

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
        concentric(ele) {
          if (ele.same(node)) {
            return 2
          }
          return 1
        },
        levelWidth() {
          return 1
        }
      }

      const l = nhood.filter(':visible').makeLayout(opts)
      const promise = graph.promiseOn('layoutstop')
      l.run()

      return promise
    }

    const fit = () =>
      graph
        .animation({
          fit: {
            eles: nhood.filter(':visible'),
            padding: layoutPadding
          },
          easing,
          duration: animationDurationMs
        })
        .play()
        .promise()

    const showOthersFaded = () =>
      sleep(animationDelayMs * 2).then(() => {
        graph.batch(() => {
          others.removeClass(classHidden).addClass('faded')
        })
      })

    return Promise.resolve()
      .then(reset)
      .then(runLayout)
      .then(fit)
      .then(showOthersFaded)
  }

  clear = () => {
    if (!this.isDirty()) {
      return Promise.resolve()
    }

    const { graph, animationDurationMs, animationDelayMs, easing } = this.props
    const classHidden = this.classHidden()
    const allNodes = graph.nodes()

    graph.stop()
    allNodes.stop()

    const nhood = this.lastHighlighted
    const others = this.lastUnhighlighted

    this.lastHighlighted = null
    this.lastUnhighlighted = null

    const hideOthers = () =>
      sleep(250).then(() => {
        others.addClass(classHidden)

        return sleep(animationDelayMs)
      })

    const showOthers = () => {
      graph.batch(() => {
        graph
          .elements()
          .removeClass(classHidden)
          .removeClass('faded')
      })

      return sleep(animationDurationMs)
    }

    const restorePositions = () => {
      graph.batch(() => {
        others.nodes().forEach(n => {
          const p = n.data('orgPos')

          n.position({ x: p.x, y: p.y })
        })
      })

      return Promise.all(
        nhood.nodes().map(ele => {
          const p = ele.data('orgPos')

          return ele
            .animation({
              position: { x: p.x, y: p.y },
              duration: animationDurationMs,
              easing
            })
            .play()
            .promise()
        })
      )
    }

    const resetHighlight = () => {
      nhood.removeClass('highlighted')
    }

    return Promise.resolve()
      .then(resetHighlight)
      .then(hideOthers)
      .then(restorePositions)
      .then(showOthers)
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
    editMode: editModeSelector(state)
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
