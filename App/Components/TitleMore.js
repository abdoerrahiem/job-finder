import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

// Styles
import styles from './Styles/TitleMoreStyle'
import { apply } from '@Themes/OsmiProvider'

const TitleMore = ({ title, subTitle, onPress }) => {
  return (
    <View style={apply('row items-center m-3')}>
      <Text style={apply('flex font-bold text-heading-5')}>{title}</Text>
      {subTitle ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={apply('font-bold text-small text-description-color')}>
            {subTitle}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

// // Prop type warnings
// TitleMore.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// TitleMore.defaultProps = {
//   someSetting: false
// }

export default memo(TitleMore)
