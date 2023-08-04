import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { LogBox, View } from 'react-native';
import { HomeIcon } from 'react-native-heroicons/outline';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Welcome" screenOptions={{
   tabBarStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
},
  }}>
        <Tab.Screen name="Home" options={{ headerShown: false , tabBarLabel: '', tabBarIcon: ({color,size}) => (
          <HomeIcon color={'white'} size={25} />
        )}}
        component={HomeScreen} />
        <Tab.Screen name="Welcome" options={{ headerShown: false, tabBarStyle: {display: 'none'}, tabBarButton: () => (
            <View style={{width:0, height:0}}></View>
        ), }}  component={WelcomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;