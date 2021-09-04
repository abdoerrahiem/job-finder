import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  createApplicationRequest: {
    token: null,
    phone: null,
    appLetter: null,
    location: null,
    resume: null,
    jobId: null,
    status: null,
  },
  createApplicationSuccess: ['data'],
  createApplicationFailure: ['errData'],

  getMyApplicationsRequest: {
    token: null,
  },
  getMyApplicationsSuccess: ['data'],
  getMyApplicationsFailure: ['errData'],

  getApplicationRequest: {
    id: null,
  },
  getApplicationSuccess: ['data'],
  getApplicationFailure: ['errData'],

  clearSuccessAndFailure: null,
  logout: null,
})

export const ApplicationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  applications: null,
  application: null,
  success: false,
  loading: false,
  error: null,
})

export const createApplicationRequest = (state) =>
  state.merge({ loading: true })
export const createApplicationSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    success: true,
    application: data,
  })
}
export const createApplicationFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    success: false,
    application: null,
  })
}

export const getMyApplicationsRequest = (state) =>
  state.merge({ loading: true })
export const getMyApplicationsSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    applications: data,
  })
}
export const getMyApplicationsFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    applications: null,
  })
}

export const getApplicationRequest = (state) => state.merge({ loading: true })
export const getApplicationSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    application: data,
  })
}
export const getApplicationFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    application: null,
  })
}

export const clearSuccessAndFailure = (state) =>
  state.merge({
    error: null,
    success: null,
  })

export const logout = (state) =>
  state.merge({
    applications: null,
    application: null,
    success: false,
    loading: false,
    error: null,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_APPLICATION_REQUEST]: createApplicationRequest,
  [Types.CREATE_APPLICATION_SUCCESS]: createApplicationSuccess,
  [Types.CREATE_APPLICATION_FAILURE]: createApplicationFailure,

  [Types.GET_MY_APPLICATIONS_REQUEST]: getMyApplicationsRequest,
  [Types.GET_MY_APPLICATIONS_SUCCESS]: getMyApplicationsSuccess,
  [Types.GET_MY_APPLICATIONS_FAILURE]: getMyApplicationsFailure,

  [Types.GET_APPLICATION_REQUEST]: getApplicationRequest,
  [Types.GET_APPLICATION_SUCCESS]: getApplicationSuccess,
  [Types.GET_APPLICATION_FAILURE]: getApplicationFailure,

  [Types.CLEAR_SUCCESS_AND_FAILURE]: clearSuccessAndFailure,
  [Types.LOGOUT]: logout,
})
