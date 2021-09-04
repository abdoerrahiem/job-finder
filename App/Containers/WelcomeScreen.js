import { connect } from 'react-redux'
import { StatusBar, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Logo from '@Components/Logo'
import Button from '@Components/Button'
import Images from '@Images/index'

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={apply('flex bg-white')}>
      <StatusBar barStyle='dark-content' backgroundColor={apply('white')} />
      <View style={apply('flex px-5 pt-12')}>
        <Logo />
        <Image
          source={Images.welcome}
          resizeMode='center'
          style={apply('w-320 h-180 self-center mt-16 mb-10')}
        />
        <Text style={apply('text-heading-3 text-black-color font-bold mb-3')}>
          Welcome Job Hunter
        </Text>
        <Text
          style={apply(
            'text-description text-description-color leading-description'
          )}
        >
          I'm happy to see you, let's explore new dream jobs for your career
        </Text>
        <View style={apply('absolute bottom-0 w/100 py-10 px-5')}>
          <Button
            title='Start Explore Jobs'
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  isFingerprint: () => state.user.isFingerprint,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
