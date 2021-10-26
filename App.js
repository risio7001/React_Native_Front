import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const HomeScreen = () => {
  return<>
    <ScrollView>
      <View>
        <Text>
          tab Test 1
        </Text>
      </View>
    </ScrollView>
  </>
}

const SubScreen = () => {
  return<>
    <ScrollView>
      <View>
        <Text>
          tab Test 2
        </Text>
      </View>
    </ScrollView>
  </>
}


const Tabs = () => {
  return<>
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen}/>
      <Tab.Screen name="sub" component={SubScreen}/>
    </Tab.Navigator>
  </>
}

export default function App() {


  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
