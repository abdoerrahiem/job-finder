import { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { apply } from '@Themes/OsmiProvider'
import Statusbar from '@Components/Statusbar'
import DefaultCard from '@Components/DefaultCard'
import Images from '@Images/index'
import { formatMoney } from '@Lib/TextUtils'
import RoundedButton from '@Components/RoundedButton'
import BookmarkActions from '@Redux/BookmarkRedux'
import Empty from '@Components/Empty'
import FocusAwareStatusBar from '@Components/FocusAwareBar'

const BookmarksScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { bookmarks } = useSelector((state) => state.bookmarks)

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {/* <Statusbar backgroundColor={apply('primary-color')} /> */}
      <FocusAwareStatusBar
        barStyle='light-content'
        backgroundColor={apply('primary-color')}
      />
      <View style={apply('bg-primary-color p-5')}>
        <Text style={apply('font-bold text-white text-heading-4')}>
          Bookmarks
        </Text>
      </View>
      {bookmarks?.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              android_ripple={apply('text-devider-color')}
              onPress={() =>
                navigation.navigate('JobDetailsScreen', { id: item.id })
              }
            >
              <View
                style={apply(
                  'row px-3 py-4 border-b-1 border-devider-color items-center'
                )}
              >
                <Image
                  source={{ uri: item.image }}
                  resizeMode='center'
                  style={apply('w-50 h-50 -mt-6')}
                />
                <View style={apply('flex ml-3')}>
                  <Text style={apply('text-heading-6 font-bold')}>
                    {item.title}
                  </Text>
                  <Text
                    style={apply('text-caption text-description-color my-2')}
                  >
                    {item.company}
                  </Text>
                  <Text style={apply('text-caption text-description-color')}>
                    Salary ${formatMoney(item.salary)} / month
                  </Text>
                </View>
                <RoundedButton
                  image={Images.bookmarkActive}
                  extraClass='w-22 h-22'
                  onPress={() =>
                    dispatch(BookmarkActions.removeBookmark({ id: item.id }))
                  }
                />
              </View>
            </Pressable>
          )}
        />
      ) : (
        <Empty
          image={Images.empty2}
          title='Opps, No Bookmark'
          subtitle="You don't save any jobs, let's explore new job and find your dream jobs"
        />
      )}
    </SafeAreaView>
  )
}

export default BookmarksScreen
