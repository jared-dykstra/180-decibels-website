import * as actions from './userManagementActions'
import * as selectors from './userManagementSelectors'

export { default as reducer } from './userManagementReducer'
export { default as saga } from './userManagementSaga'
export { actions }
export { selectors }
export const mountPoint = 'userManagement'
