import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import JobActions from '../Redux/JobRedux'

export function* getJobs(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getJobs, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(JobActions.getJobsSuccess(data))
  } else {
    yield put(JobActions.getJobsFailure(data))
  }
}

export function* getJob(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getJob, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(JobActions.getJobSuccess(data))
  } else {
    yield put(JobActions.getJobFailure(data))
  }
}
