import config from 'config'
import initialState from './userManagementInitialState'
import { USER_MANAGEMENT_REGISTER } from './userManagementConstants'

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_MANAGEMENT_REGISTER:
      console.log(`TODO: Register user=${JSON.stringify(action.payload.user)}`)
      console.log(`API Endpoint=${config.get('apiEndpoint')}`)
      return state
    default:
      return state
  }
}
