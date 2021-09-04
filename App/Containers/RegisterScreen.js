import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { Formik } from 'formik'
import CheckBox from '@react-native-community/checkbox'

// Styles
import styles from './Styles/LoginScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Logo from '@Components/Logo'
import FormField from '@Components/Forms/FormField'
import Button from '@Components/Button'
import Loader from '@Components/Loader'
import UserActions from '@Redux/UserRedux'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.user)

  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (success) {
      const data = { success, email }
      navigation.navigate('OTPScreen', { data })
      dispatch(UserActions.clearSuccessAndFailure())
    }
  }, [success])

  const handleSubmit = ({ name, email, password }) => {
    dispatch(UserActions.clearSuccessAndFailure())

    const data = {
      name,
      email,
      password,
    }

    setEmail(email)

    dispatch(UserActions.registerUserRequest(data))
  }

  return (
    <SafeAreaView style={apply('flex bg-white-color')}>
      {loading && <Loader />}
      <Formik
        initialValues={{ name: '', email: '', password: '', checked: false }}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue }) => {
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
                      Create Account
                    </Text>
                    <Text
                      style={apply(
                        'text-description leading-description text-description-color text-center'
                      )}
                    >
                      Hello, You can start using the application after sign up
                    </Text>
                  </View>
                  <FormField
                    name='name'
                    placeholder='Name'
                    autoCapitalize='words'
                  />
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
                    error={error}
                    clearError={() =>
                      dispatch(UserActions.clearSuccessAndFailure())
                    }
                  />
                  <View style={apply('row items-center my-2 -left-3')}>
                    <CheckBox
                      disabled={false}
                      value={values.checked}
                      onValueChange={() =>
                        setFieldValue('checked', !values.checked)
                      }
                      tintColors={{ true: '#475BD8', false: '#475BD8' }}
                    />
                    <Text style={apply('text-description-color text-caption')}>
                      I agree with{' '}
                      <Text style={apply('text-primary-color font-bold')}>
                        Terms
                      </Text>{' '}
                      and{' '}
                      <Text style={apply('text-primary-color font-bold')}>
                        Conditions
                      </Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={apply('bg-white absolute bottom-0 w/100 p-5')}>
                <Button
                  title='Create Account'
                  disabled={
                    errors.name ||
                    errors.email ||
                    errors.password ||
                    !values.checked
                  }
                  onPress={() => handleSubmit(values)}
                />
                <View style={apply('row justify-center items-center my-4')}>
                  <Text
                    style={apply('text-description-color text-caption mr-1')}
                  >
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                  >
                    <Text
                      style={apply('font-bold text-primary-color text-caption')}
                    >
                      Sign In
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

export default RegisterScreen
