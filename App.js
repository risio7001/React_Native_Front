import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabRouter from './router/TabRouter';
import Constants from 'expo-constants';

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }} />
      <TabRouter />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   screen: {
//     paddingTop:Constants.statusBarHeight
//   },
// });
