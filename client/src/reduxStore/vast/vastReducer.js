import { includes as _includes } from 'lodash'
import initialState from './vastInitialState'
import {
  LOAD,
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

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const { graph } = state

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
        { data: { id: 'e25', source: '2', target: '5' } }
      ]

      graph.add([
        ...nodes.map(n => ({ group: 'nodes', ...n })),
        ...edges.map(e => ({ group: 'edges', ...e }))
      ])

      return state
    }

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

    case ADD_NODE: {
      return state
    }

    default:
      return state
  }
}
