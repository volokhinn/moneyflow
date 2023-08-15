import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { keywordsToIcons } from '../helpers/TransactionHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function FastTransactionScreen() {
  const [transactionName, setTransactionName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quickTransactions, setQuickTransactions] = useState([]);
  const navigation = useNavigation();

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

  const uniqueQuickTransactionIcons = Array.from(
    new Set(Object.values(keywordsToIcons).map((item) => item.img)),
  );

  const handleIconPress = (iconPath) => {
    setSelectedIcon(iconPath);
  };

  const handleSaveCustomTransaction = useMemo(() => async () => {
    try {
      if (transactionName && selectedIcon !== null && selectedCategory !== null) {
        const newQuickTransaction = {
          name: transactionName,
          iconPath: selectedIcon,
          cat: selectedCategory,
        };

        const existingQuickTransactions = await AsyncStorage.getItem('quickTransactions');
        let quickTransactions = [];

        if (existingQuickTransactions) {
          quickTransactions = JSON.parse(existingQuickTransactions);
        }

        quickTransactions.push(newQuickTransaction);

        await AsyncStorage.setItem('quickTransactions', JSON.stringify(quickTransactions));
        navigation.navigate('Settings', {
          selectedIcon,
          transactionName: transactionName,
        });
      } else {
        navigation.navigate('Settings');
      }

      setTransactionName('');
      setSelectedIcon(null);
      setSelectedCategory(null);

      navigation.navigate('Settings');
    } catch (error) {
      console.error('Error saving quick transaction:', error);
    }
  });

  const handleDeleteQuickTransaction = useMemo(() => async (index) => {
    try {
      const updatedQuickTransactions = [...quickTransactions];
      updatedQuickTransactions.splice(index, 1);

      await AsyncStorage.setItem('quickTransactions', JSON.stringify(updatedQuickTransactions));
      setQuickTransactions(updatedQuickTransactions);
    } catch (error) {
      console.error('Error deleting quick transaction:', error);
    }
  });

  useEffect(() => {
    fetchQuickTransactions();
  }, [quickTransactions]);

  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <ScrollView className="flex-1 px-4 mt-15">
          <View className="mt-16">
            <Text className="text-2xl text-white font-black mb-6">Quick transactions</Text>
            {quickTransactions.length ? (
              quickTransactions.map((quickTransaction, index) => (
                <View key={index} className="flex-row items-center mb-4 justify-between">
                  <Text className="bg-white py-2 px-4 text-black text-md w-fit rounded-md">
                    {quickTransaction.name}
                  </Text>
                  <Text className="text-white text-md">{quickTransaction.cat}</Text>
                  <TouchableOpacity onPress={() => handleDeleteQuickTransaction(index)}>
                    <Text className="text-md text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View className="mx-8">
                <Text className="text-md text-white text-center">
                  Your quick transactions will be displayed here
                </Text>
              </View>
            )}
          </View>
          <Text className="text-2xl text-white font-black mt-6">Add Quick transaction</Text>
          <TextInput
            placeholder="Quick transaction name"
            placeholderTextColor="white"
            value={transactionName}
            onChangeText={setTransactionName}
            className="text-white placeholder-white p-3 rounded-xl my-10"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />
          <Text className="text-white text-xl mb-2">Choose icon</Text>
          <ScrollView horizontal>
            {uniqueQuickTransactionIcons.map((iconSource, index) => (
              <TouchableOpacity
                key={index}
                className="m-3"
                onPress={() => setSelectedIcon(iconSource)}>
                <Image source={iconSource} className="w-10 h-10" />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="rounded-full">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              dropdownIconColor="white"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: 10,
                marginVertical: 20,
                borderRadius: 15,
                color: 'white',
              }}>
              <Picker.Item label="Select a category" value={null} />
              <Picker.Item label="Entertaiments" value="Entertaiments" />
              <Picker.Item label="Restaurants" value="Restaurants" />
              <Picker.Item label="Communal Services" value="Communal Services" />
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Transfers" value="Transfers" />
            </Picker>
          </View>
          <TouchableOpacity onPress={handleSaveCustomTransaction} className="mt-5">
            {transactionName && (
              <Text
                className="text-white text-xl rounded-full self-center py-1 px-5"
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}>
                Save
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} className="my-5">
            <Text
              className="text-white text-xl rounded-full self-center py-1 px-6"
              style={{ backgroundColor: 'rgba(0,0,0,1)' }}>
              Back
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
