import { AUTH_SIGNIN_SUCCESS } from './authConstants'

export const signInSuccess = ({ user, token }) => ({
  type: AUTH_SIGNIN_SUCCESS,
  payload: { user, token }
})
