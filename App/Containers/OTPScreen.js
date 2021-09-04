import { useEffect, createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '@Redux/YourRedux'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Styles
import styles from './Styles/OTPScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import RoundedButton from '@Components/RoundedButton'
import Images from '@Images/index'
import UserActions from '@Redux/UserRedux'
import Loader from '@Components/Loader'

const OTPScreen = ({ route, navigation }) => {
  const ref = createRef()
  const { data } = route.params

  const dispatch = useDispatch()
  const { loading, error, user, notifToken, success } = useSelector(
    (state) => state.user
  )

  const [seconds, setSeconds] = useState(30)

  const timer = () => {
    let number = 30

    setInterval(() => {
      if (number === 0) {
        clearInterval()
      } else {
        number = number - 1
        setSeconds(number)
      }
    }, 1000)
  }

  useEffect(() => {
    timer()

    if (error) {
      setTimeout(() => {
        dispatch(UserActions.clearSuccessAndFailure())
      }, 3000)
    }

    if (success) {
      dispatch(UserActions.clearSuccessAndFailure())
      timer()
    }
  }, [error, success])

  const handleSubmit = (otp) => {
    const params = {
      email: data.email,
      otp,
      notifToken,
    }

    dispatch(UserActions.verifyUserRequest(params))
  }

  const handleSendOtp = () => {
    const params = {
      email: data.email,
    }

    dispatch(UserActions.sendOtpRequest(params))
  }

  return (
    <SafeAreaView style={apply('flex bg-white p-3')}>
      {loading && <Loader />}
      <RoundedButton
        image={Images.close}
        extraClass={apply('absolute')}
        onPress={() => navigation.goBack()}
      />
      <View style={apply('flex items-center justify-center px-10')}>
        <Text
          style={apply(
            'font-bold text-description-color text-primary-color text-center mb-3'
          )}
        >
          {data.success}
        </Text>
        <Icon name='email-check' color={apply('primary-color')} size={70} />
        <Text style={apply('font-bold text-primary-color text-heading-5 mt-3')}>
          Input your OTP
        </Text>
        <OTPInputView
          style={apply('h-50 self-center w/90')}
          autoFocusOnLoad={true}
          editable={true}
          pinCount={6}
          keyboardType='default'
          codeInputFieldStyle={apply(
            `w-30 h-50 ${
              error ? 'text-red-color' : 'text-primary-color'
            } font-bold border-0 border-b-2 text-heading-5`
          )}
          codeInputHighlightStyle={apply('border-primary-color')}
          onCodeFilled={handleSubmit}
          onCodeChanged={() => dispatch(UserActions.clearSuccessAndFailure())}
        />
        {error && !error.startsWith('You') && (
          <Text style={apply('text-red-color text-caption mt-5')}>{error}</Text>
        )}
        <TouchableOpacity
          style={apply('mt-5')}
          disabled={seconds > 0}
          onPress={handleSendOtp}
        >
          {seconds > 0 ? (
            <Text style={apply('text-caption text-black')}>
              Resend in (0:{seconds})
            </Text>
          ) : (
            <Text style={apply('text-caption text-primary-color')}>
              Resend Now
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default OTPScreen
