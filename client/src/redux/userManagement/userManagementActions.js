import { USER_MANAGEMENT_REGISTER } from './userManagementConstants'

export const register = ({ company, firstName, lastName, email, phone }) => ({
  type: USER_MANAGEMENT_REGISTER,
  payload: { company, firstName, lastName, email, phone }
})
