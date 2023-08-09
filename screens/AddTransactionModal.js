import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { BlurView } from 'expo-blur';
import { Checkbox } from 'expo-checkbox';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransactionModal({
  isVisible,
  onClose,
  onSaveTransaction,
  updateTransactions,
}) {
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(true);

  const handleSaveTransaction = async () => {
    try {
      const newTransaction = {
        name: transactionName,
        amount: parseFloat(amount),
        isIncome,
        date: new Date().toLocaleDateString('ru-RU'),
      };

      const existingTransactions = await AsyncStorage.getItem('transactions');
      let transactions = [];

      if (existingTransactions) {
        transactions = JSON.parse(existingTransactions);
      }

      transactions.push(newTransaction);

      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // После успешного сохранения вызываем функцию для обновления данных
      updateTransactions(transactions);

      setTransactionName('');
      setAmount('');
      setIsIncome(true);
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      className="rounded-full">
      <KeyboardAvoidingView>
        <View
          className="bg-opacity-50 h-fit w-full p-4 rounded-2xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.3)', blur: 30 }}>
          {/* <TouchableOpacity onPress={onClose} className="self-end">
            <XMarkIcon size={25} color={'black'} />
          </TouchableOpacity> */}
          <View className="w-28 h-1 rounded-full bg-white self-center mt-2"></View>
          <View className="flex-row items-center mt-10">
            <Checkbox value={isIncome} onValueChange={setIsIncome} className="mr-4 rounded-full" />
            <Text className="text-white text-xl">Income</Text>
          </View>
          <View className="flex-row items-center mt-6">
            <Checkbox
              value={!isIncome}
              onValueChange={(value) => setIsIncome(!value)}
              className="mr-4 rounded-full"
              color="#fff"
            />
            <Text className="text-white text-xl">Expense</Text>
          </View>
          <TextInput
            placeholder="Spotify"
            value={transactionName}
            onChangeText={setTransactionName}
            color="#fff"
            placeholderTextColor="#fff"
            className="text-xl mt-10 py-2 px-5 rounded-full"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.5)',
            }}
          />
          <TextInput
            placeholder="500 P"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            color="#fff"
            placeholderTextColor="#fff"
            className="text-xl mt-5 py-2 px-5 rounded-full"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.5)',
            }}
          />
          <TouchableOpacity onPress={handleSaveTransaction} className="mt-10">
            <Text
              className="text-white text-xl rounded-full self-center py-1 px-5"
              style={{ backgroundColor: 'rgba(0,0,0,1)' }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
