import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import ApplicationActions from '../Redux/ApplicationRedux'

export function* createApplication(api, action) {
  const { type, ...params } = action

  const res = yield call(api.createApplication, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(ApplicationActions.createApplicationSuccess(data))
  } else {
    yield put(ApplicationActions.createApplicationFailure(data))
  }
}

export function* getMyApplications(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getMyApplications, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(ApplicationActions.getMyApplicationsSuccess(data))
  } else {
    yield put(ApplicationActions.getMyApplicationsFailure(data))
  }
}

export function* getApplication(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getApplication, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(ApplicationActions.getApplicationSuccess(data))
  } else {
    yield put(ApplicationActions.getApplicationFailure(data))
  }
}
