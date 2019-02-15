import {
  CREATE_VIEW,
  DELETE_VIEW,
  SET_ACTIVE_VIEW,
  SHOW_CONNECTIONS,
  ADD_CONNECTION,
  ADD_NODE,
  SET_SELECTED_NODE_TYPES,
  LAYOUT,
  TOGGLE_EDIT_MODE,
  SELECT_NODE,
  EDIT_NODE
} from './vastConstants'

// Actions affecting ui state

export const createView = ({ id, name, nodes, nodeTypes }) => ({
  type: CREATE_VIEW,
  payload: { viewId: id, name, nodes, nodeTypes }
})

export const deleteView = ({ viewId }) => ({
  type: DELETE_VIEW,
  payload: { viewId }
})

export const setActiveView = ({ viewId }) => ({
  type: SET_ACTIVE_VIEW,
  payload: { viewId }
})

export const selectNode = (nodeId, { viewId }) => ({
  type: SELECT_NODE,
  payload: { viewId, nodeId }
})

export const editNode = (nodeId, { viewId }) => ({
  type: EDIT_NODE,
  payload: { viewId, nodeId }
})

export const showConnections = (nodeId, { viewId }) => ({
  type: SHOW_CONNECTIONS,
  payload: { viewId, nodeId }
})

export const toggleEditMode = ({ viewId }) => ({
  type: TOGGLE_EDIT_MODE,
  payload: { viewId }
})

export const addConnection = (
  { sourceNodeId, targetNodeId, addedEdgeId },
  { viewId }
) => ({
  type: ADD_CONNECTION,
  payload: { viewId, sourceNodeId, targetNodeId, addedEdgeId }
})

export const setSelectedNodeTypes = (nodeTypes, { viewId }) => ({
  type: SET_SELECTED_NODE_TYPES,
  payload: { nodeTypes, viewId }
})

export const layout = ({ viewId, forceUpdate = false, opts }) => ({
  type: LAYOUT,
  payload: { viewId, forceUpdate, opts }
})

// Actions affecting contents of the graph
export const addNode = ({ nodeId, label, type }, { viewId }) => ({
  type: ADD_NODE,
  payload: { viewId, nodeId, label, type }
})
