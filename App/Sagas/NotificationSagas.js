import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import NotificationActions from '../Redux/NotificationRedux'

export function* getMyNotifications(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getMyNotifications, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(NotificationActions.getMyNotificationsSuccess(data))
  } else {
    yield put(NotificationActions.getMyNotificationsFailure(data))
  }
}

export function* updateNotification(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updateNotification, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(NotificationActions.updateNotificationSuccess(data))
  } else {
    yield put(NotificationActions.updateNotificationFailure(data))
  }
}
