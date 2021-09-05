import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import ApplicationActions from '@Redux/ApplicationRedux'
import UserActions from '@Redux/UserRedux'

// Styles
import styles from './Styles/WebScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Loader from '@Components/Loader'

const WebScreen = ({ route, navigation }) => {
  const title = route.params.title
  const html = route.params.html
  const handleFunc = route.params.handleFunc
  const item = route.params.item

  const dispatch = useDispatch()
  const { loading, success, error, applications } = useSelector(
    (state) => state.applications
  )
  const { user, loading: userLoading } = useSelector((state) => state.user)

  useEffect(() => {
    if (success) {
      navigation.navigate('SuccessScreen', {
        item,
      })

      const data = { token: user.token }

      dispatch(ApplicationActions.clearSuccessAndFailure())
      dispatch(UserActions.getCurrentUserRequest(data))
    }
  }, [success])

  return (
    <>
      {loading && <Loader />}
      {userLoading && <Loader />}
      <Header title={title} />
      <WebView
        source={{ html }}
        onNavigationStateChange={(e) => {
          if (
            !e.loading &&
            e.url.includes(
              'https://job-finder-indo.herokuapp.com/payment/success'
            )
          ) {
            handleFunc()
          }
        }}
      />
    </>
  )
}

export default WebScreen
