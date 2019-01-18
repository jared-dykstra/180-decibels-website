import initialState from './vastInitialState'
import { ADD_NODE } from './vastConstants'

// Note: Nodes and Edges use a *mutable* data structure
// The graph component listens for changes and no re-render is needed
// See: http://visjs.org/docs/data/dataset.html?keywords=DataSet
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE: {
      const { nodes } = state

      nodes.add({
        id: 7,
        label: 'jared'
      })

      return state
    }

    default:
      return state
  }
}
