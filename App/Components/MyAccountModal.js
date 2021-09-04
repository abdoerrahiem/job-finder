import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, Modal } from 'react-native'

// Styles
import styles from './Styles/MyAccountModalStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from './Header'
import Button from './Button'

const MyAccountModal = ({
  title,
  children,
  visible,
  handleBack,
  onPress,
  disabled,
}) => {
  return (
    <Modal visible={visible} animationType='slide' onRequestClose={handleBack}>
      <Header title={title} handleBack={handleBack} />
      <Button
        title='Save'
        extraClass='absolute bottom-0 right-0 left-0 m-3'
        onPress={onPress}
        disabled={disabled}
      />
      {children}
    </Modal>
  )
}

// // Prop type warnings
// MyAccountModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// MyAccountModal.defaultProps = {
//   someSetting: false
// }

export default memo(MyAccountModal)
