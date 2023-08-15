import React, { useMemo } from 'react';
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
  const handleClearTransactions = useMemo(() => async () => {
    try {
      await AsyncStorage.removeItem('transactions');
      onClearTransactions();
      fetchTransactionDataByMonth(transactions);
      Alert.alert('Success', 'All transactions have been cleared.');
    } catch (error) {
      console.error('Error clearing transactions:', error);
      Alert.alert('Error', 'Failed to clear transactions.');
    }
  });

  const handleResetNewUser = useMemo(() => async () => {
    try {
      await AsyncStorage.setItem('isNewUser', 'true');
      Alert.alert('Success', 'isNewUser is cleared');
    } catch (error) {
      console.error('Error resetting isNewUser:', error);
    }
  });

  const handleClearQuickTransactions = useMemo(() => async () => {
    try {
      await AsyncStorage.setItem('quickTransactions', '[]');
      Alert.alert('Success', 'All quick transactions have been cleared.');
    } catch (error) {
      console.error('Error clearing quick transactions:', error);
    }
  });

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
            <Text className="text-black text-xl font-bold">Edit quick transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClearQuickTransactions}
            className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Clear Quick Transactions</Text>
          </TouchableOpacity>
          <Text className="text-white text-4xl font-black my-5 mx-4">Dev tools</Text>
          <TouchableOpacity
            onPress={handleResetNewUser}
            className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Reset isNewUser</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}
