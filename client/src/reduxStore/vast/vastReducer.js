import { includes as _includes, filter as _filter } from 'lodash'
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
  NODE_TYPE_CLASS_MAP,
  ADD_CONNECTION
} from './vastConstants'

import {
  graphSelector,
  graphLayoutSelector,
  viewListSelector,
  activeViewIdSelector,
  graphsSelector,
  viewsSelector
  // selectedNodeTypesSelector
} from './vastSelectors'

// Animates zoom + pan for the viewport
// const animateFit = ({ graph, duration = 500, padding = 20 }) => {
//   const allElements = graph.$('node')
//   graph.animate(
//     {
//       fit: {
//         eles: allElements,
//         padding
//       }
//     },
//     {
//       duration
//     }
//   )
// }

// Get the results of any selector (avoids repeating logic in the reducer)
const runSelector = (selector, state) => selector({ [mountPoint]: state })

const setElementVisibility = ({ graph, selectedNodeTypes }) => {
  // Apply or remove the Hidden class according to selectedNodeTypes
  Object.entries(NODE_TYPE_CLASS_MAP).forEach(([nodeType, details]) => {
    const { className } = details
    const elements = graph.$(`.${className}`)
    if (!_includes(selectedNodeTypes, nodeType)) {
      elements.addClass(CLASS_HIDDEN)
    } else {
      elements.removeClass(CLASS_HIDDEN)
    }
  })
}

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VIEW: {
      const { viewId, name, nodeTypes: selectedNodeTypes } = action.payload
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
      setElementVisibility({ graph, selectedNodeTypes })

      // Add the View, Add the Graph, and set the new View to be the active view
      return {
        ...state,
        views: state.views.setIn([viewId], {
          timestamp: new Date().getTime(),
          name,
          selectedNodeTypes,
          layout: null
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

    // Create a new node
    case ADD_NODE: {
      const { viewId, nodeId, label, type } = action.payload
      const { className } = NODE_TYPE_CLASS_MAP[type]
      const rawNode = { label, type }

      // Add to every graph
      const cyNode = { data: { id: nodeId, ...rawNode }, classes: [className] }
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

      // The edge has already been added in the current view.  Add the edge to all other graphs (other than the current)
      const graphs = runSelector(graphsSelector, state)
      Object.entries(graphs).forEach(([graphId, graph]) => {
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
      node
        .closedNeighborhood()
        .nodes()
        .removeClass(CLASS_HIDDEN)

      return state
    }

    // Update the layout
    case LAYOUT: {
      const { viewId, forceUpdate } = action.payload
      const views = runSelector(viewsSelector, state)
      const view = views[viewId]
      const { layout } = view
      const graph = runSelector(graphSelector, state)

      // console.log(
      //   `layout viewId={${viewId}} layout=${JSON.stringify(
      //     layout
      //   )} forceUpdate=${forceUpdate}`
      // )

      let nextState = state

      if (!layout || forceUpdate) {
        // Has never had a layout before: Apply the default layout and save original positions
        const { defaults } = state
        const { layout: defaultLayout } = defaults
        graph.makeLayout(layout || defaultLayout).run()

        const allNodes = graph.nodes()
        allNodes.forEach(n => {
          const position = n.position()
          n.data('orgPos', position)
        })

        if (!layout) {
          nextState = {
            ...state,
            views: state.views.setIn([viewId, 'layout'], defaultLayout)
          }
        }
      }

      return nextState
    }

    default:
      return state
  }
}
