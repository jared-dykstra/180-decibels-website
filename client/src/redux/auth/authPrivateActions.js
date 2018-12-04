import { AUTH_SIGNIN_SUCCESS } from './authConstants'

export const signInSuccess = ({ user, userProfileToken }) => ({
  type: AUTH_SIGNIN_SUCCESS,
  payload: { user, userProfileToken }
})
