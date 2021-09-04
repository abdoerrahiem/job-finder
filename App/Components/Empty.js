import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'

// Styles
import styles from './Styles/EmptyStyle'
import { apply } from '@Themes/OsmiProvider'

const Empty = ({ image, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={apply('px-4')}>
        <Image
          source={image}
          resizeMode='center'
          style={apply('w-250 h-208 self-center')}
        />
        <Text style={apply('font-bold text-heading-2 text-center my-4')}>
          {title}
        </Text>
        <Text
          style={apply(
            'text-description text-description-color leading-text-description text-center'
          )}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  )
}

// // Prop type warnings
// Empty.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Empty.defaultProps = {
//   someSetting: false
// }

export default memo(Empty)
