import { ADD_NODE, SET_SELECTED_NODE_TYPES, LOAD } from './vastConstants'

// Actions affecting ui state
export const setSelectedNodeTypes = nodeTypes => ({
  type: SET_SELECTED_NODE_TYPES,
  payload: { nodeTypes }
})

// Actions affecting contents of the graph
export const load = () => ({
  type: LOAD,
  payload: {}
})

export const addNode = () => ({
  type: ADD_NODE,
  payload: {}
})
