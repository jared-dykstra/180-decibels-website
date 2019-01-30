import {
  CREATE_VIEW,
  DELETE_VIEW,
  SET_ACTIVE_VIEW,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  LAYOUT
} from './vastConstants'

// Actions affecting ui state

export const createView = ({ id, name, nodeTypes }) => ({
  type: CREATE_VIEW,
  payload: { viewId: id, name, nodeTypes }
})

export const deleteView = ({ viewId }) => ({
  type: DELETE_VIEW,
  payload: { viewId }
})

export const setActiveView = ({ viewId }) => ({
  type: SET_ACTIVE_VIEW,
  payload: { viewId }
})

export const setSelectedNodeTypes = (nodeTypes, { viewId }) => ({
  type: SET_SELECTED_NODE_TYPES,
  payload: { nodeTypes, viewId }
})

export const layout = ({ viewId }) => ({
  type: LAYOUT,
  payload: { viewId }
})

// Actions affecting contents of the graph
export const addNode = ({ id, label, type }) => ({
  type: ADD_NODE,
  payload: { id, label, type }
})
