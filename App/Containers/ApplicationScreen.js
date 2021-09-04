import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native'
import { apply } from '@Themes/OsmiProvider'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Statusbar from '@Components/Statusbar'
import ApplicationActions from '@Redux/ApplicationRedux'

import ReviewScreen from './ReviewScreen'
import NotSuitableScreen from './NotSuitableScreen'
import InterviewScreen from './InterviewScreen'
import Loader from '@Components/Loader'

const ApplicationScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  )

  useEffect(() => {
    const data = {
      token: user.token,
    }

    const unsubscribe = navigation.addListener('focus', () =>
      dispatch(ApplicationActions.getMyApplicationsRequest(data))
    )

    return unsubscribe
  }, [])

  const renderScene = SceneMap({
    ReviewScreen,
    NotSuitableScreen,
    InterviewScreen,
  })

  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'ReviewScreen', title: 'Review' },
    { key: 'NotSuitableScreen', title: 'Not Suitable' },
    { key: 'InterviewScreen', title: 'Interview' },
  ])

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {/* <Statusbar backgroundColor={apply('primary-color')} /> */}
      {loading && <Loader />}
      <View style={apply('bg-primary-color p-5')}>
        <Text style={apply('font-bold text-white text-heading-4')}>
          Application
        </Text>
      </View>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            pressColor={apply('devider-color')}
            indicatorStyle={apply('bg-primary-color h-3')}
            style={apply('bg-white p-0')}
            renderLabel={({ route, focused }) => (
              <Text
                style={apply(
                  `${
                    focused ? 'text-primary-color' : 'text-description-color'
                  } font-bold text-caption`
                )}
              >
                {route.title}
              </Text>
            )}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  )
}

export default ApplicationScreen
