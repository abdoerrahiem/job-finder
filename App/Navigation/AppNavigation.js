import React, { useEffect, useState } from 'react'
import { Image, Text, View, BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'

import WelcomeScreen from '@Containers/WelcomeScreen'
import LoginScreen from '@Containers/LoginScreen'
import RegisterScreen from '@Containers/RegisterScreen'
import HomeScreen from '@Containers/HomeScreen'
import BookmarksScreen from '@Containers/BookmarksScreen'
import ApplicationScreen from '@Containers/ApplicationScreen'
import MyAccountScreen from '@Containers/MyAccountScreen'
import Images from '@Images/index'
import { apply } from '@Themes/OsmiProvider'
import NotificationScreen from '@Containers/NotificationScreen'
import ApplicationDetailsScreen from '@Containers/ApplicationDetailsScreen'
import JobDetailsScreen from '@Containers/JobDetailsScreen'
import ApplyJobScreen from '@Containers/ApplyJobScreen'
import SuccessScreen from '@Containers/SuccessScreen'
import OTPScreen from '@Containers/OTPScreen'
import WebScreen from '@Containers/WebScreen'
import NoInternet from '@Components/NoInternet'
import MessagesScreen from '../Containers/MessagesScreen'
import MessageScreen from '../Containers/MessageScreen'
import { navigationRef } from './RootNavigation'
import FingerprintScanner from 'react-native-fingerprint-scanner'

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const MainScreens = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: apply('h-75 py-4'),
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName

        if (route.name === 'HomeScreen') {
          iconName = focused ? Images.homeActive : Images.home
        } else if (route.name === 'BookmarksScreen') {
          iconName = focused ? Images.bookmarkActive : Images.bookmark
        } else if (route.name === 'ApplicationScreen') {
          iconName = focused ? Images.applicationActive : Images.application
        } else if (route.name === 'MyAccountScreen') {
          iconName = focused ? Images.accountActive : Images.account
        }

        return (
          <Image
            source={iconName}
            style={apply('w-20 h-20')}
            resizeMode='center'
          />
        )
      },
    })}
  >
    <Tab.Screen
      name='HomeScreen'
      component={HomeScreen}
      options={{
        title: ({ focused }) => (
          <Text
            style={apply(
              `text-small ${
                focused
                  ? 'font-bold text-primary-color'
                  : 'text-description-color'
              }`
            )}
          >
            Home
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name='BookmarksScreen'
      component={BookmarksScreen}
      options={{
        title: ({ focused }) => (
          <Text
            style={apply(
              `text-small ${
                focused
                  ? 'font-bold text-primary-color'
                  : 'text-description-color'
              }`
            )}
          >
            Bookmarks
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name='ApplicationScreen'
      component={ApplicationScreen}
      options={{
        title: ({ focused }) => (
          <Text
            style={apply(
              `text-small ${
                focused
                  ? 'font-bold text-primary-color'
                  : 'text-description-color'
              }`
            )}
          >
            Application
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name='MyAccountScreen'
      component={MyAccountScreen}
      options={{
        title: ({ focused }) => (
          <Text
            style={apply(
              `text-small ${
                focused
                  ? 'font-bold text-primary-color'
                  : 'text-description-color'
              }`
            )}
          >
            My Account
          </Text>
        ),
      }}
    />
  </Tab.Navigator>
)

const AppNavigation = () => {
  const { user, isFingerprint } = useSelector((state) => state.user)
  const [isInternet, setIsInternet] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternet(state.isConnected)
    })

    if (isFingerprint && !mounted) {
      FingerprintScanner.authenticate({ title: 'Confirm Fingerprint' })
        .then(() => setMounted(true))
        .catch(() => BackHandler.exitApp())
    }

    return () => unsubscribe()
  }, [isFingerprint, mounted])

  if (!mounted && isFingerprint) {
    return <View style={apply('flex bg-white')}></View>
  } else {
    return isInternet ? (
      <NavigationContainer ref={navigationRef}>
        {user ? (
          <Stack.Navigator
            initialRouteName='MainScreens'
            screenOptions={TransitionScreenOptions}
          >
            <Stack.Screen name='MainScreens' component={MainScreens} />
            <Stack.Screen
              name='NotificationScreen'
              component={NotificationScreen}
            />
            <Stack.Screen
              name='ApplicationDetailsScreen'
              component={ApplicationDetailsScreen}
            />
            <Stack.Screen
              name='JobDetailsScreen'
              component={JobDetailsScreen}
            />
            <Stack.Screen name='ApplyJobScreen' component={ApplyJobScreen} />
            <Stack.Screen name='SuccessScreen' component={SuccessScreen} />
            <Stack.Screen name='WebScreen' component={WebScreen} />
            <Stack.Screen name='MessagesScreen' component={MessagesScreen} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName='WelcomeScreen'
            screenOptions={TransitionScreenOptions}
          >
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen name='OTPScreen' component={OTPScreen} />
            <Stack.Screen
              name='ApplicationDetailsScreen'
              component={ApplicationDetailsScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    ) : (
      <NoInternet />
    )
  }
}

export default AppNavigation
