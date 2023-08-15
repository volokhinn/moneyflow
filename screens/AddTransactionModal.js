import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Checkbox } from 'expo-checkbox';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keywordsToIcons } from '../helpers/TransactionHelpers';

export default function AddTransactionModal({ isVisible, onClose, updateTransactions }) {
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(true);
  const [error, setError] = useState(false);
  const [quickTransactions, setQuickTransactions] = useState([]);
  const [selectedQuickTransactionIcon, setSelectedQuickTransactionIcon] = useState(null);
  const [selectedQuickTransactionCategory, setSelectedQuickTransactionCategory] = useState(null);

  const fetchQuickTransactions = useMemo(() => async () => {
    try {
      const quickTransactionsData = await AsyncStorage.getItem('quickTransactions');
      if (quickTransactionsData) {
        const parsedQuickTransactions = JSON.parse(quickTransactionsData);
        setQuickTransactions(parsedQuickTransactions);
      }
    } catch (error) {
      console.error('Error fetching quick transactions:', error);
    }
  });

  useEffect(() => {
    if (isVisible) {
      fetchQuickTransactions();
    }
  }, [isVisible]);

  const quick = quickTransactions.map((quickTransaction, index) => (
    <TouchableOpacity
      className="mr-3 mt-3"
      key={index}
      onPress={() => {
        setTransactionName(quickTransaction.name);
        setSelectedQuickTransactionIcon(quickTransaction.iconPath);
        setSelectedQuickTransactionCategory(quickTransaction.cat);
      }}>
      <Text className="bg-white text-black px-4 py-2 rounded-md">{quickTransaction.name}</Text>
    </TouchableOpacity>
  ));

  const handleSaveTransaction = useMemo(() => async () => {
    try {
      const newTransaction = {
        name: transactionName,
        amount: parseFloat(amount),
        isIncome,
        date: new Date().toLocaleDateString('ru-RU'),
        cat: selectedQuickTransactionCategory ? selectedQuickTransactionCategory : 'Other',
        iconPath: selectedQuickTransactionIcon,
      };

      if (!newTransaction.name || isNaN(newTransaction.amount)) {
        setError(true);
        return;
      }

      const existingTransactions = await AsyncStorage.getItem('transactions');
      let transactions = [];

      if (existingTransactions) {
        transactions = JSON.parse(existingTransactions);
      }

      transactions.push(newTransaction);

      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      updateTransactions(transactions);

      setTransactionName('');
      setAmount('');
      setIsIncome(true);
      onClose();
      setError(false);
      setSelectedQuickTransactionIcon(null);
      setSelectedQuickTransactionCategory(null);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="black"
      backdropOpacity={0.8}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      className="rounded-full">
      <KeyboardAvoidingView>
        <View
          className="bg-opacity-50 h-fit w-full p-4 rounded-2xl"
          style={{ backgroundColor: 'rgba(255,255,255,0.3)', blur: 60 }}>
          <View className="w-28 h-1 rounded-full bg-white self-center mt-2"></View>
          <View className="flex-row items-center mt-10">
            <Checkbox
              value={isIncome}
              onValueChange={setIsIncome}
              className="mr-4 rounded-full"
              color="#fff"
            />
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
            placeholder="10 $"
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
          <ScrollView horizontal>{quick}</ScrollView>
          {error && (
            <Text className="text-md mt-5 text-red-500 font-bold">
              All fields of the form must be filled in
            </Text>
          )}
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
