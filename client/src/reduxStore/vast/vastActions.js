import {
  CREATE_VIEW,
  DELETE_VIEW,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  LAYOUT
} from './vastConstants'

// Actions affecting ui state
export const setSelectedNodeTypes = nodeTypes => ({
  type: SET_SELECTED_NODE_TYPES,
  payload: { nodeTypes }
})

export const createView = ({ id, name, nodeTypes }) => ({
  type: CREATE_VIEW,
  payload: { id, name, nodeTypes }
})

export const deleteView = ({ id }) => ({
  type: DELETE_VIEW,
  payload: { id }
})

// Actions affecting contents of the graph
export const layout = () => ({
  type: LAYOUT,
  payload: {}
})

export const addNode = () => ({
  type: ADD_NODE,
  payload: {}
})
