import { USER_MANAGEMENT_REGISTER } from './userManagementConstants'

export const register = user => ({
  type: USER_MANAGEMENT_REGISTER,
  payload: { user }
})
