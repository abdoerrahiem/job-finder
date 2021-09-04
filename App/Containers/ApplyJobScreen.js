import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import ApplicationActions from '@Redux/ApplicationRedux'
import UserActions from '@Redux/UserRedux'

// Styles
import styles from './Styles/ApplyJobScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Images from '@Images/index'
import Button from '@Components/Button'
import RoundedButton from '@Components/RoundedButton'
import DocumentPicker from 'react-native-document-picker'
import Loader from '@Components/Loader'
import DefaultModal from '@Components/DefaultModal'
import RNLocation from 'react-native-location'
import { URL } from '@Services/FixtureApi'
import countries from '@Lib/countries.json'
import CountryModal from '@Components/CountryModal'

const ApplyJobScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState('')
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [appCount, setAppCount] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [initialContries, setInitialCountries] = useState(countries)
  const [country, setCountry] = useState(null)
  const [showCountryModal, setShowCountryModal] = useState(false)

  const { item } = route.params

  const dispatch = useDispatch()
  const { loading, success, error, applications } = useSelector(
    (state) => state.applications
  )
  const { user } = useSelector((state) => state.user)

  RNLocation.configure({
    distanceFilter: 5.0,
  })

  const getLocation = async () => {
    const permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    })

    if (permission) {
      const { longitude, latitude } = await RNLocation.getLatestLocation({
        timeout: 100,
      })

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJkb2VycmFoaWVtIiwiYSI6ImNrNWgxeHBqdjBlNGQzbW53cmc0emhoOHUifQ.kacSGFUFh6X9UXmzGlGqVQ`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.features[0].place_name)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    const data = {
      token: user.token,
    }

    getLocation()
    dispatch(ApplicationActions.getMyApplicationsRequest(data))

    setCountry(initialContries.filter((ctr) => ctr.name === 'Indonesia')[0])
  }, [])

  useEffect(() => {
    if (success) {
      navigation.navigate('SuccessScreen', {
        item,
      })

      const data = {
        token: user.token,
      }

      dispatch(ApplicationActions.clearSuccessAndFailure())
      dispatch(ApplicationActions.getMyApplicationsRequest(data))
      dispatch(UserActions.getCurrentUserRequest(data))
    }

    if (applications?.length > 0) {
      let applicationCount = []

      let date = new Date()
      const tahun = date.getFullYear()
      let bulan = date.getMonth() + 1
      bulan = bulan.toString().length === 1 ? `0${bulan}` : bulan
      let hari = date.getDate()
      hari = hari.toString().length === 1 ? `0${hari}` : hari
      date = `${tahun}-${bulan}-${hari}`

      applicationCount = applications.filter(
        (app) => app.createdAt.split('T')[0] === date
      )
      setAppCount(applicationCount)
    }
  }, [success, applications])

  const handleOpenFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })

      setFileName(res[0].name)
      setFile(res[0])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('canceled')
      } else {
        console.log(err)
      }
    }
  }

  const createAppUser = () => {
    setUploading(true)

    const data = new FormData()
    data.append('file', file)
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
          phone: `${country.dialCode}${phone}`,
          appLetter: text,
          location,
          resume: secure_url,
          jobId: item._id,
          status: 'review',
        }

        setUploading(false)

        dispatch(ApplicationActions.createApplicationRequest(data))
      })
      .catch((err) => console.log(err))
  }

  const handleApply = () => {
    if (appCount.length > 2 && !user.isPaid) {
      setShowModal(true)
    } else if (phone.includes(country.dialCode)) {
      ToastAndroid.show(
        'Do not include your country dial code',
        ToastAndroid.SHORT
      )
    } else {
      createAppUser()
    }
  }

  const handleConfirm = async () => {
    setPaymentLoading(true)

    const initData = {
      orderId: `item._id-${Math.random()}`,
      amount: 50000,
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1],
      email: user.email,
      phone,
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.post(`${URL}/users/payment`, initData, config)

    setPaymentLoading(false)

    const clientKey = 'SB-Mid-client-UFhmB8bM-5UomS4o'

    if (data) {
      setShowModal(false)
      navigation.navigate('WebScreen', {
        item,
        handleFunc: () => {
          const data = { token: user.token }
          dispatch(UserActions.updateStatusUserRequest(data))
          createAppUser()
        },
        title: 'Payment',
        html: `
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key="${clientKey}"></script>
        </head>
       
        <body>
          <script>
              window.snap.pay('${data}');
          </script>
        </body>
      </html>
        `,
      })
    }
  }

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {showCountryModal && (
        <CountryModal
          handleClose={() => setShowCountryModal(false)}
          handleChange={(ctr) => setCountry(ctr)}
        />
      )}
      {uploading && <Loader />}
      {loading && <Loader />}
      {showModal && (
        <DefaultModal
          title={
            paymentLoading
              ? 'Wait for a moment...'
              : 'Upgrade your monthly account to apply more!'
          }
          cancelTitle='CANCEL'
          confirmTitle='PROCESS'
          hideModal={() => setShowModal(false)}
          handleConfirm={handleConfirm}
          disabled={paymentLoading}
        />
      )}
      <Header title={uploading ? 'Uploading...' : 'Apply Job'} />
      <ScrollView>
        <View style={apply('px-4 py-8')}>
          <View style={apply('justify-center items-center')}>
            <Image
              source={{ uri: item.image }}
              resizeMode='center'
              style={apply('w-80 h-80')}
            />
            <Text
              style={apply('text-heading-4 text-center leading-heading-3 mx-2')}
            >
              You Will Applying to{' '}
              <Text style={apply('font-bold')}>{item.company}</Text> as{' '}
              <Text style={apply('font-bold')}>{item.title}</Text>
            </Text>
          </View>

          <View style={apply('mt-8 mb-3')}>
            <Text style={apply('font-bold text-title mb-3')}>Resume</Text>
            <View style={apply('border border-primary-color p-4 rounded-lg')}>
              <Text style={apply('font-bold text-caption mb-3')}>
                {fileName ? fileName : 'Press ADD to upload your CV'}
              </Text>
              {location ? (
                <View style={apply('row items-start')}>
                  <Image
                    source={Images.location}
                    resizeMode='center'
                    style={apply('w-25 h-25 top-4')}
                  />
                  <Text
                    style={apply(
                      'text-caption text-description-color my-3 ml-2'
                    )}
                  >
                    {location}
                  </Text>
                </View>
              ) : null}
              <View style={apply('row items-center')}>
                <View style={apply('bg-primary-color rounded mr-2')}>
                  <Pressable
                    android_ripple={apply('text-devider-color')}
                    onPress={handleOpenFile}
                  >
                    <View style={apply('px-5 py-3')}>
                      <Text style={apply('font-bold text-caption text-white')}>
                        {fileName ? 'EDIT' : 'ADD'}
                      </Text>
                    </View>
                  </Pressable>
                </View>
                {fileName ? (
                  <RoundedButton
                    image={Images.delete}
                    extraClass='w-18 h-18'
                    onPress={() => {
                      setFileName('')
                      setFile(null)
                    }}
                  />
                ) : null}
              </View>
            </View>
          </View>

          <View style={apply('mb-10')}>
            <View
              style={apply(
                'row items-center border-b-1 border-devider-color h-60'
              )}
            >
              <View
                style={apply(
                  'bg-devider-color rounded border-1 border-description-color mr-2'
                )}
              >
                <Pressable
                  android_ripple={apply('text-description-color')}
                  onPress={() => setShowCountryModal(true)}
                >
                  <View style={apply('row items-center h-30 px-1')}>
                    <Text style={apply('text-description mr-2')}>
                      {country?.dialCode}
                    </Text>
                    <Image
                      source={{ uri: country?.flag }}
                      resizeMode='center'
                      style={apply('w-21 h-21')}
                    />
                  </View>
                </Pressable>
              </View>
              <TextInput
                numberOfLines={1}
                placeholderTextColor='#DDE5FC'
                placeholder='Your Phone Number'
                style={apply('font-bold text-black text-description flex')}
                keyboardType='phone-pad'
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View
              style={[
                apply('row items-center border-b-1 border-devider-color'),
                { minHeight: 60 },
              ]}
            >
              <TextInput
                multiline
                placeholderTextColor='#DDE5FC'
                placeholder='Application Letter'
                style={apply('font-bold text-black text-description flex')}
                onChangeText={(text) => setText(text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={apply('p-3 border-t-2 border-devider-color')}>
        <Button
          title='Apply Now'
          onPress={handleApply}
          disabled={!phone || !text || !file || uploading}
        />
      </View>
    </SafeAreaView>
  )
}

export default ApplyJobScreen
