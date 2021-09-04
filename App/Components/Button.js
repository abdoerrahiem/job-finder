import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Pressable } from 'react-native'

// Styles
import { apply } from '@Themes/OsmiProvider'

const Button = ({
  title,
  backgroundColor,
  textColor,
  disabled,
  onPress,
  rippleColor,
  extraClass,
  ...otherProps
}) => {
  return (
    <View
      style={apply(
        `${
          backgroundColor && !disabled
            ? backgroundColor
            : disabled
            ? 'bg-description-color'
            : 'bg-primary-color'
        } rounded-14 overflow-hidden ${extraClass}`
      )}
    >
      <Pressable
        style={apply('justify-center items-center py-4')}
        android_ripple={apply(
          `${rippleColor ? rippleColor : 'text-devider-color'}`
        )}
        onPress={onPress}
        disabled={disabled}
        {...otherProps}
      >
        <Text
          style={apply(
            `${
              textColor ? textColor : 'text-white-color'
            } text-button font-bold`
          )}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  )
}

// // Prop type warnings
// Button.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Button.defaultProps = {
//   someSetting: false
// }

export default memo(Button)
