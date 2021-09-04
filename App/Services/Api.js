import apisauce from 'apisauce'
import { URL } from './FixtureApi'

const headers = {
  'Content-Type': 'application/json',
}

const create = (baseURL = URL) => {
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 20000,
  })

  // Users
  const registerUser = (data) => api.post('/users/register', data)
  const sendOtp = (data) => api.post('/users/otp', data)
  const verifyUser = (data) => api.post('/users/verify', data)
  const loginUser = (data) => api.post('/users/login', data)
  const getCurrentUser = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.get('/users/me', data)
  }
  const updateName = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/name', data)
  }
  const updateBirthdate = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/birthdate', data)
  }
  const updateEmail = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/email', data)
  }
  const updatePassword = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/password', data)
  }
  const updatePhoto = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/photo', data)
  }
  const removeNotifToken = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/token', data)
  }
  const updateStatus = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put('/users/update/status', data)
  }

  // Jobs
  const getJobs = () => api.get('/jobs')
  const getJob = (data) => api.get(`/jobs/${data.id}`)

  // Applications
  const createApplication = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.post('/applications', data)
  }
  const getMyApplications = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.get('/applications')
  }
  const getApplication = (data) => api.get(`/applications/${data.id}`)

  // Notifications
  const getMyNotifications = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.get('/notifications')
  }
  const updateNotification = (data) => {
    api.setHeader('Authorization', `Bearer ${data.token}`)
    return api.put(`/notifications/${data.id}`)
  }

  return {
    registerUser,
    sendOtp,
    verifyUser,
    loginUser,
    updateName,
    updateBirthdate,
    updateEmail,
    updatePassword,
    updatePhoto,
    getJobs,
    getJob,
    createApplication,
    getMyApplications,
    getApplication,
    getMyNotifications,
    updateNotification,
    removeNotifToken,
    updateStatus,
    getCurrentUser,
  }
}

export default { create }
