import { ADD_NODE, SET_SELECTED_GROUP } from './vastConstants'

// Actions affecting ui state
export const setSelectedGroup = ({ group }) => ({
  type: SET_SELECTED_GROUP,
  payload: { group }
})

// Actions affecting contents of the graph
export const addNode = () => ({
  type: ADD_NODE,
  payload: {}
})
