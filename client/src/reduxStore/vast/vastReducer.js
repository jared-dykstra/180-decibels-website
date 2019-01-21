import { includes as _includes } from 'lodash'
import initialState from './vastInitialState'
import { ADD_NODE, SET_SELECTED_NODE_TYPES } from './vastConstants'

const buildNewStyle = ({ graph, selectedNodeTypes }) => {
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
  return newStyleJson
}

const applyStyle = ({ graph, style }) => {
  graph
    .style()
    .fromJson(style)
    .update()
}

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_NODE_TYPES: {
      const { nodeTypes } = action.payload
      const { graph, prefs, ...rest } = state
      const newStyle = buildNewStyle({ graph, selectedNodeTypes: nodeTypes })
      applyStyle({ graph, style: newStyle })

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
