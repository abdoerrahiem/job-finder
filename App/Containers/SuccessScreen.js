import { connect } from 'react-redux'
import { useEffect } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

// Styles
import styles from './Styles/SuccessScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Images from '@Images/index'
import Button from '@Components/Button'

const SuccessScreen = ({ navigation, route }) => {
  const item = route.params.item

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ApplicationScreen')
    }, 8000)
  }, [])

  return (
    <SafeAreaView style={apply('flex bg-white justify-center items-center')}>
      <View style={apply('px-1 w/100')}>
        <LottieView
          source={require('../Images/success.json')}
          autoPlay
          loop
          style={apply('w-100 h-100 self-center')}
        />
        <Text style={apply('font-bold text-heading-2 my-3 text-center')}>
          Success
        </Text>
        <Text
          style={apply(
            'text-description text-description-color text-center mb-10 leading-heading-5'
          )}
        >
          Your applying to{' '}
          <Text style={apply('font-bold text-primary-color')}>
            {item.company}
          </Text>{' '}
          as{' '}
          <Text style={apply('font-bold text-primary-color')}>
            {item.title}
          </Text>{' '}
          has send
        </Text>
        <Button
          title='Explore Jobs'
          onPress={() => navigation.navigate('HomeScreen')}
          extraClass='mx-2'
        />
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SuccessScreen)
