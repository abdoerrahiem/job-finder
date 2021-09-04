import { memo, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, BackHandler } from 'react-native'
import LottieView from 'lottie-react-native'

// Styles
import styles from './Styles/NoInternetStyle'
import { apply } from '@Themes/OsmiProvider'
import Statusbar from './Statusbar'
import Button from './Button'

const NoInternet = (props) => {
  return (
    <>
      <View style={apply('flex bg-white justify-center items-center')}>
        <View>
          <Text
            style={apply('font-bold text-heading-6 text-red-color text-center')}
          >
            Oopss, Your connection is lost
          </Text>
          <LottieView
            source={require('../Images/internet.json')}
            autoPlay
            style={apply('w/100 h-350 self-center my-5')}
          />
          <Button
            title='Close'
            backgroundColor='bg-transparent'
            textColor='text-red-color'
            extraClass='border-1 border-red-color w-200 self-center'
            rippleColor='text-red-color'
            onPress={() => BackHandler.exitApp()}
          />
        </View>
      </View>
    </>
  )
}

// // Prop type warnings
// NoInternet.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// NoInternet.defaultProps = {
//   someSetting: false
// }

export default memo(NoInternet)
