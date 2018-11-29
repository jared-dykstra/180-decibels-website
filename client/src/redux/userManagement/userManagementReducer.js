import initialState from './userManagementInitialState'
import {
  USER_MANAGEMENT_SIGNIN_SUCCESS,
  USER_MANAGEMENT_OPEN_SIGNIN_MODAL,
  USER_MANAGEMENT_CLOSE_SIGNIN_MODAL,
  USER_MANAGEMENT_SIGNOUT
} from './userManagementConstants'

// Does nothing
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_MANAGEMENT_OPEN_SIGNIN_MODAL: {
      return state.setIn(['signInModalIsOpen'], true)
    }

    case USER_MANAGEMENT_CLOSE_SIGNIN_MODAL: {
      return state.setIn(['signInModalIsOpen'], false)
    }

    case USER_MANAGEMENT_SIGNOUT: {
      return state
        .setIn(['user'], initialState.user)
        .setIn(['token'], initialState.token)
    }

    // Set user data in the store and close the signin Modal, if open
    case USER_MANAGEMENT_SIGNIN_SUCCESS: {
      const { payload } = action
      const { user, token } = payload
      return state
        .setIn(['user'], user)
        .setIn(['token'], token)
        .setIn(['signInModalIsOpen'], false)
    }
    default:
      return state
  }
}
