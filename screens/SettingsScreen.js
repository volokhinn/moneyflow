import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({
  transactions,
  onClearTransactions,
  fetchTransactionDataByMonth,
  isNewUser,
  setIsNewUser,
  navigation,
  setIsPinEntered,
  isPinEntered,
}) {
  const handleClearTransactions = async () => {
    try {
      await AsyncStorage.removeItem('transactions');
      onClearTransactions(); // Вызываем функцию для очистки транзакций
      fetchTransactionDataByMonth(transactions); // Вызываем функцию для обновления данных графика
      Alert.alert('Success', 'All transactions have been cleared.');
    } catch (error) {
      console.error('Error clearing transactions:', error);
      Alert.alert('Error', 'Failed to clear transactions.');
    }
  };

  const handleResetNewUser = async () => {
    try {
      await AsyncStorage.setItem('isNewUser', 'true');
    } catch (error) {
      console.error('Error resetting isNewUser:', error);
    }
  };

  const handleClearQuickTransactions = async () => {
    try {
      await AsyncStorage.setItem('quickTransactions', '[]');
    } catch (error) {
      console.error('Error clearing quick transactions:', error);
    }
  };

  return (
    <>
      <View>
        <ImageBackground
          className="h-full w-full"
          resizeMode="cover"
          source={require('../assets/img/welcomebg.png')}>
          <Text className="text-white text-4xl font-black mt-12 mx-4 mb-2">Settings</Text>
          <TouchableOpacity
            onPress={handleClearTransactions}
            className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Clear All Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 m-4 rounded-md bg-white"
            onPress={() => navigation.navigate('EnterExistingPin')}>
            <Text className="text-black text-xl font-bold">Change pin code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 m-4 rounded-md bg-white"
            onPress={() => navigation.navigate('FastTransaction')}>
            <Text className="text-black text-xl font-bold">Add quick transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClearQuickTransactions}
            className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Clear Quick Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetNewUser}>
            <Text className="text-white text-center">Reset isNewUser</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}
