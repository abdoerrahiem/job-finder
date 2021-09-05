import { memo } from 'react'
// import PropTypes from 'prop-types'
import { StatusBar } from 'react-native'

// Styles
import styles from './Styles/StatusbarStyle'
import { apply } from '@Themes/OsmiProvider'

const Statusbar = ({ backgroundColor }) => (
  <StatusBar barStyle='light-content' backgroundColor={backgroundColor} />
)

// // Prop type warnings
// Statusbar.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// Statusbar.defaultProps = {
//   someSetting: false
// }

export default memo(Statusbar)
