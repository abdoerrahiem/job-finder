import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Styles
import styles from './Styles/LoginScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Logo from '@Components/Logo'
import FormField from '@Components/Forms/FormField'
import Button from '@Components/Button'
import Loader from '@Components/Loader'
import UserActions from '@Redux/UserRedux'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { loading, error, user, notifToken } = useSelector(
    (state) => state.user
  )

  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (error?.startsWith('You')) {
      const data = {
        success: error,
        email,
      }
      navigation.navigate('OTPScreen', { data })
    }
  }, [error])

  const handleSubmit = ({ email, password }) => {
    dispatch(UserActions.clearSuccessAndFailure())

    const data = {
      email,
      password,
      notifToken,
    }

    setEmail(email)

    dispatch(UserActions.loginUserRequest(data))
  }

  return (
    <SafeAreaView style={apply('flex bg-white-color')}>
      {loading && <Loader />}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => {
          return (
            <>
              <ScrollView contentContainerStyle={apply('pb-48')}>
                <View style={apply('p-4')}>
                  <View style={apply('justify-center items-center my-8')}>
                    <Logo />
                    <Text
                      style={apply(
                        'font-bold text-heading-2 leading-heading-2 text-black-color mb-2 mt-4'
                      )}
                    >
                      Welcome Back
                    </Text>
                    <Text
                      style={apply(
                        'text-description leading-description text-description-color text-center'
                      )}
                    >
                      I'm happy to see you again
                    </Text>
                  </View>
                  <FormField
                    name='email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    placeholder='Email'
                    textContentType='emailAddress'
                  />
                  <FormField
                    name='password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry
                    error={error && !error.startsWith('You') && error}
                    clearError={() =>
                      dispatch(UserActions.clearSuccessAndFailure())
                    }
                  />
                </View>
              </ScrollView>
              <View style={apply('bg-white absolute bottom-0 w/100 p-5')}>
                <Button
                  title='Sign In'
                  disabled={
                    !values.email ||
                    !values.password ||
                    errors.email ||
                    errors.password
                  }
                  onPress={() => handleSubmit(values)}
                />
                <View style={apply('row justify-center items-center my-4')}>
                  <Text
                    style={apply('text-description-color text-caption mr-1')}
                  >
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                  >
                    <Text
                      style={apply('font-bold text-primary-color text-caption')}
                    >
                      Create account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )
        }}
      </Formik>
    </SafeAreaView>
  )
}

export default LoginScreen
