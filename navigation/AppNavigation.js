import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BillsScreen from '../screens/BillsScreen';
import StatsScreen from '../screens/StatsScreen';
import AddTransactionModal from '../screens/AddTransactionModal';
import SettingsScreen from '../screens/SettingsScreen';
import { LogBox, View, Text } from 'react-native';
import {
  HomeIcon,
  QueueListIcon,
  ChartPieIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Функция для обновления списка транзакций после добавления новой транзакции
  const updateTransactions = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  // Функция для получения транзакций из хранилища при загрузке компонента
  const fetchTransactions = async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('transactions');
      if (transactionsData) {
        const parsedTransactions = JSON.parse(transactionsData);
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    // Получаем транзакции из хранилища при загрузке компонента
    fetchTransactions();
  }, []);

  // Функция для сохранения транзакции в хранилище
  const handleSaveTransaction = async (transactionData) => {
    try {
      if (transactionData) {
        const updatedTransactions = [...transactions, transactionData];
        setTransactions(updatedTransactions);
        await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        console.log('Transaction Saved:', transactionData);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleClearTransactions = () => {
    setTransactions([]);
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
          name="Settings"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <AdjustmentsHorizontalIcon color={'white'} size={25} />
            ),
          }}>
          {() => <SettingsScreen onClearTransactions={handleClearTransactions} />}
        </Tab.Screen>
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
          name="Stats"
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
          }}>
          {() => <BillsScreen transactions={transactions} />}
        </Tab.Screen>
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
      <AddTransactionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSaveTransaction={handleSaveTransaction}
      />
    </NavigationContainer>
  );
};

export default AppNavigation;
