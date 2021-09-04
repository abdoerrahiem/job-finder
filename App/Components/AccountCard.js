import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Pressable, Image } from 'react-native'

// Styles
import styles from './Styles/AccountCardStyle'
import { apply } from '@Themes/OsmiProvider'
import Images from '@Images/index'

const AccountCard = ({ onPress, image, title, subtitle, Component }) => {
  return (
    <Pressable android_ripple={apply('text-devider-color')} onPress={onPress}>
      <View style={apply('row justify-between p-5')}>
        <View style={apply('row items-center')}>
          <Image
            source={image}
            resizeMode='center'
            style={apply('w-16 h-16 mr-4')}
          />
          <Text style={apply('font-bold text-title')}>{title}</Text>
        </View>
        <View style={apply('row items-center')}>
          <Text style={apply('text-caption text-description-color')}>
            {subtitle}
          </Text>
          {Component ? (
            Component
          ) : (
            <Image
              source={Images.arrowRight}
              resizeMode='center'
              style={apply('w-12 h-12 ml-4')}
            />
          )}
        </View>
      </View>
    </Pressable>
  )
}

// // Prop type warnings
// AccountCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// AccountCard.defaultProps = {
//   someSetting: false
// }

export default memo(AccountCard)
