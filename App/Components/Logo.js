import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

// Styles
import { apply } from '@Themes/OsmiProvider'

const Logo = (props) => {
  return (
    <View
      style={apply(
        'w-60 h-60 bg-primary-color rounded-12 justify-center items-center'
      )}
    >
      <Text style={apply('text-heading-3 text-white-color font-bold')}>JF</Text>
    </View>
  )
}

// // Prop type warnings
// Logo.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Logo.defaultProps = {
//   someSetting: false
// }

export default memo(Logo)
