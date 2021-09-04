import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getMyNotificationsRequest: {
    token: null,
  },
  getMyNotificationsSuccess: ['data'],
  getMyNotificationsFailure: ['errData'],

  updateNotificationRequest: {
    token: null,
    id: null,
  },
  updateNotificationSuccess: ['data'],
  updateNotificationFailure: ['errData'],
  logout: null,
})

export const NotificationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  notifications: null,
  notification: null,
  loading: false,
  error: null,
})

export const getMyNotificationsRequest = (state) =>
  state.merge({ loading: true })
export const getMyNotificationsSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    notifications: data,
  })
}
export const getMyNotificationsFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    notifications: null,
  })
}

export const updateNotificationRequest = (state) =>
  state.merge({ loading: true })
export const updateNotificationSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    application: data,
  })
}
export const updateNotificationFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    application: null,
  })
}

export const logout = (state) =>
  state.merge({
    notifications: null,
    notification: null,
    loading: false,
    error: null,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MY_NOTIFICATIONS_REQUEST]: getMyNotificationsRequest,
  [Types.GET_MY_NOTIFICATIONS_SUCCESS]: getMyNotificationsSuccess,
  [Types.GET_MY_NOTIFICATIONS_FAILURE]: getMyNotificationsFailure,

  [Types.UPDATE_NOTIFICATION_REQUEST]: updateNotificationRequest,
  [Types.UPDATE_NOTIFICATION_SUCCESS]: updateNotificationSuccess,
  [Types.UPDATE_NOTIFICATION_FAILURE]: updateNotificationFailure,

  [Types.LOGOUT]: logout,
})
