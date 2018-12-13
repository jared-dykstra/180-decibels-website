import {
  GET_STARTED_OPEN_MODAL,
  GET_STARTED_CLOSE_MODAL,
  GET_STARTED_TOGGLE_MODAL
} from './getStartedConstants'

export const openDialog = () => ({
  type: GET_STARTED_OPEN_MODAL,
  payload: {}
})

export const closeDialog = () => ({
  type: GET_STARTED_CLOSE_MODAL,
  payload: {}
})

export const toggleDialog = () => ({
  type: GET_STARTED_TOGGLE_MODAL,
  payload: {}
})
