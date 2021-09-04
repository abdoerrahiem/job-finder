import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/HeaderStyle'
import { apply } from '@Themes/OsmiProvider'
import RoundedButton from './RoundedButton'
import Images from '@Images/index'

const Header = ({ title, image, onPress, handleBack, Image }) => {
  const { goBack } = useNavigation()

  return (
    <View style={apply('bg-white border-b-1 border-devider-color row p-3')}>
      <View style={apply('row items-center flex')}>
        <RoundedButton
          image={Images.arrowLeft}
          extraClass='w-14 h-14'
          onPress={() => (handleBack ? handleBack() : goBack())}
        />
        {Image && Image}
        <Text style={apply('font-bold text-description ml-1')}>{title}</Text>
      </View>
      {image && (
        <RoundedButton image={image} onPress={onPress} extraClass='w-16 h-20' />
      )}
    </View>
  )
}

// // Prop type warnings
// Header.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Header.defaultProps = {
//   someSetting: false
// }

export default memo(Header)
