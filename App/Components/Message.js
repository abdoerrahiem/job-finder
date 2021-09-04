import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TextInput, Pressable } from 'react-native'

// Styles
import styles from './Styles/MessageStyle'
import { apply } from '@Themes/OsmiProvider'
import RoundedButton from './RoundedButton'

const Message = (props) => {
  return (
    <View style={apply('flex bg-white')}>
      <View
        style={apply(
          'bg-blue-color w-100 items-center justify-center self-center rounded-lg p-2 my-1'
        )}
      >
        <Text style={apply('text-caption text-black')}>Yesterday</Text>
      </View>
      <View
        style={[
          apply('border border-primary-color rounded-lg p-3 m-2 self-left'),
          { maxWidth: '50%' },
        ]}
      >
        <Text style={apply('text-black text-caption')}>
          Hallo, apa kabar? aku harap kamu baik-baik saja
        </Text>
        <Text
          style={apply(
            'absolute text-caption bottom-3 right-4 text-description-color'
          )}
        >
          22:10
        </Text>
      </View>

      <View
        style={[
          apply('border border-secondary-color rounded-lg p-3 m-2 self-end'),
          { maxWidth: '50%' },
        ]}
      >
        <Text style={apply('text-black text-caption')}>
          Hallo, apa kabar? aku harap kamu baik-baik saja
        </Text>
        <Text
          style={apply(
            'absolute text-caption bottom-3 right-4 text-description-color'
          )}
        >
          22:10
        </Text>
      </View>
    </View>
  )
}

// // Prop type warnings
// Message.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Message.defaultProps = {
//   someSetting: false
// }

export default memo(Message)
