import initialState from './getStartedInitialState'
import {
  GET_STARTED_CLOSE_MODAL,
  GET_STARTED_OPEN_MODAL,
  GET_STARTED_TOGGLE_MODAL
} from './getStartedConstants'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTED_CLOSE_MODAL:
      return state.setIn(['isOpen'], false)
    case GET_STARTED_OPEN_MODAL:
      return state.setIn(['isOpen'], true)
    case GET_STARTED_TOGGLE_MODAL:
      return state.setIn(['isOpen'], !state.isOpen)
    default:
      return state
  }
}
