import initialState from './authInitialState'
import {
  AUTH_AUTHENTICATE,
  AUTH_SIGNIN_SUCCESS,
  AUTH_OPEN_SIGNIN_MODAL,
  AUTH_CLOSE_SIGNIN_MODAL,
  AUTH_SIGNOUT
} from './authConstants'

// Does nothing
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_AUTHENTICATE: {
      return state.setIn(['isAuthenticating'], true)
    }

    case AUTH_OPEN_SIGNIN_MODAL: {
      return state.setIn(['signInModalIsOpen'], true)
    }

    case AUTH_CLOSE_SIGNIN_MODAL: {
      return state.setIn(['signInModalIsOpen'], false)
    }

    case AUTH_SIGNOUT: {
      return state
        .setIn(['user'], initialState.user)
        .setIn(['userProfileToken'], initialState.userProfileToken)
    }

    // Set user data in the store and close the signin Modal, if open
    case AUTH_SIGNIN_SUCCESS: {
      const { payload } = action
      const { user, userProfileToken } = payload
      return state
        .setIn(['user'], user)
        .setIn(['userProfileToken'], userProfileToken)
        .setIn(['signInModalIsOpen'], false)
        .setIn(['isAuthenticating'], false)
    }
    default:
      return state
  }
}
