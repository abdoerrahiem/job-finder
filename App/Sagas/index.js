import { takeLatest, all } from 'redux-saga/effects'
import API from '@Services/Api'
import FixtureAPI from '@Services/FixtureApi'
import DebugConfig from '@Config/DebugConfig'

/* ------------- Types ------------- */
import { StartupTypes } from '@Redux/StartupRedux'
import { StaticDataTypes } from '@Redux/StaticDataRedux'
import { UserTypes } from '@Redux/UserRedux'
import { JobTypes } from '@Redux/JobRedux'
import { ApplicationTypes } from '@Redux/ApplicationRedux'
import { NotificationTypes } from '@Redux/NotificationRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { getRoot } from './StaticDataSagas'
import {
  registerUser,
  verifyUser,
  loginUser,
  updateName,
  updateBirthdate,
  updateEmail,
  updatePassword,
  updatePhoto,
  removeNotifToken,
  updateStatus,
  getCurrentUser,
  sendOtp,
} from './UserSagas'
import {
  createApplication,
  getApplication,
  getMyApplications,
} from './ApplicationSagas'
import { getMyNotifications, updateNotification } from './NotificationSagas'
import { getJob, getJobs } from './JobSagas'

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(StaticDataTypes.GET_ROOT_REQUEST, getRoot, api),

    takeLatest(UserTypes.REGISTER_USER_REQUEST, registerUser, api),
    takeLatest(UserTypes.LOGIN_USER_REQUEST, loginUser, api),
    takeLatest(UserTypes.VERIFY_USER_REQUEST, verifyUser, api),
    takeLatest(UserTypes.SEND_OTP_REQUEST, sendOtp, api),
    takeLatest(UserTypes.UPDATE_NAME_USER_REQUEST, updateName, api),
    takeLatest(UserTypes.UPDATE_BIRTHDATE_USER_REQUEST, updateBirthdate, api),
    takeLatest(UserTypes.UPDATE_EMAIL_USER_REQUEST, updateEmail, api),
    takeLatest(UserTypes.UPDATE_PASSWORD_USER_REQUEST, updatePassword, api),
    takeLatest(UserTypes.UPDATE_PHOTO_USER_REQUEST, updatePhoto, api),
    takeLatest(UserTypes.UPDATE_STATUS_USER_REQUEST, updateStatus, api),
    takeLatest(UserTypes.REMOVE_NOTIF_TOKEN_REQUEST, removeNotifToken, api),
    takeLatest(UserTypes.GET_CURRENT_USER_REQUEST, getCurrentUser, api),

    takeLatest(JobTypes.GET_JOBS_REQUEST, getJobs, api),
    takeLatest(JobTypes.GET_JOB_REQUEST, getJob, api),

    takeLatest(
      ApplicationTypes.CREATE_APPLICATION_REQUEST,
      createApplication,
      api
    ),
    takeLatest(
      ApplicationTypes.GET_MY_APPLICATIONS_REQUEST,
      getMyApplications,
      api
    ),
    takeLatest(ApplicationTypes.GET_APPLICATION_REQUEST, getApplication, api),

    takeLatest(
      NotificationTypes.GET_MY_NOTIFICATIONS_REQUEST,
      getMyNotifications,
      api
    ),
    takeLatest(
      NotificationTypes.UPDATE_NOTIFICATION_REQUEST,
      updateNotification,
      api
    ),
  ])
}
