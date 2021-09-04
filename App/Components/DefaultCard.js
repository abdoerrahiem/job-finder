import { memo, useEffect, useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/DefaultCardStyle'
import { apply } from '@Themes/OsmiProvider'
import { timeSince } from '@Lib/TextUtils'
import NotificationActions from '@Redux/NotificationRedux'

const DefaultCard = ({ item }) => {
  const [isRead, setIsRead] = useState(false)

  const { navigate } = useNavigation()

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { error, loading, notification } = useSelector(
    (state) => state.notifications
  )

  useEffect(() => {
    if (item.isRead) {
      setIsRead(true)
    }
  }, [item])

  const handlePress = () => {
    setIsRead(true)

    navigate('ApplicationDetailsScreen', {
      id: item.application,
      screen: 'NotificationScreen',
    })

    const data = { token: user.token, id: item._id }
    dispatch(NotificationActions.updateNotificationRequest(data))
  }

  return (
    <Pressable
      android_ripple={apply('text-devider-color')}
      onPress={handlePress}
    >
      <View
        style={apply('row items-start border-b-1 border-devider-color p-4')}
      >
        <Image
          source={{ uri: item.job.image }}
          resizeMode='center'
          style={apply('w-40 h-40')}
        />
        <View style={apply('flex ml-4')}>
          <View style={apply('row items-center')}>
            <Text style={apply('flex font-bold text-title -mt-1')}>
              {item.title}
            </Text>
            {!isRead && (
              <View
                style={apply('w-8 h-8 bg-primary-color rounded-full mr-4')}
              />
            )}
          </View>
          <Text style={apply('text-caption my-1 leading-text-caption')}>
            {item.subtitle}
          </Text>
          <Text style={apply('text-caption text-description-color')}>
            {moment(item.createdAt).startOf('hour').fromNow()}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

// // Prop type warnings
// DefaultCard.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// DefaultCard.defaultProps = {
//   someSetting: false
// }

export default memo(DefaultCard)
