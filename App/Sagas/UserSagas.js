import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserActions from '../Redux/UserRedux'

export function* registerUser(api, action) {
  const { type, ...params } = action

  const res = yield call(api.registerUser, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.registerUserSuccess(data.message))
  } else {
    yield put(UserActions.registerUserFailure(data.error))
  }
}

export function* loginUser(api, action) {
  const { type, ...params } = action

  const res = yield call(api.loginUser, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    if (!data.isValidated) {
      yield put(UserActions.loginUserSuccess(null))
      yield put(
        UserActions.loginUserFailure(
          'You are not confirmed your OTP yet. Please check your email'
        )
      )
    } else {
      yield put(UserActions.loginUserSuccess(data))
    }
  } else {
    yield put(UserActions.loginUserFailure(data.error))
  }
}

export function* verifyUser(api, action) {
  const { type, ...params } = action

  const res = yield call(api.verifyUser, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.verifyUserSuccess(data))
  } else {
    yield put(UserActions.verifyUserFailure(data.error))
  }
}

export function* sendOtp(api, action) {
  const { type, ...params } = action

  const res = yield call(api.sendOtp, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.sendOtpSuccess(data.message))
  } else {
    yield put(UserActions.sendOtpFailure(data.error))
  }
}

export function* getCurrentUser(api, action) {
  const { type, ...params } = action

  const res = yield call(api.getCurrentUser, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.getCurrentUserSuccess(data))
  } else {
    yield put(UserActions.getCurrentUserFailure(data.error))
  }
}

export function* updateName(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updateName, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updateNameUserSuccess(data))
  } else {
    yield put(UserActions.updateNameUserFailure(data.error))
  }
}

export function* updateBirthdate(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updateBirthdate, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updateBirthdateUserSuccess(data))
  } else {
    yield put(UserActions.updateBirthdateUserFailure(data.error))
  }
}

export function* updateEmail(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updateEmail, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updateEmailUserSuccess(data))
  } else {
    yield put(UserActions.updateEmailUserFailure(data.error))
  }
}

export function* updatePassword(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updatePassword, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updatePasswordUserSuccess(data))
  } else {
    yield put(UserActions.updatePasswordUserFailure(data.error))
  }
}

export function* updatePhoto(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updatePhoto, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updatePhotoUserSuccess(data))
  } else {
    yield put(UserActions.updatePhotoUserFailure(data.error))
  }
}

export function* updateStatus(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updateStatus, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updateStatusUserSuccess(data))
  } else {
    yield put(UserActions.updateStatusUserFailure(data.error))
  }
}

export function* updatePremium(api, action) {
  const { type, ...params } = action

  const res = yield call(api.updatePremium, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.updatePremiumUserSuccess(data))
  } else {
    yield put(UserActions.updatePremiumUserFailure(data.error))
  }
}

export function* removeNotifToken(api, action) {
  const { type, ...params } = action

  const res = yield call(api.removeNotifToken, { ...params })
  const data = path(['data'], res)

  if (res.ok) {
    yield put(UserActions.removeNotifTokenSuccess(data))
  } else {
    yield put(UserActions.removeNotifTokenFailure(data.error))
  }
}
