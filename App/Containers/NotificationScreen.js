import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, ScrollView, Text, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Styles
import styles from './Styles/NotificationScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Images from '@Images/index'
import DefaultCard from '@Components/DefaultCard'
import Loader from '@Components/Loader'
import NotificationActions from '@Redux/NotificationRedux'
import Empty from '@Components/Empty'

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  )
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const data = { token: user.token }
    dispatch(NotificationActions.getMyNotificationsRequest(data))
  }, [])

  const handleRefresh = () => {
    const data = { token: user.token }
    dispatch(NotificationActions.getMyNotificationsRequest(data))
  }

  console.log(notifications)

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {loading && <Loader />}
      <Header title='Notifications' />
      {notifications?.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <DefaultCard item={item} />}
          refreshControl={
            <RefreshControl
              colors={['#475BD8']}
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : (
        <Empty
          title='Notification Empty'
          subtitle='You have no notifications at this time'
          image={Images.empty2}
        />
      )}
    </SafeAreaView>
  )
}

export default NotificationScreen
