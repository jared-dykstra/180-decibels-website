import {
  GET_STARTED_OPEN_MODAL,
  GET_STARTED_CLOSE_MODAL,
  GET_STARTED_CONTACT,
  GET_STARTED_CONTACT_SUCCESS
} from './getStartedConstants'

export const openDialog = linkText => ({
  type: GET_STARTED_OPEN_MODAL,
  payload: { linkText }
})

export const closeDialog = () => ({
  type: GET_STARTED_CLOSE_MODAL,
  payload: {}
})

export const contact = user => ({
  type: GET_STARTED_CONTACT,
  payload: { user }
})

export const contactSuccess = () => ({
  type: GET_STARTED_CONTACT_SUCCESS,
  payload: {}
})
