import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BillsScreen from '../screens/BillsScreen';
import StatsScreen from '../screens/StatsScreen';
import AddTransactionModal from '../screens/AddTransactionModal';
import { LogBox, View, Text } from 'react-native';
import { HomeIcon, QueueListIcon, ChartPieIcon } from 'react-native-heroicons/outline';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <HomeIcon color={'white'} size={25} />,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Stats"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <ChartPieIcon color={'white'} size={25} />,
          }}
          component={StatsScreen}
        />
        <Tab.Screen
          name="Add"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <PlusCircleIcon color={'white'} size={60} />,
          }}
          component={BillsScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              openModal();
            },
          }}
        />
        <Tab.Screen
          name="Statss"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <ChartPieIcon color={'white'} size={25} />,
          }}
          component={StatsScreen}
        />
        <Tab.Screen
          name="Bills"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <QueueListIcon color={'white'} size={25} />,
          }}
          component={BillsScreen}
        />
        <Tab.Screen
          name="Welcome"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}
          component={WelcomeScreen}
        />
      </Tab.Navigator>
      <AddTransactionModal isVisible={isModalVisible} onClose={closeModal} />
    </NavigationContainer>
  );
};

export default AppNavigation;
