import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen({ transactions, fetchTransactionDataByMonth }) {
  const handleClearTransactions = async () => {
    try {
      await AsyncStorage.removeItem('transactions');
      fetchTransactionData(); // Вызываем функцию fetchTransactionData
      fetchTransactionDataByMonth(); // Вызываем функцию для обновления данных
      Alert.alert('Success', 'All transactions have been cleared.');
    } catch (error) {
      console.error('Error clearing transactions:', error);
      Alert.alert('Error', 'Failed to clear transactions.');
    }
  }

  return (
    <>
      <View>
        <ImageBackground
          className="h-full w-full"
          resizeMode="cover"
          source={require('../assets/img/welcomebg.png')}>
          <Text className="text-white text-4xl font-black mt-12 mx-4 mb-2">Settings</Text>
          <TouchableOpacity onPress={handleClearTransactions} className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Clear All Transactions</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}