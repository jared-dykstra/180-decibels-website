import {
  AUTH_AUTHENTICATE,
  AUTH_SIGNOUT,
  AUTH_SIGNIN,
  AUTH_REGISTER,
  AUTH_OPEN_SIGNIN_MODAL,
  AUTH_CLOSE_SIGNIN_MODAL
} from './authConstants'

export const openDialog = () => ({
  type: AUTH_OPEN_SIGNIN_MODAL,
  payload: {}
})

export const closeDialog = () => ({
  type: AUTH_CLOSE_SIGNIN_MODAL,
  payload: {}
})

export const authenticate = () => ({
  type: AUTH_AUTHENTICATE,
  payload: {}
})

export const signIn = credentials => ({
  type: AUTH_SIGNIN,
  payload: { credentials }
})

export const register = user => ({
  type: AUTH_REGISTER,
  payload: { user }
})

export const signOut = () => ({
  type: AUTH_SIGNOUT,
  payload: {}
})
