import { apply } from '@Themes/OsmiProvider'
import { View, Text, Pressable, Image } from 'react-native'

const RoundedButton = ({ image, onPress, extraClass, Icon }) => {
  return (
    <View style={apply('w-45 h-45 rounded-full overflow-hidden')}>
      <Pressable
        style={apply('justify-center items-center p-4')}
        android_ripple={apply('text-devider-color')}
        onPress={onPress}
      >
        {Icon ? (
          <View style={apply('w-24 h-24 justify-center items-center')}>
            {Icon}
            <View
              style={[
                apply('w-10 h-10 bg-red-color rounded-full absolute'),
                { top: 0, right: -1 },
              ]}
            />
          </View>
        ) : (
          <Image
            source={image}
            resizeMode='center'
            style={apply(`w-24 h-24 ${extraClass}`)}
          />
        )}
      </Pressable>
    </View>
  )
}

export default RoundedButton
