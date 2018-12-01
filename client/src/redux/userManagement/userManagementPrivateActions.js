import { USER_MANAGEMENT_SIGNIN_SUCCESS } from './userManagementConstants'

export const signInSuccess = ({ user, token }) => ({
  type: USER_MANAGEMENT_SIGNIN_SUCCESS,
  payload: { user, token }
})
