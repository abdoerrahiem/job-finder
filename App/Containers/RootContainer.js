import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import StartupActions from '@Redux/StartupRedux'
import ReduxPersist from '@Config/ReduxPersist'
import AppNavigation from '@Navigation/AppNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import PushNotification, { Importance } from 'react-native-push-notification'
import UserActions from '@Redux/UserRedux'
import { navigate } from '@Navigation/RootNavigation'

// styles
import { apply } from '@Themes/OsmiProvider'

const RootContainer = ({ user, storeToken }) => {
  function configure() {
    PushNotification.createChannel(
      {
        channelId: 'rn-push-notification-channel-id-4-300',
        channelName: '...',
        channelDescription: '...',
        playSound: false,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    )

    PushNotification.configure({
      onRegister: function (token) {
        console.log(token)
        storeToken({ notifToken: token.token })
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification)

        if (notification.userInteraction) {
          if (notification.data.type === 'application') {
            navigate('ApplicationDetailsScreen', {
              id: notification.data.applicationId,
              screen: 'MainScreens',
            })
          }
        }
      },
      senderID: 970247734646,
      popInitialNotification: true,
      requestPermissions: true,
    })
  }

  useEffect(() => {
    if (!ReduxPersist.active) {
      props.startup()
    }

    SplashScreen.hide()
    configure()
  }, [])

  return (
    <SafeAreaView style={apply('flex')}>
      <StatusBar barStyle='dark-content' backgroundColor={apply('white')} />
      <AppNavigation />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  storeToken: (data) => dispatch(UserActions.storeToken(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
