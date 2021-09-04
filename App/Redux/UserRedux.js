import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  registerUserRequest: {
    name: null,
    email: null,
    password: null,
  },
  registerUserSuccess: ['data'],
  registerUserFailure: ['errData'],

  loginUserRequest: {
    email: null,
    password: null,
    notifToken: null,
  },
  loginUserSuccess: ['data'],
  loginUserFailure: ['errData'],

  verifyUserRequest: {
    email: null,
    otp: null,
    notifToken: null,
  },
  verifyUserSuccess: ['data'],
  verifyUserFailure: ['errData'],

  sendOtpRequest: {
    email: null,
  },
  sendOtpSuccess: ['data'],
  sendOtpFailure: ['errData'],

  updateNameUserRequest: {
    name: null,
    token: null,
  },
  updateNameUserSuccess: ['data'],
  updateNameUserFailure: ['errData'],

  updateBirthdateUserRequest: {
    birthdate: null,
    token: null,
  },
  updateBirthdateUserSuccess: ['data'],
  updateBirthdateUserFailure: ['errData'],

  updateEmailUserRequest: {
    email: null,
    token: null,
  },
  updateEmailUserSuccess: ['data'],
  updateEmailUserFailure: ['errData'],

  updatePasswordUserRequest: {
    oldPassword: null,
    newPassword: null,
    token: null,
  },
  updatePasswordUserSuccess: ['data'],
  updatePasswordUserFailure: ['errData'],

  updatePhotoUserRequest: {
    photo: null,
    token: null,
  },
  updatePhotoUserSuccess: ['data'],
  updatePhotoUserFailure: ['errData'],

  updateStatusUserRequest: {
    token: null,
  },
  updateStatusUserSuccess: ['data'],
  updateStatusUserFailure: ['errData'],

  getCurrentUserRequest: {
    token: null,
  },
  getCurrentUserSuccess: ['data'],
  getCurrentUserFailure: ['errData'],

  removeNotifTokenRequest: {
    token: null,
  },
  removeNotifTokenSuccess: ['data'],
  removeNotifTokenFailure: ['errData'],

  logout: null,
  clearSuccessAndFailure: null,
  storeToken: {
    notifToken: null,
  },
  setFingerprint: {
    isFingerprint: null,
  },
  setMounted: {
    mounted: null,
  },
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  success: null,
  loading: false,
  error: null,
  user: null,
  notifToken: null,
  isFingerprint: false,
  mounted: true,
})

export const registerUserRequest = (state) => state.merge({ loading: true })
export const registerUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    success: data,
    loading: false,
    error: null,
    user: null,
  })
}
export const registerUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
    user: null,
  })
}

export const loginUserRequest = (state) => state.merge({ loading: true })
export const loginUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    user: data,
  })
}
export const loginUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    user: null,
  })
}

export const verifyUserRequest = (state) => state.merge({ loading: true })
export const verifyUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data,
    loading: false,
    error: null,
  })
}
export const verifyUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    user: null,
    loading: false,
    error: errData,
  })
}

export const sendOtpRequest = (state) => state.merge({ loading: true })
export const sendOtpSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    success: data,
    loading: false,
    error: null,
  })
}
export const sendOtpFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const getCurrentUserRequest = (state) => state.merge({ loading: true })
export const getCurrentUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data,
    loading: false,
    error: null,
  })
}
export const getCurrentUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    user: null,
    loading: false,
    error: errData,
  })
}

export const updateNameUserRequest = (state) => state.merge({ loading: true })
export const updateNameUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    success: data.message,
    loading: false,
    error: null,
  })
}
export const updateNameUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const updateBirthdateUserRequest = (state) =>
  state.merge({ loading: true })
export const updateBirthdateUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    success: data.message,
    loading: false,
    error: null,
  })
}
export const updateBirthdateUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const updateEmailUserRequest = (state) => state.merge({ loading: true })
export const updateEmailUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    success: data.message,
    loading: false,
    error: null,
  })
}
export const updateEmailUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const updatePasswordUserRequest = (state) =>
  state.merge({ loading: true })
export const updatePasswordUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    success: data.message,
    loading: false,
    error: null,
  })
}
export const updatePasswordUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const updatePhotoUserRequest = (state) => state.merge({ loading: true })
export const updatePhotoUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    success: data.message,
    loading: false,
    error: null,
  })
}
export const updatePhotoUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    success: null,
    loading: false,
    error: errData,
  })
}

export const updateStatusUserRequest = (state) => state.merge({ loading: true })
export const updateStatusUserSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    user: data.user,
    loading: false,
    error: null,
  })
}
export const updateStatusUserFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
  })
}

export const removeNotifTokenRequest = (state) => state.merge({ loading: true })
export const removeNotifTokenSuccess = (state, action) => {
  const { data } = action

  return state.merge({ loading: false })
}
export const removeNotifTokenFailure = (state, action) => {
  const { errData } = action

  return state.merge({ loading: false, error: errData })
}

export const logout = (state) =>
  state.merge({
    success: null,
    loading: false,
    error: null,
    user: null,
    isFingerprint: false,
  })

export const clearSuccessAndFailure = (state) =>
  state.merge({
    error: null,
    success: null,
  })

export const storeToken = (state, action) => {
  const { notifToken } = action

  return state.merge({ notifToken })
}

export const setFingerprint = (state, action) => {
  const { isFingerprint } = action

  return state.merge({ isFingerprint })
}

export const setMounted = (state, action) => {
  const { mounted } = action

  return state.merge({ mounted })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_USER_REQUEST]: registerUserRequest,
  [Types.REGISTER_USER_SUCCESS]: registerUserSuccess,
  [Types.REGISTER_USER_FAILURE]: registerUserFailure,

  [Types.LOGIN_USER_REQUEST]: loginUserRequest,
  [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_USER_FAILURE]: loginUserFailure,

  [Types.UPDATE_NAME_USER_REQUEST]: updateNameUserRequest,
  [Types.UPDATE_NAME_USER_SUCCESS]: updateNameUserSuccess,
  [Types.UPDATE_NAME_USER_FAILURE]: updateNameUserFailure,

  [Types.GET_CURRENT_USER_REQUEST]: getCurrentUserRequest,
  [Types.GET_CURRENT_USER_SUCCESS]: getCurrentUserSuccess,
  [Types.GET_CURRENT_USER_FAILURE]: getCurrentUserFailure,

  [Types.UPDATE_BIRTHDATE_USER_REQUEST]: updateBirthdateUserRequest,
  [Types.UPDATE_BIRTHDATE_USER_SUCCESS]: updateBirthdateUserSuccess,
  [Types.UPDATE_BIRTHDATE_USER_FAILURE]: updateBirthdateUserFailure,

  [Types.UPDATE_EMAIL_USER_REQUEST]: updateEmailUserRequest,
  [Types.UPDATE_EMAIL_USER_SUCCESS]: updateEmailUserSuccess,
  [Types.UPDATE_EMAIL_USER_FAILURE]: updateEmailUserFailure,

  [Types.UPDATE_PASSWORD_USER_REQUEST]: updatePasswordUserRequest,
  [Types.UPDATE_PASSWORD_USER_SUCCESS]: updatePasswordUserSuccess,
  [Types.UPDATE_PASSWORD_USER_FAILURE]: updatePasswordUserFailure,

  [Types.UPDATE_PHOTO_USER_REQUEST]: updatePhotoUserRequest,
  [Types.UPDATE_PHOTO_USER_SUCCESS]: updatePhotoUserSuccess,
  [Types.UPDATE_PHOTO_USER_FAILURE]: updatePhotoUserFailure,

  [Types.UPDATE_STATUS_USER_REQUEST]: updateStatusUserRequest,
  [Types.UPDATE_STATUS_USER_SUCCESS]: updateStatusUserSuccess,
  [Types.UPDATE_STATUS_USER_FAILURE]: updateStatusUserFailure,

  [Types.VERIFY_USER_REQUEST]: verifyUserRequest,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
  [Types.VERIFY_USER_FAILURE]: verifyUserFailure,

  [Types.SEND_OTP_REQUEST]: sendOtpRequest,
  [Types.SEND_OTP_SUCCESS]: sendOtpSuccess,
  [Types.SEND_OTP_FAILURE]: sendOtpFailure,

  [Types.REMOVE_NOTIF_TOKEN_REQUEST]: removeNotifTokenRequest,
  [Types.REMOVE_NOTIF_TOKEN_SUCCESS]: removeNotifTokenSuccess,
  [Types.REMOVE_NOTIF_TOKEN_FAILURE]: removeNotifTokenFailure,

  [Types.LOGOUT]: logout,
  [Types.CLEAR_SUCCESS_AND_FAILURE]: clearSuccessAndFailure,
  [Types.STORE_TOKEN]: storeToken,
  [Types.SET_FINGERPRINT]: setFingerprint,
  [Types.SET_MOUNTED]: setMounted,
})
