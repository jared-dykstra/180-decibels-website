import {
  AUTH_AUTHENTICATE,
  AUTH_SIGNOUT,
  AUTH_SIGNIN,
  AUTH_REGISTER,
  AUTH_OPEN_SIGNIN_MODAL,
  AUTH_CLOSE_SIGNIN_MODAL,
  AUTH_LOG_PAGE_VIEW,
  AUTH_LOG_MODAL_VIEW,
  AUTH_LOG_EVENT,
  AUTH_LOG_ERROR
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

export const logPageView = ({ uri }) => ({
  type: AUTH_LOG_PAGE_VIEW,
  payload: { uri }
})

export const logModalView = ({ modalName }) => ({
  type: AUTH_LOG_MODAL_VIEW,
  payload: { modalName }
})

export const logEvent = ({ category, action, label, value }) => ({
  type: AUTH_LOG_EVENT,
  payload: { category, action, label, value }
})

export const logError = ({ error, info, fatal }) => ({
  type: AUTH_LOG_ERROR,
  payload: { error, info, fatal }
})
