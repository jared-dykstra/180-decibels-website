import initialState from './userManagementInitialState'
import { USER_MANAGEMENT_SIGNIN_SUCCESS } from './userManagementConstants'

// Does nothing
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_MANAGEMENT_SIGNIN_SUCCESS: {
      const { payload } = action
      const { user, token } = payload
      return state.setIn(['user'], user).setIn(['token'], token)
    }
    default:
      return state
  }
}
