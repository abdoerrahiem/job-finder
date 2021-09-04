import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Pressable, Image } from 'react-native'
import moment from 'moment'

// Styles
import styles from './Styles/MessageCardStyle'
import { apply } from '@Themes/OsmiProvider'
import Images from '@Images/index'

const MessageCard = ({ handlePress }) => {
  return (
    <Pressable
      android_ripple={apply('text-devider-color')}
      onPress={handlePress}
    >
      <View
        style={apply('row items-start border-b-1 border-devider-color p-4')}
      >
        <Image
          source={Images.profile}
          resizeMode='center'
          style={apply('w-50 h-50 rounded-full')}
        />
        <View style={apply('flex ml-4')}>
          <View style={apply('row items-center')}>
            <Text style={apply('flex font-bold text-title -mt-1')}>
              Abdur Rahim
            </Text>
            <Text style={apply('text-caption text-description-color')}>
              22:30
            </Text>
            {/* {!isRead && ( */}
            {/* <View style={apply('w-8 h-8 bg-primary-color rounded-full mr-4')} /> */}
            {/* )} */}
          </View>
          <View style={apply('row')}>
            <Text style={apply('flex text-caption my-1 leading-text-caption')}>
              Hai kamu apa kabar?
            </Text>
            <View
              style={apply(
                'w-25 h-25 rounded-full bg-primary-color justify-center items-center'
              )}
            >
              <Text style={apply('text-button-link text-white')}>3</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

// // Prop type warnings
// MessageCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// MessageCard.defaultProps = {
//   someSetting: false
// }

export default memo(MessageCard)
