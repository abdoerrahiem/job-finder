import { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { apply } from '@Themes/OsmiProvider'
import Button from '@Components/Button'
import Images from '@Images/index'
import MyAccountModal from '@Components/MyAccountModal'
import AccountCard from '@Components/AccountCard'
import Loader from '@Components/Loader'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
import UserActions from '@Redux/UserRedux'
import ApplicationActions from '@Redux/ApplicationRedux'
import BookmarkActions from '@Redux/BookmarkRedux'
import JobActions from '@Redux/JobRedux'
import NotificationActions from '@Redux/NotificationRedux'
import PushNotification from 'react-native-push-notification'

const MyAccountScreen = ({ navigation }) => {
  const [showChangeNameModal, setShowChangeNameModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showChangeBirthdate, setShowChangeBirthdate] = useState(false)
  const [showChangePhoto, setShowChangePhoto] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [photo, setPhoto] = useState('')
  const [uploadLoading, setUploadLoading] = useState(false)

  const dispatch = useDispatch()
  const { user, loading, success, error, isFingerprint } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (success) {
      setShowChangeNameModal(false)
      setShowEmailModal(false)
      setShowChangePasswordModal(false)
      setShowChangeBirthdate(false)
      setShowChangePhoto(false)

      dispatch(UserActions.clearSuccessAndFailure())
    }
  }, [success])

  const handleChangeName = () => {
    const data = {
      name: `${firstName} ${lastName}`,
      token: user.token,
    }
    dispatch(UserActions.updateNameUserRequest(data))
  }

  const handleChangeEmail = () => {
    const data = {
      email,
      token: user.token,
    }

    dispatch(UserActions.updateEmailUserRequest(data))
  }

  const handleChangePassword = () => {
    const data = {
      token: user.token,
      oldPassword,
      newPassword,
    }

    dispatch(UserActions.updatePasswordUserRequest(data))
  }

  const handleChangeBirthdate = (event, selectedDate) => {
    setShowChangeBirthdate(false)

    let date = new Date(selectedDate)
    const tahun = date.getFullYear()
    let bulan = date.getMonth() + 1
    bulan = bulan.toString().length === 1 ? `0${bulan}` : bulan
    let hari = date.getDate()
    hari = hari.toString().length === 1 ? `0${hari}` : hari
    date = `${hari}-${bulan}-${tahun}`

    const data = {
      birthdate: date,
      token: user.token,
    }

    if (event.type === 'set') {
      dispatch(UserActions.updateBirthdateUserRequest(data))
    }
  }

  const handleChangePhoto = async () => {
    setUploadLoading(true)

    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'jobfinder')
    data.append('cloud_name', 'abdoerrahiem')

    fetch('https://api.cloudinary.com/v1_1/abdoerrahiem/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then(({ secure_url }) => {
        const data = {
          token: user.token,
          photo: secure_url,
        }

        setUploadLoading(false)

        dispatch(UserActions.updatePhotoUserRequest(data))
      })
      .catch((err) => console.log(err))
  }

  const handleLogout = () => {
    const data = {
      token: user.token,
    }

    dispatch(UserActions.removeNotifTokenRequest(data))
    dispatch(UserActions.logout())
    dispatch(ApplicationActions.logout())
    dispatch(BookmarkActions.logout())
    dispatch(JobActions.logout())
    dispatch(NotificationActions.logout())
    PushNotification.removeAllDeliveredNotifications()
  }

  const handleFingerprint = () => {
    dispatch(UserActions.setFingerprint({ isFingerprint: !isFingerprint }))

    // dispatch(UserActions.setMounted({ mounted: !isFingerprint }))
  }

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {loading && <Loader />}
      <View style={apply('bg-primary-color p-5')}>
        <Text style={apply('font-bold text-white text-heading-4')}>
          My Account
        </Text>
      </View>

      <Pressable
        android_ripple={apply('text-devider-color')}
        onPress={() => setShowChangePhoto(true)}
      >
        <View style={apply('row items-center p-5')}>
          <View
            style={apply(
              'rounded-full w-72 h-72 border-1 border-devider-color overflow-hidden'
            )}
          >
            <Image
              source={{
                uri: user?.photo
                  ? user.photo
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
              resizeMode='center'
              style={[apply(''), { width: '100%', height: '100%' }]}
            />
          </View>
          <View style={apply('ml-3')}>
            <Text style={apply('font-bold text-heading-6 mb-1')}>
              {user?.name}
            </Text>
            <Text style={apply('text-caption text-description-color')}>
              {user?.email}
            </Text>
          </View>
        </View>
      </Pressable>

      <AccountCard
        onPress={() => setShowChangeNameModal(true)}
        image={Images.account}
        title='Name'
        subtitle={user?.name}
      />
      <AccountCard
        onPress={() => setShowChangeBirthdate(true)}
        image={Images.calendar}
        title='Birthdate'
        subtitle={user?.birthdate}
      />
      <AccountCard
        onPress={() => setShowEmailModal(true)}
        image={Images.message}
        title='Email'
        subtitle={user?.email}
      />
      <AccountCard
        onPress={() => setShowChangePasswordModal(true)}
        image={Images.lock}
        title='Change Password'
        subtitle='**********'
      />
      <AccountCard
        onPress={handleFingerprint}
        image={Images.fingerPrint}
        title='Fingerprint Lock'
        subtitle={isFingerprint ? 'Active' : 'Not Active'}
        Component={
          <Switch
            style={apply('ml-2')}
            trackColor={{
              false: apply('red2-color'),
              true: apply('primary2-color'),
            }}
            thumbColor={
              isFingerprint ? apply('primary-color') : apply('red-color')
            }
            ios_backgroundColor='#3e3e3e'
            onValueChange={handleFingerprint}
            value={isFingerprint}
          />
        }
      />

      <MyAccountModal
        title='Change Name'
        visible={showChangeNameModal}
        handleBack={() => setShowChangeNameModal(false)}
        onPress={handleChangeName}
        disabled={!firstName || !lastName}
      >
        <View style={apply('px-4 mt-10')}>
          <View
            style={apply(
              'row items-center border-b-1 border-devider-color h-60'
            )}
          >
            <TextInput
              placeholderTextColor={apply('description-color')}
              placeholder='First Name'
              style={apply(
                'font-bold text-description-color text-description flex'
              )}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          <View
            style={apply(
              'row items-center border-b-1 border-devider-color h-60'
            )}
          >
            <TextInput
              placeholderTextColor={apply('description-color')}
              placeholder='Last Name'
              style={apply(
                'font-bold text-description-color  text-description flex'
              )}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
        </View>
      </MyAccountModal>

      <MyAccountModal
        title='Change Email'
        visible={showEmailModal}
        handleBack={() => setShowEmailModal(false)}
        onPress={handleChangeEmail}
        disabled={!email}
      >
        <View style={apply('px-4 mt-10')}>
          <View
            style={apply(
              `row items-center border-b-1 ${
                error ? 'border-red-color' : 'border-devider-color'
              } h-60`
            )}
          >
            <TextInput
              name='email'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              textContentType='emailAddress'
              placeholderTextColor={apply('description-color')}
              placeholder='Email'
              style={apply(
                `font-bold ${
                  error ? 'text-red-color' : 'text-description-color'
                } text-description flex`
              )}
              value={email}
              onChangeText={(text) => {
                dispatch(UserActions.clearSuccessAndFailure())
                setEmail(text)
              }}
            />
          </View>
          {error && (
            <Text style={apply('text-red-color text-caption mt-2')}>
              {error}
            </Text>
          )}
        </View>
      </MyAccountModal>

      <MyAccountModal
        title='Change Password'
        visible={showChangePasswordModal}
        handleBack={() => setShowChangePasswordModal(false)}
        onPress={handleChangePassword}
        disabled={
          !oldPassword ||
          !newPassword ||
          !confirmPassword ||
          newPassword !== confirmPassword
        }
      >
        <View style={apply('px-4 mt-10')}>
          <View
            style={apply(
              `row items-center border-b-1 ${
                error ? 'border-red-color' : 'border-devider-color'
              } h-60`
            )}
          >
            <TextInput
              secureTextEntry
              autoCapitalize='none'
              textContentType='password'
              placeholderTextColor={apply('description-color')}
              placeholder='Old Password'
              style={apply(
                `font-bold ${
                  error ? 'text-red-color' : 'text-description-color'
                } text-description flex`
              )}
              onChangeText={(text) => {
                dispatch(UserActions.clearSuccessAndFailure())
                setOldPassword(text)
              }}
            />
          </View>
          <View
            style={apply(
              `row items-center border-b-1 ${
                error ? 'border-red-color' : 'border-devider-color'
              } h-60`
            )}
          >
            <TextInput
              secureTextEntry
              autoCapitalize='none'
              textContentType='password'
              placeholderTextColor={apply('description-color')}
              placeholder='New Password'
              style={apply(
                `font-bold ${
                  error ? 'text-red-color' : 'text-description-color'
                } text-description flex`
              )}
              onChangeText={(text) => {
                dispatch(UserActions.clearSuccessAndFailure())
                setNewPassword(text)
              }}
            />
          </View>
          <View
            style={apply(
              `row items-center border-b-1 ${
                error ? 'border-red-color' : 'border-devider-color'
              } h-60`
            )}
          >
            <TextInput
              secureTextEntry
              autoCapitalize='none'
              textContentType='password'
              placeholderTextColor={apply('description-color')}
              placeholder='Confirm Password'
              style={apply(
                `font-bold ${
                  error ? 'text-red-color' : 'text-description-color'
                } text-description flex`
              )}
              onChangeText={(text) => {
                dispatch(UserActions.clearSuccessAndFailure())
                setConfirmPassword(text)
              }}
            />
          </View>
          {newPassword && confirmPassword && newPassword !== confirmPassword ? (
            <Text style={apply('text-red-color text-caption mt-2')}>
              Password not match
            </Text>
          ) : null}
          {error && (
            <Text style={apply('text-red-color text-caption mt-2')}>
              {error}
            </Text>
          )}
        </View>
      </MyAccountModal>

      {showChangeBirthdate && (
        <DateTimePicker
          testID='dateTimePicker'
          value={new Date()}
          mode='date'
          is24Hour={true}
          display='calendar'
          onChange={handleChangeBirthdate}
        />
      )}

      <MyAccountModal
        title={uploadLoading ? 'Uploading your photo...' : 'Change Photo'}
        visible={showChangePhoto}
        handleBack={() => setShowChangePhoto(false)}
        onPress={handleChangePhoto}
        disabled={!photo || uploadLoading}
      >
        <Modal
          isVisible={showModal}
          onBackButtonPress={() => setShowModal(false)}
          onBackdropPress={() => setShowModal(false)}
        >
          <View style={apply('bg-white rounded p-5')}>
            <Text style={apply('font-bold text-description mb-5')}>
              Choose Photo
            </Text>
            <View style={apply('row justify-end')}>
              <TouchableOpacity
                onPress={() => {
                  setPhoto('')
                  setShowModal(false)
                }}
              >
                <Text style={apply('text-description text-red-color mr-5')}>
                  DELETE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openCamera({
                    width: 400,
                    height: 400,
                    cropping: true,
                  }).then((image) => {
                    const newFile = {
                      uri: image.path,
                      type: image.mime,
                      name: `${image.path}`,
                    }

                    setPhoto(newFile)
                  })

                  setShowModal(false)
                }}
              >
                <Text style={apply('text-description text-primary-color mr-5')}>
                  CAMERA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 400,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.5,
                  }).then((image) => {
                    const newFile = {
                      uri: image.path,
                      type: image.mime,
                      name: `${image.path}`,
                    }

                    setPhoto(newFile)
                  })

                  setShowModal(false)
                }}
              >
                <Text style={apply('text-description text-primary-color')}>
                  GALLERY
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={apply('px-4 mt-10')}>
          <View
            style={apply(
              'h-150 w-150 rounded-full self-center border-1 border-description-color overflow-hidden'
            )}
          >
            <Pressable
              android_ripple={apply('text-description-color')}
              onPress={() => setShowModal(true)}
            >
              <View style={apply('h-150 w-150 justify-center items-center')}>
                {photo ? (
                  <Image
                    source={{ uri: photo.uri }}
                    resizeMode='center'
                    style={apply('h-150 w-150')}
                  />
                ) : (
                  <Icon name='camera' size={50} />
                )}
              </View>
            </Pressable>
          </View>

          {photo ? (
            <View style={apply('bg-secondary-color rounded-lg py-3 m-5')}>
              <Icon
                name='checkbox-marked-circle-outline'
                size={30}
                color={apply('secondary-color')}
                style={[
                  apply('absolute self-center bg-white rounded-full'),
                  { top: -15 },
                ]}
              />
              <Text
                style={apply(
                  'font-bold text-center text-title text-white mt-1'
                )}
              >
                Your photo looks nice...
              </Text>
            </View>
          ) : null}
        </View>
      </MyAccountModal>

      <Button
        title='Log Out'
        backgroundColor='bg-transparent'
        textColor='text-error-color'
        extraClass='border border-error-color absolute bottom-0 right-0 left-0 m-5'
        onPress={handleLogout}
      />
    </SafeAreaView>
  )
}

export default MyAccountScreen
