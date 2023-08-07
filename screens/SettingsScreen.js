import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ transactions, onClearTransactions }) {
  const handleClearTransactions = async () => {
    try {
      await AsyncStorage.removeItem('transactions');
      onClearTransactions();
      Alert.alert('Success', 'All transactions have been cleared.');
    } catch (error) {
      console.error('Error clearing transactions:', error);
      Alert.alert('Error', 'Failed to clear transactions.');
    }
  };

  const handleClear = () => {
    onClearTransactions();
  };

  return (
    <>
      <View>
        <ImageBackground
          className="h-full w-full"
          resizeMode="cover"
          source={require('../assets/img/welcomebg.png')}>
          <Text className="text-white text-4xl font-black mt-12 mx-4 mb-2">Settings</Text>
          <TouchableOpacity onPress={handleClear} className="px-4 py-2 m-4 rounded-md bg-white">
            <Text className="text-black text-xl font-bold">Clear All Transactions</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
}
