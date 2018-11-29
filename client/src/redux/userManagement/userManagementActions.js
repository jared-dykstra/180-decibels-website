import {
  USER_MANAGEMENT_SIGNIN,
  USER_MANAGEMENT_REGISTER
} from './userManagementConstants'

export const signIn = credentials => ({
  type: USER_MANAGEMENT_SIGNIN,
  payload: { credentials }
})

export const register = user => ({
  type: USER_MANAGEMENT_REGISTER,
  payload: { user }
})
