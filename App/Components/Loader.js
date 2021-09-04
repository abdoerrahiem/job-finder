import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Dimensions, Modal } from 'react-native'
import LottieView from 'lottie-react-native'

// Styles
import styles from './Styles/LoaderStyle'
import { apply } from '@Themes/OsmiProvider'

const { height, width } = Dimensions.get('window')

const Loader = ({ showModal, hideModal }) => {
  return (
    <Modal visible={true} transparent onRequestClose={() => {}}>
      <View
        style={[
          apply(
            `h-${height} w-${width} absolute z-10 justify-center items-center`
          ),
          { backgroundColor: 'rgba(0, 0,0, 0.3)' },
        ]}
      >
        <View style={apply('bg-white rounded-lg p-5')}>
          <LottieView
            source={require('../Images/loading.json')}
            autoPlay
            loop
            style={apply('w-100 h-100')}
          />
        </View>
      </View>
    </Modal>
  )
}

// // Prop type warnings
// Loader.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Loader.defaultProps = {
//   someSetting: false
// }

export default memo(Loader)
