import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Image, Pressable } from 'react-native'

// Styles
import styles from './Styles/JobCardStyle'
import { apply } from '@Themes/OsmiProvider'
import { formatMoney } from '@Lib/TextUtils'

const JobCard = ({ item, index, onPress, length }) => {
  const positions = [...item.positions]
  positions.length = positions.length > 3 ? 3 : positions.length

  return (
    <View
      style={apply(
        `${
          length % index === 0 ? 'bg-primary-color' : 'bg-red-color'
        } rounded-14 mx-2 overflow-hidden`
      )}
    >
      <Pressable android_ripple={apply('text-devider-color')} onPress={onPress}>
        <View style={apply('p-3 h-168 w-271')}>
          <View style={apply('row items-start')}>
            <Image
              source={{ uri: item.image }}
              resizeMode='center'
              style={apply('h-40 w-40')}
            />
            <View style={apply('ml-3')}>
              <Text style={apply('text-white font-bold text-title mb-1')}>
                {item.title}
              </Text>
              <Text style={apply('text-description-color text-caption mb-2')}>
                {item.company}
              </Text>
              <View style={apply('row')}>
                {positions.map((position) => (
                  <View
                    key={position._id}
                    style={apply(
                      `mr-2 ${
                        length % index === 0
                          ? 'bg-primary2-color'
                          : 'bg-red2-color'
                      } rounded-lg p-1`
                    )}
                  >
                    <Text style={apply('text-caption text-white')}>
                      {position.position}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View
            style={[
              apply('row absolute bottom-0 self-center py-5 pl-2'),
              { width: '100%' },
            ]}
          >
            <Text style={apply('text-white text-caption flex')}>
              {item.location}
            </Text>
            <Text style={apply('text-white text-caption')}>
              ${formatMoney(item.salary)} / month
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

// // Prop type warnings
// JobCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// JobCard.defaultProps = {
//   someSetting: false
// }

export default memo(JobCard)
