import {
  USER_MANAGEMENT_AUTHENTICATE,
  USER_MANAGEMENT_SIGNOUT,
  USER_MANAGEMENT_SIGNIN,
  USER_MANAGEMENT_REGISTER,
  USER_MANAGEMENT_OPEN_SIGNIN_MODAL,
  USER_MANAGEMENT_CLOSE_SIGNIN_MODAL
} from './userManagementConstants'

export const openDialog = () => ({
  type: USER_MANAGEMENT_OPEN_SIGNIN_MODAL,
  payload: {}
})

export const closeDialog = () => ({
  type: USER_MANAGEMENT_CLOSE_SIGNIN_MODAL,
  payload: {}
})

export const authenticate = () => ({
  type: USER_MANAGEMENT_AUTHENTICATE,
  payload: {}
})

export const signIn = credentials => ({
  type: USER_MANAGEMENT_SIGNIN,
  payload: { credentials }
})

export const register = user => ({
  type: USER_MANAGEMENT_REGISTER,
  payload: { user }
})

export const signOut = () => ({
  type: USER_MANAGEMENT_SIGNOUT,
  payload: {}
})
