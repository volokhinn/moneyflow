import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BillsScreen() {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch transactions from AsyncStorage
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
    // Fetch transactions when the component mounts
    fetchTransactions();
  }, []);

  return (
    <>
      <View>
        <ImageBackground
          className="h-full w-full"
          resizeMode="cover"
          source={require('../assets/img/welcomebg.png')}>
          <Text className="text-white text-4xl font-black mt-12 mx-4 mb-2">All bills</Text>
          <ScrollView className="mx-4 mb-14">
            {transactions.map((transaction, index) => (
              <View key={index} className="flex-row justify-between items-center my-2">
                {/* Use appropriate data from transaction object */}
                <Image source={require('../assets/img/services/steam.png')} />
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">{transaction.name}</Text>
                  <Text className="text-white text-sm opacity-50">{transaction.date}</Text>
                </View>
                <Text className="text-white text-2xl font-black">
                  {transaction.isIncome ? '+ $' : '- $'}
                  {Math.abs(transaction.amount)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
}
