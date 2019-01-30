import { includes as _includes, filter as _filter } from 'lodash'
import cytoscape from 'cytoscape'

import { mountPoint } from '.'
import initialState from './vastInitialState'
import {
  CREATE_VIEW,
  DELETE_VIEW,
  SET_ACTIVE_VIEW,
  LAYOUT,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  CLASS_HIDDEN,
  NODE_TYPE_CLASS_MAP
} from './vastConstants'

import {
  graphSelector,
  graphLayoutSelector,
  viewListSelector,
  activeViewIdSelector,
  graphsSelector
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
  Object.entries(NODE_TYPE_CLASS_MAP).forEach(([nodeType, className]) => {
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
      const { style, layout } = defaults

      const cyNodes = Object.entries(nodes).map(([id, { label, type }]) => {
        const className = NODE_TYPE_CLASS_MAP[type]
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

      // Set visibility based on node types
      setElementVisibility({ graph, selectedNodeTypes })

      // Perform an initial layout
      graph.makeLayout(layout).run()

      // Add the View, Add the Graph, and set the new View to be the active view
      return {
        ...state,
        views: state.views.setIn([viewId], {
          timestamp: new Date().getTime(),
          name,
          selectedNodeTypes,
          layout
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

      // Remove the view, remove the (destroyed) graph, and set the selected view
      return {
        ...state,
        views: state.views.without(viewId),
        graphs: state.graphs.without(viewId),
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
      const { id, label, type } = action.payload
      const className = NODE_TYPE_CLASS_MAP[type]
      const rawNode = { label, type }

      // Add to every graph
      const cyNode = { data: rawNode, classes: [className] }
      const graphs = runSelector(graphsSelector, state)
      Object.values(graphs).forEach(graph => graph.add([cyNode]))

      // Add to the underlying data model
      const nextModel = state.model.setIn(['nodes', id], rawNode)
      return {
        ...state,
        model: nextModel
      }
    }

    // Update the layout
    case LAYOUT: {
      const layout = runSelector(graphLayoutSelector, state)
      const graph = runSelector(graphSelector, state)
      graph.makeLayout(layout).run()

      return state
    }

    default:
      return state
  }
}
