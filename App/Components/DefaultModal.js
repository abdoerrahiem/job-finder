import { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

// Styles
import styles from './Styles/DefaultModalStyle'
import { apply } from '@Themes/OsmiProvider'

const DefaultModal = ({
  hideModal,
  title,
  cancelTitle,
  confirmTitle,
  handleConfirm,
  disabled,
}) => {
  return (
    <Modal
      isVisible
      backdropOpacity={0.5}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
    >
      <View style={apply('bg-white rounded p-4')}>
        <Text style={apply('text-title mb-4 leading-heading-5')}>{title}</Text>
        <View style={apply('row justify-end')}>
          <TouchableOpacity onPress={hideModal}>
            <Text style={apply('text-title text-red-color mr-8')}>
              {cancelTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} disabled={disabled}>
            <Text style={apply('text-title text-primary-color')}>
              {confirmTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

// // Prop type warnings
// DefaultModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// DefaultModal.defaultProps = {
//   someSetting: false
// }

export default memo(DefaultModal)
