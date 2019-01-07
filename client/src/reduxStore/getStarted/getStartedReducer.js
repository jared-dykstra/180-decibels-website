import initialState from './getStartedInitialState'
import {
  GET_STARTED_CLOSE_MODAL,
  GET_STARTED_OPEN_MODAL,
  GET_STARTED_CONTACT_SUCCESS
} from './getStartedConstants'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTED_CONTACT_SUCCESS:
      return state.setIn(['isOpen'], false)
    case GET_STARTED_CLOSE_MODAL:
      return state.setIn(['isOpen'], false)
    case GET_STARTED_OPEN_MODAL: {
      const { linkText } = action.payload
      return state.setIn(['isOpen'], true).setIn(['linkText'], linkText || null)
    }
    default:
      return state
  }
}
