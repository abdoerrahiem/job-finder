import { useEffect, useRef } from 'react'
import { apply } from '@Themes/OsmiProvider'
import { View, TextInput } from 'react-native'

const Input = ({ width = '100%', styleClass, ...otherProps }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.setNativeProps({
      style: {
        fontFamily: 'default',
      },
    })
  }, [])

  return (
    <View>
      <TextInput
        ref={ref}
        placeholderTextColor='#9CA5BF'
        style={apply(
          `text-description-color text-form border-b-1 border-description-color ${styleClass}`
        )}
        {...otherProps}
      />
    </View>
  )
}

export default Input
