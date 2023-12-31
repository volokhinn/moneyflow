import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BillsScreen from '../screens/BillsScreen';
import StatsScreen from '../screens/StatsScreen';
import AddTransactionModal from '../screens/AddTransactionModal';
import SettingsScreen from '../screens/SettingsScreen';
import CreatePinScreen from '../screens/CreatePinScreen';
import EnterPinScreen from '../screens/EnterPinScreen';
import EnterExistingPinScreen from '../screens/EnterExistingPinScreen';
import CreateNewPinScreen from '../screens/CreateNewPinScreen';
import FastTransactionScreen from '../screens/FastTransactionScreen';
import { LogBox, View, Text } from 'react-native';
import {
  HomeIcon,
  QueueListIcon,
  ChartPieIcon,
  AdjustmentsHorizontalIcon,
} from 'react-native-heroicons/outline';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Tab = createBottomTabNavigator();

const AppNavigation = ({ isNewNewUser }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isPinEntered, setIsPinEntered] = useState(false);

  useEffect(() => {
    const checkPinEntered = async () => {
      try {
        const enteredPin = await AsyncStorage.getItem('enteredPin');
        setIsPinEntered(enteredPin === 'true');
      } catch (error) {
        console.error('Error checking pin entered:', error);
      }
    };

    checkPinEntered();
  }, []);

  useEffect(() => {
    const checkIsNewUser = async () => {
      try {
        const isNewUserValue = await AsyncStorage.getItem('isNewUser');
        setIsNewUser(isNewUserValue === 'true');
      } catch (error) {
        console.error('Error checking isNewUser:', error);
      }
    };

    checkIsNewUser();
  }, []);

  useEffect(() => {
    const saveIsNewUser = async () => {
      try {
        await AsyncStorage.setItem('isNewUser', isNewUser.toString());
      } catch (error) {
        console.error('Error saving isNewUser:', error);
      }
    };

    saveIsNewUser();
  }, [isNewUser]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const updateTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  const fetchTransactions = useMemo(() => async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('transactions');
      if (transactionsData) {
        const parsedTransactions = JSON.parse(transactionsData);
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactionDataByMonth = useMemo(() => async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('transactions');
      if (transactionsData) {
        const transactions = JSON.parse(transactionsData);

        const dataByMonth = new Array(12).fill(0);

        transactions.forEach((transaction) => {
          const [day, month, year] = transaction.date.split('.');
          const transactionMonth = parseInt(month) - 1;
          const amountToAdd = transaction.isIncome ? transaction.amount : 0;
          dataByMonth[transactionMonth] += amountToAdd;
        });

        return dataByMonth;
      } else {
        return new Array(12).fill(0);
      }
    } catch (error) {
      console.error('Error fetching transaction data by month:', error);
      return new Array(12).fill(0);
    }
  });

  const handleSaveTransaction = useMemo(() => async (transactionData) => {
    try {
      if (transactionData) {
        const updatedTransactions = [...transactions, transactionData];
        setTransactions(updatedTransactions);
        await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));

        fetchTransactionDataByMonth();
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  });

  const handleClearTransactions = useMemo(() => async () => {
    try {
      await AsyncStorage.removeItem('transactions');
      setTransactions([]);

      fetchTransactionDataByMonth();
    } catch (error) {
      console.error('Error clearing transactions:', error);
    }
  });

  const fetchTransactionData = () => {
    fetchTransactionDataByMonth();
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isNewUser ? 'Welcome' : 'EnterPin'}
        // initialRouteName={isNewUser ? 'CreatePin' : 'CreatePin'}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="CreatePin"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) => (
            <CreatePinScreen
              navigation={navigation}
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="EnterPin"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) => <EnterPinScreen navigation={navigation} isNewUser={isNewUser} />}
        </Tab.Screen>
        <Tab.Screen
          name="FastTransaction"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) => <FastTransactionScreen navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="EnterExistingPin"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) => <EnterExistingPinScreen navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="CreateNewPin"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) => <CreateNewPinScreen navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <HomeIcon color={'white'} size={25} />,
          }}>
          {() => <HomeScreen transactions={transactions} />}
        </Tab.Screen>
        <Tab.Screen
          name="Settings"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <AdjustmentsHorizontalIcon color={'white'} size={25} />
            ),
          }}>
          {({ navigation }) => (
            <SettingsScreen
              onClearTransactions={handleClearTransactions}
              fetchTransactionData={fetchTransactionData}
              fetchTransactionDataByMonth={fetchTransactionDataByMonth}
              updateTransactions={updateTransactions}
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
              navigation={navigation}
            />
          )}
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
          }}>
          {() => (
            <StatsScreen
              transactions={transactions}
              fetchTransactionDataByMonth={fetchTransactionData}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Bills"
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <QueueListIcon color={'white'} size={25} />,
          }}>
          {() => (
            <BillsScreen transactions={transactions} updateTransactions={updateTransactions} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Welcome"
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarButton: () => <View style={{ width: 0, height: 0 }}></View>,
          }}>
          {({ navigation }) =>
            isNewUser ? (
              <WelcomeScreen navigation={navigation} isNewUser={isNewUser} />
            ) : (
              <EnterPinScreen navigation={navigation} />
            )
          }
        </Tab.Screen>
      </Tab.Navigator>
      <AddTransactionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSaveTransaction={handleSaveTransaction}
        updateTransactions={updateTransactions}
      />
    </NavigationContainer>
  );
};

export default AppNavigation;
