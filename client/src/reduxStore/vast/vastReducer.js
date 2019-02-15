import { filter as _filter } from 'lodash'
import cytoscape from 'cytoscape'

import { mountPoint } from '.'
import initialState from './vastInitialState'
import {
  CREATE_VIEW,
  DELETE_VIEW,
  SET_ACTIVE_VIEW,
  SHOW_CONNECTIONS,
  LAYOUT,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  CLASS_HIDDEN,
  CLASS_NEW,
  NODE_TYPE_CLASS_MAP,
  ADD_CONNECTION,
  TOGGLE_EDIT_MODE,
  SELECT_NODE,
  NODE_DATA_ORG_POS
} from './vastConstants'

import {
  graphSelector,
  viewListSelector,
  activeViewIdSelector,
  graphsSelector,
  viewsSelector,
  editModeSelector
  // selectedNodeTypesSelector
} from './vastSelectors'

// Get the results of any selector (avoids repeating logic in the reducer)
const runSelector = (selector, state) => selector({ [mountPoint]: state })

/**
 * Apply or remove the Hidden class according to selectedNodeTypes or selectedNodes
 *
 * If selectedNodes is specified, it takes priority and selectedNodeTypes is not used
 */
const setElementVisibility = ({ graph, selectedNodeTypes, selectedNodes }) => {
  graph.batch(() => {
    const specificNodes = selectedNodes && selectedNodes.length > 0
    const getSelector = () =>
      specificNodes
        ? selectedNodes.map(id => `#${id}`).join(',')
        : selectedNodeTypes
            .map(type => `.${NODE_TYPE_CLASS_MAP[type].className}`)
            .join(',')

    const selector = getSelector()
    const nodes = graph.$(selector)
    const others = graph.elements().not(nodes)
    others.addClass(CLASS_HIDDEN)
    nodes.removeClass(CLASS_HIDDEN)
    nodes.connectedEdges().removeClass(CLASS_HIDDEN)

    // If specific nodes were requested, include their first order connections
    if (specificNodes) {
      const nhood = nodes.closedNeighborhood()
      nhood.removeClass(CLASS_HIDDEN)
      nhood.connectedEdges().removeClass(CLASS_HIDDEN)
    }
  })
}

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VIEW: {
      const {
        viewId,
        name,
        nodeTypes: selectedNodeTypes,
        nodes: selectedNodes
      } = action.payload
      const { model, defaults, graphs } = state
      const { nodes, edges } = model
      const { style } = defaults

      const cyNodes = Object.entries(nodes).map(([id, { label, type }]) => {
        const { className } = NODE_TYPE_CLASS_MAP[type]
        return { group: 'nodes', data: { id, label }, classes: [className] }
      })

      const cyEdges = Object.entries(edges).map(([id, e]) => ({
        group: 'edges',
        data: { id, ...e }
      }))

      const graph = cytoscape({
        elements: {
          nodes: cyNodes,
          edges: cyEdges
        },
        style
      })

      graph.maxZoom(2)

      // Set visibility based on node types
      setElementVisibility({ graph, selectedNodeTypes, selectedNodes })

      // Add the View, Add the Graph, and set the new View to be the active view
      return {
        ...state,
        views: state.views.setIn([viewId], {
          timestamp: new Date().getTime(),
          name,
          selectedNodeTypes,
          layout: null,
          editMode: false,
          selectedNode: null
        }),
        graphs: { ...graphs, [viewId]: graph },
        viewer: { ...state.viewer, activeView: viewId }
      }
    }

    case DELETE_VIEW: {
      const { viewId } = action.payload
      const activeViewId = runSelector(activeViewIdSelector, state)
      const viewList = runSelector(viewListSelector, state)
      let nextViewId = activeViewId
      if (viewId === activeViewId) {
        // Deleting the currently selected View
        const allRemainingViews = _filter(viewList, v => v.id !== viewId)
        nextViewId =
          allRemainingViews.length > 0 ? allRemainingViews[0].id : null
      }

      // Destroy the graph
      const graphs = runSelector(graphsSelector, state)
      const graph = graphs[viewId]
      graph.destroy()

      // Remove the graph from the (mutable) list of graphs
      delete graphs[viewId]

      // Remove the view, remove the (destroyed) graph, and set the selected view
      return {
        ...state,
        views: state.views.without(viewId),
        graphs,
        viewer: { ...state.viewer, activeView: nextViewId }
      }
    }

    case SET_ACTIVE_VIEW: {
      const { viewId } = action.payload
      return {
        ...state,
        viewer: { ...state.viewer, activeView: viewId }
      }
    }

    // Show / Hide nodes based on their node type
    case SET_SELECTED_NODE_TYPES: {
      const { nodeTypes: selectedNodeTypes, viewId } = action.payload
      const graph = runSelector(graphSelector, state)
      setElementVisibility({ graph, selectedNodeTypes })
      return {
        ...state,
        views: state.views.setIn(
          [viewId, 'selectedNodeTypes'],
          selectedNodeTypes
        )
      }
    }

    case SELECT_NODE: {
      const { viewId, nodeId } = action.payload
      return {
        ...state,
        views: state.views.setIn([viewId, 'selectedNode'], nodeId)
      }
    }

    case TOGGLE_EDIT_MODE: {
      const { viewId } = action.payload
      const editMode = runSelector(editModeSelector, state)
      return {
        ...state,
        views: state.views.setIn([viewId, 'editMode'], !editMode)
      }
    }

    // Create a new node
    case ADD_NODE: {
      const { viewId, nodeId, label, type } = action.payload
      const { className } = NODE_TYPE_CLASS_MAP[type]
      const rawNode = { label, type }

      // Add to every graph
      const cyNode = {
        data: { id: nodeId, ...rawNode },
        classes: [className, CLASS_NEW]
      }
      const graphs = runSelector(graphsSelector, state)
      const views = runSelector(viewsSelector, state)
      Object.entries(graphs).forEach(([graphId, graph]) => {
        graph.add([cyNode])

        // Always display the node in the current view, but don't necessarily display it in the others
        if (graphId !== viewId) {
          // Apply the Hidden class (or not) depending on currently selected node types for the corresponding view
          const view = views[graphId]
          const { selectedNodeTypes } = view
          setElementVisibility({ graph, selectedNodeTypes })
        }

        // Reapply the current layout
        const currentLayout = views[viewId].layout
        applyLayout({ graph, layout: currentLayout })
      })

      // Add to the underlying data model
      const nextModel = state.model.setIn(['nodes', nodeId], rawNode)
      return {
        ...state,
        model: nextModel
      }
    }

    // Create a new edge
    case ADD_CONNECTION: {
      const { viewId, sourceNodeId, targetNodeId, addedEdgeId } = action.payload

      // Add the new edge to the model
      const rawEdge = { source: sourceNodeId, target: targetNodeId }
      const nextModel = state.model.setIn(['edges', addedEdgeId], rawEdge)

      const graphs = runSelector(graphsSelector, state)
      Object.entries(graphs).forEach(([graphId, graph]) => {
        // The edge has already been added in the current view.  Add the edge to all other graphs (other than the current)
        if (graphId !== viewId) {
          const cyEdge = { data: { id: addedEdgeId, ...rawEdge } }
          graph.add([cyEdge])
        }
      })

      return { ...state, model: nextModel }
    }

    case SHOW_CONNECTIONS: {
      const { viewId, nodeId } = action.payload
      const graphs = runSelector(graphsSelector, state)
      const graph = graphs[viewId]
      const node = graph.$(`#${nodeId}`)
      node.closedNeighborhood().removeClass(CLASS_HIDDEN)

      return state
    }

    // Update the layout
    case LAYOUT: {
      const { viewId, forceUpdate, opts } = action.payload
      const views = runSelector(viewsSelector, state)
      const view = views[viewId]
      const { layout } = view
      const graph = runSelector(graphSelector, state)

      let nextState = state

      if (!layout || forceUpdate) {
        // Has never had a layout before: Apply the default layout and save original positions
        const { defaults } = state
        const { layout: defaultLayout } = defaults
        const nextLayout = opts || layout || defaultLayout

        applyLayout({ graph, layout: nextLayout, stable: !!layout })

        nextState = {
          ...state,
          views: state.views.setIn([viewId, 'layout'], nextLayout)
        }
      }

      return nextState
    }

    default:
      return state
  }
}

const applyLayout = ({ graph, layout, stable = true }) => {
  const opts = stable ? { ...layout, randomize: false } : layout

  // After the layout finishes, record the position of each node
  const recordPositions = () => {
    const allNodes = graph.nodes()
    allNodes.forEach(n => {
      const position = n.position()
      // Note: Create a shallow copy of the position via spread operator
      n.data(NODE_DATA_ORG_POS, { ...position })
    })
  }

  // Record the positions on both events -- This is to handle the case where a user may click to select a nde
  // before the layout has finished
  const l = graph.makeLayout({
    ...opts,
    ready: (...args) => {
      recordPositions()
      if (opts.ready) {
        opts.ready(args)
      }
    },
    stop: (...args) => {
      recordPositions()
      if (opts.stop) {
        opts.stop(args)
      }
    }
  })

  l.run()
}
