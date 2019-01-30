import { includes as _includes } from 'lodash'
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
  CLASS_PERSON,
  CLASS_ACCOUNTABILITY,
  CLASS_PRIORITY,
  NODE_TYPE_PERSON,
  NODE_TYPE_ACCOUNTABILITY,
  NODE_TYPE_PRIORITY
} from './vastConstants'

import { graphSelector, graphLayoutSelector } from './vastSelectors'

const getSelectorState = state => ({ [mountPoint]: state })

const updateStyle = ({ graph, selectedNodeTypes }) => {
  const styleJson = graph.style().json()
  const newStyleJson = styleJson.map(s => {
    const { selector, style } = s
    const getNodeType = () => {
      const retval = selector.match(/node\.([^.]+)/)
      return retval ? retval[1] : undefined
    }
    const nodeType = getNodeType()
    if (nodeType) {
      style.display = !_includes(selectedNodeTypes, nodeType)
        ? 'none'
        : undefined
    }

    return { selector, style }
  })

  graph
    .style()
    .fromJson(newStyleJson)
    .update()

  return newStyleJson
}

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

// NOTE: action.payload must include `viewId` for this to work
const runSelector = (selector, state, action) => {
  const selectorState = getSelectorState(state)
  return selector(selectorState, action.payload)
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

      const cyNodes = nodes.map(({ id, label, type }) => {
        const getClass = () => {
          switch (type) {
            case NODE_TYPE_PERSON:
              return CLASS_PERSON
            case NODE_TYPE_ACCOUNTABILITY:
              return CLASS_ACCOUNTABILITY
            case NODE_TYPE_PRIORITY:
              return CLASS_PRIORITY
            default:
              throw new Error(`Unexpected node type: "${type}"`)
          }
        }
        const className = getClass()
        return { group: 'nodes', data: { id, label }, classes: [className] }
      })

      const cyEdges = edges.map(e => ({ group: 'edges', data: e }))

      const graph = cytoscape({
        elements: {
          nodes: cyNodes,
          edges: cyEdges
        },
        style
      })

      // Set the style according to selected node types
      // updateStyle({ graph, selectedNodeTypes })

      // Perform an initial layout
      graph.makeLayout(layout).run()

      // Add the View, Add the Graph, and set the new View to be the active view
      return {
        ...state,
        views: state.views.setIn([viewId], {
          timestamp: new Date().getTime(),
          name,
          selectedNodeTypes,
          layout,
          style
        }),
        graphs: { ...graphs, [viewId]: graph },
        viewer: { ...state.viewer, activeView: viewId }
      }
    }

    case DELETE_VIEW: {
      const { id } = action.payload
      return {
        ...state,
        views: state.views.without(id)
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
      const graph = runSelector(graphSelector, state, action)
      const style = updateStyle({ graph, selectedNodeTypes })
      return {
        ...state,
        views: state.views.setIn([viewId, 'style'], style)
      }
    }

    // Create a new node
    case ADD_NODE: {
      // const { graph } = state
      // graph.add([
      //   {
      //     data: {
      //       id: '10',
      //       label: 'Priority 1'
      //     },
      //     classes: [CLASS_PRIORITY]
      //   }
      // ])
      return state
    }

    // Update the layout
    case LAYOUT: {
      const layout = runSelector(graphLayoutSelector, state, action)
      const graph = runSelector(graphSelector, state, action)
      graph.makeLayout(layout).run()

      return state
    }

    default:
      return state
  }
}
