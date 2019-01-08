import { AUTH_SIGNIN_SUCCESS } from './authConstants'

export const signInSuccess = ({ userId, user, userProfileToken }) => ({
  type: AUTH_SIGNIN_SUCCESS,
  payload: { userId, user, userProfileToken }
})
