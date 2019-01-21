import initialState from './vastInitialState'
import { ADD_NODE, SET_SELECTED_NODE_TYPES } from './vastConstants'

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_NODE_TYPES: {
      const { nodeTypes } = action.payload
      const { prefs, ...rest } = state
      return {
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
