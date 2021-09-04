import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Image, Pressable } from 'react-native'

// Styles
import styles from './Styles/PostCardStyle'
import { apply } from '@Themes/OsmiProvider'

const PostCard = ({ item, onPress, index, length }) => {
  const positions = [...item.positions]
  positions.length = positions.length > 2 ? 2 : positions.length

  return (
    <View
      style={[
        apply(
          `${
            length % index === 0 ? 'bg-red2-color' : 'bg-blue-color'
          } rounded-14 m-2 overflow-hidden`
        ),
        {
          width: '45%',
        },
      ]}
    >
      <Pressable android_ripple={apply('text-devider-color')} onPress={onPress}>
        <View style={apply('p-3 h-164')}>
          <Image
            source={{ uri: item.image }}
            resizeMode='contain'
            style={apply('h-40 w-100 self-center')}
          />
          <Text style={apply('my-4 font-bold text-title')}>{item.title}</Text>
          <Text style={apply('font-bold text-small mb-1')}>
            {item.experience} Experience
          </Text>
          <View style={apply('row')}>
            {positions.map((position) => (
              <Text
                key={position._id}
                style={apply('mr-2 text-caption text-description-color')}
              >
                {position.position}
              </Text>
            ))}
          </View>
        </View>
      </Pressable>
    </View>
  )
}

// // Prop type warnings
// PostCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// PostCard.defaultProps = {
//   someSetting: false
// }

export default memo(PostCard)
