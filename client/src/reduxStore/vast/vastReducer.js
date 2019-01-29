import { includes as _includes } from 'lodash'
import initialState from './vastInitialState'
import {
  CREATE_VIEW,
  DELETE_VIEW,
  LAYOUT,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  CLASS_PERSON,
  CLASS_ACCOUNTABILITY,
  CLASS_PRIORITY
} from './vastConstants'

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

const updateLayout = state => {
  const { graph, graphLayout } = state
  graph.makeLayout(graphLayout).run()
}

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VIEW: {
      const { id, name, nodeTypes } = action.payload
      const nodes = [
        {
          data: {
            id: '1',
            label: 'Person A'
          },
          classes: [CLASS_PERSON]
        },
        {
          data: {
            id: '2',
            label: 'Person B'
          },
          classes: [CLASS_PERSON]
        },
        {
          data: {
            id: '3',
            label: 'Accountability 1'
          },
          classes: [CLASS_ACCOUNTABILITY]
        },
        {
          data: {
            id: '4',
            label: 'Accountability 2'
          },
          classes: [CLASS_ACCOUNTABILITY]
        },
        {
          data: {
            id: '5',
            label: 'Accountability 3'
          },
          classes: [CLASS_ACCOUNTABILITY]
        }
      ]

      const edges = [
        { data: { id: 'e13', source: '1', target: '3' } },
        { data: { id: 'e12', source: '1', target: '2' } },
        { data: { id: 'e24', source: '2', target: '4' } },
        { data: { id: 'e15', source: '1', target: '5' } },
        { data: { id: 'e25', source: '2', target: '5' } }
      ]

      const { graph } = state
      graph.add([
        ...nodes.map(n => ({ group: 'nodes', ...n })),
        ...edges.map(e => ({ group: 'edges', ...e }))
      ])

      state.views[id] = { name }
      return state
    }

    case DELETE_VIEW: {
      const { id } = action.payload
      delete state.views[id]
      return state
    }

    // Show / Hide nodes based on their node type
    case SET_SELECTED_NODE_TYPES: {
      const { nodeTypes } = action.payload
      const { graph, prefs, ...rest } = state
      updateStyle({ graph, selectedNodeTypes: nodeTypes })
      return {
        graph,
        prefs: prefs.setIn(['selectedNodeTypes'], nodeTypes),
        ...rest
      }
    }

    // Create a new node
    case ADD_NODE: {
      const { graph } = state
      graph.add([
        {
          data: {
            id: '10',
            label: 'Priority 1'
          },
          classes: [CLASS_PRIORITY]
        }
      ])
      // Update the layout
      updateLayout(state)
      return state
    }

    // Update the layout
    case LAYOUT: {
      updateLayout(state)
      return state
    }

    default:
      return state
  }
}
