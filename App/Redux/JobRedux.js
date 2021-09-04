import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getJobsRequest: {},
  getJobsSuccess: ['data'],
  getJobsFailure: ['errData'],

  getJobRequest: {
    id: null,
  },
  getJobSuccess: ['data'],
  getJobFailure: ['errData'],

  logout: null,
})

export const JobTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  jobs: null,
  job: null,
  loading: false,
  error: null,
})

export const getJobsRequest = (state) => state.merge({ loading: true })
export const getJobsSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    jobs: data,
  })
}
export const getJobsFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    jobs: null,
  })
}

export const getJobRequest = (state) => state.merge({ loading: true })
export const getJobSuccess = (state, action) => {
  const { data } = action

  return state.merge({
    loading: false,
    error: null,
    job: data,
  })
}
export const getJobFailure = (state, action) => {
  const { errData } = action

  return state.merge({
    loading: false,
    error: errData,
    job: null,
  })
}

export const logout = (state) =>
  state.merge({
    jobs: null,
    job: null,
    loading: false,
    error: null,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_JOBS_REQUEST]: getJobsRequest,
  [Types.GET_JOBS_SUCCESS]: getJobsSuccess,
  [Types.GET_JOBS_FAILURE]: getJobsFailure,

  [Types.GET_JOB_REQUEST]: getJobRequest,
  [Types.GET_JOB_SUCCESS]: getJobSuccess,
  [Types.GET_JOB_FAILURE]: getJobFailure,

  [Types.LOGOUT]: logout,
})
