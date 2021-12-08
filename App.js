import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import TabRouter from './router/TabRouter';
import Constants from 'expo-constants';
// import * as analytics from 'expo-firebase-analytics';
// import analytics from '@react-native-firebase/analytics';

export default function App() {

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      // ref={navigationRef}
      // onReady={() => {
      //   routeNameRef.current = navigationRef.getCurrentRoute().name;
      // }}
      // onStateChange={ () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.getCurrentRoute().name;

      //   if (previousRouteName !== currentRouteName) {
      //     // The line below uses the expo-firebase-analytics tracker
      //     // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      //     // Change this line to use another Mobile analytics SDK
      //     // analytics().logScreenView({
      //     //   screen_name:currentRouteName,
      //     //   screen_class:currentRouteName
      //     // })
      //     // analytics.logEvent('page_view', {screen_name:currentRouteName, screen_class:currentRouteName});
      //     // analytics.logEvent('page_title', {screen_name:currentRouteName, screen_class:currentRouteName});
      //     analytics.logEvent('screen_name', {screen_name:currentRouteName, screen_class:currentRouteName});
      //     // analytics.logEvent('page_view', {screen_name:currentRouteName})
      //     // analytics.logEvent('page_title', {screen_name:currentRouteName})
          
      //     console.log(currentRouteName);
      //   }

      //   // Save the current route name for later comparison
      //   routeNameRef.current = currentRouteName;
      // }}
    >
      <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }} />
      <TabRouter />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight
  },
});
