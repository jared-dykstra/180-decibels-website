import {
  CREATE_VIEW,
  DELETE_VIEW,
  SET_ACTIVE_VIEW,
  SHOW_CONNECTIONS,
  ADD_CONNECTION,
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

export const showConnections = (nodeId, { viewId }) => ({
  type: SHOW_CONNECTIONS,
  payload: { viewId, nodeId }
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
