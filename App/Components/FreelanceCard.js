import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Image, Pressable } from 'react-native'

// Styles
import styles from './Styles/FreelanceCardStyle'
import { apply } from '@Themes/OsmiProvider'

const FreelanceCard = ({ item, onPress, index, length }) => {
  const positions = [...item.positions]
  positions.length = positions.length > 2 ? 2 : positions.length

  return (
    <View
      style={apply(
        `${
          length % index === 0 ? 'bg-red2-color' : 'bg-blue-color'
        } rounded-14 mx-2 overflow-hidden`
      )}
    >
      <Pressable android_ripple={apply('text-devider-color')} onPress={onPress}>
        <View style={apply('p-3 h-94 w-196 row')}>
          <Image
            source={{ uri: item.image }}
            resizeMode='center'
            style={apply('w-30 h-30')}
          />
          <View style={apply('ml-2 flex')}>
            <Text style={apply('text-small')}>{item.company}</Text>
            <Text style={apply('font-bold text-caption mt-1 mb-2')}>
              {item.title}
            </Text>
            <View style={apply('row')}>
              {positions.map((position) => (
                <Text
                  key={position._id}
                  style={apply('text-caption font-bold text-info-color mr-2')}
                >
                  {position.position}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

// // Prop type warnings
// FreelanceCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// FreelanceCard.defaultProps = {
//   someSetting: false
// }

export default memo(FreelanceCard)
