import initialState from './vastInitialState'
import {
  ADD_NODE,
  SET_SELECTED_GROUP,
  NODE_TYPE_PRIORITY
} from './vastConstants'

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_GROUP: {
      const { group } = action.payload
      const prefs = state.prefs.setIn(['selectedGroup'], group)
      return {
        nodes: state.nodes,
        edges: state.edges,
        prefs
      }
    }

    case ADD_NODE: {
      const { nodes } = state

      nodes.add({
        id: 7,
        label: 'jared',
        group: NODE_TYPE_PRIORITY
      })

      return state
    }

    default:
      return state
  }
}
