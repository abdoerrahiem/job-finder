import { memo, useState, useEffect, createRef } from 'react'
// import PropTypes from 'prop-types'
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native'
import countries from '@Lib/countries.json'

// Styles
import styles from './Styles/CountryModalStyle'
import { apply } from '@Themes/OsmiProvider'

const CountryModal = ({ handleClose, handleChange }) => {
  const ref = createRef()
  const [text, setText] = useState('')
  const [iniCountries, setInitCountries] = useState(countries)

  useEffect(() => setTimeout(() => ref.current.focus(), 100), [])

  useEffect(() => {
    if (text) {
      setInitCountries(
        countries.filter((ctr) =>
          ctr.name.toLowerCase().includes(text.toLowerCase())
        )
      )
    } else {
      setInitCountries(countries)
    }
  }, [text])

  const _renderItem = ({ item }) => (
    <Pressable
      android_ripple={apply('text-description-color')}
      style={apply('row p-4 items-center')}
      onPress={() => {
        handleChange(item)
        handleClose()
      }}
    >
      <View style={apply('flex row items-center')}>
        <Image
          source={{ uri: item.flag }}
          style={apply('w-25 h-25 mr-3')}
          resizeMode='center'
        />
        <Text style={apply('text-description')}>{item.name}</Text>
      </View>
      <Text style={apply('text-description text-description-color')}>
        {item.dialCode}
      </Text>
    </Pressable>
  )

  return (
    <Modal style={apply('')} animationType='slide' onRequestClose={handleClose}>
      <TextInput
        ref={ref}
        style={apply(
          'border-b-1 border-devider-color text-primary-color p-4 text-description'
        )}
        placeholder='Search Country...'
        placeholderTextColor={apply('description-color')}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <FlatList
        data={iniCountries}
        keyExtractor={(item) => item.isoCode}
        initialNumToRender={5}
        renderItem={_renderItem}
      />
    </Modal>
  )
}

// // Prop type warnings
// CountryModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// CountryModal.defaultProps = {
//   someSetting: false
// }

export default memo(CountryModal)
