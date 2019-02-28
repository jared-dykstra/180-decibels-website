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
    contextMenuDefaults: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    edgeHandlesDefaults: PropTypes.object,
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
    className: '',
    contextMenuDefaults: {
      // menuRadius: 100, // the radius of the circular menu in pixels
      // selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
      // // an array of commands to list in the menu or a function that returns the array
      // // function( ele ){ return [ /*...*/ ] }, // example function for commands
      // commands: [],
      // fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
      // activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
      // activePadding: 20, // additional size in pixels for the active command
      // indicatorSize: 24, // the size in pixels of the pointer to the active command
      // separatorWidth: 3, // the empty spacing in pixels between successive commands
      // spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      // minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
      // maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
      // openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      // itemColor: 'white', // the colour of text in the command's content
      // itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
      // zIndex: 9999, // the z-index of the ui div
      // atMouse: false // draw menu at mouse position
    },
    edgeHandlesDefaults: {
      // preview: true, // whether to show added edges preview before releasing selection
      // hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      // handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      // snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      // snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      // snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      // noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
      // disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
      // handlePosition(node) {
      //   return 'middle top' // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      // },
      // handleInDrawMode: false, // whether to show the handle in draw mode
      handleInDrawMode: true
      // edgeType(sourceNode, targetNode) {
      //   // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
      //   // returning null/undefined means an edge can't be added between the two nodes
      //   return 'flat'
      // },
      // loopAllowed(node) {
      //   // for the specified node, return whether edges from itself to itself are allowed
      //   return false
      // },
      // nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      // nodeParams(sourceNode, targetNode) {
      //   // for edges between the specified source and target
      //   // return element object to be passed to cy.add() for intermediary node
      //   return {}
      // },
      // edgeParams(sourceNode, targetNode, i) {
      //   // for edges between the specified source and target
      //   // return element object to be passed to cy.add() for edge
      //   // NB: i indicates edge index in case of edgeType: 'node'
      //   return {}
      // },
      // ghostEdgeParams() {
      //   // return element object to be passed to cy.add() for the ghost edge
      //   // (default classes are always added for you)
      //   return {}
      // },
      // show(sourceNode) {
      //   // fired when handle is shown
      // },
      // hide(sourceNode) {
      //   // fired when the handle is hidden
      // },
      // start(sourceNode) {
      //   // fired when edgehandles interaction starts (drag on handle)
      // },
      // complete(sourceNode, targetNode, addedEles) {
      //   // fired when edgehandles is done and elements are added
      // },
      // stop(sourceNode) {
      //   // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      // },
      // cancel(sourceNode, cancelledTargets) {
      //   // fired when edgehandles are cancelled (incomplete gesture)
      // },
      // hoverover(sourceNode, targetNode) {
      //   // fired when a target is hovered
      // },
      // hoverout(sourceNode, targetNode) {
      //   // fired when a target isn't hovered anymore
      // },
      // previewon(sourceNode, targetNode, previewEles) {
      //   // fired when preview is shown
      // },
      // previewoff(sourceNode, targetNode, previewEles) {
      //   // fired when preview is hidden
      // },
      // drawon() {
      //   // fired when draw mode enabled
      // },
      // drawoff() {
      //   // fired when draw mode disabled
      // }
    }
  }

  constructor(props) {
    super(props)

    this.ref = null
    this.menu = null
    this.edgeHandles = null

    // Used for highlight logic.  This is used as a stack, because state transitions are animated (and take time)
    // so it needs to accommodate rapid clicks
    this.lastHighlighted = []
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

        // If a node is manually positioned, record that position so that if a neighboring node is selected and unselected the
        // manually positioned node's location is restored correctly
        graph.on('tapdragout', e => {
          // If the user manually repositioned a node.. And If no node is currently selected
          if (this.lastHighlighted.length > 0) {
            const { target } = e
            if (target.isNode && target.isNode()) {
              const position = target.position()
              // Save its position.
              // Note: Create a shallow copy of the position via spread operator
              target.data(NODE_DATA_ORG_POS, { ...position })
            }
          }
        })

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

    const nhood = node.closedNeighborhood()
    this.lastHighlighted.push(nhood)
    const others = graph.elements().not(nhood)
    const classHidden = this.classHidden()

    const reset = async () => {
      graph.batch(() => {
        others.addClass(classHidden)
        nhood.removeClass(classHidden)
        nhood.removeClass(CLASS_FADED)
        nhood.addClass(CLASS_HIGHLIGHTED)
      })

      await this.animateFit(nhood.filter(':visible'))
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

    // 1. Reset classes
    await reset()
    // 2. Pause
    await sleep(animationDurationMs)
    // 3. Fade other elements
    graph.batch(() => {
      others.removeClass(classHidden).addClass(CLASS_FADED)
    })
    // 4. Layout neighborhood
    await runLayout()
    // 5. Zoom to neighborhood
    await this.animateFit(nhood.filter(':visible'))
    // 6. Pause (useful if rapid clicks cause a series of highlights)
    await sleep(animationDelayMs * 2)
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

    // 1. Preempt existing animations
    this.stopAnimations()

    // 2. Remove highlighting
    const nhood = this.lastHighlighted.pop()
    if (nhood) {
      nhood.removeClass(CLASS_HIGHLIGHTED)
    }

    // 3. Restore original position
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

    // 4. Pause
    await sleep(animationDelayMs * 2)

    // 5. Show Others
    graph.batch(() => {
      const classHidden = this.classHidden()
      const allElements = graph.elements()
      allElements.removeClass(classHidden)
      allElements.removeClass(CLASS_FADED)
    })
    await sleep(animationDurationMs)
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
      graph.resize()
      graph.fit()
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
