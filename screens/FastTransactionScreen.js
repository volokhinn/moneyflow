import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
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

  const fetchQuickTransactions = async () => {
    try {
      const quickTransactionsData = await AsyncStorage.getItem('quickTransactions');
      if (quickTransactionsData) {
        const parsedQuickTransactions = JSON.parse(quickTransactionsData);
        setQuickTransactions(parsedQuickTransactions);
      }
    } catch (error) {
      console.error('Error fetching quick transactions:', error);
    }
  };

  const uniqueQuickTransactionIcons = Array.from(
    new Set(Object.values(keywordsToIcons).map((item) => item.img)),
  );

  const handleIconPress = (iconPath) => {
    setSelectedIcon(iconPath);
  };

  const handleSaveCustomTransaction = async () => {
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

        console.log(newQuickTransaction);

        quickTransactions.push(newQuickTransaction);

        await AsyncStorage.setItem('quickTransactions', JSON.stringify(quickTransactions));
        navigation.navigate('Settings', {
          selectedIcon,
          transactionName: transactionName,
        });
      } else {
        navigation.navigate('Settings');
      }

      navigation.navigate('Settings');
    } catch (error) {
      console.error('Error saving quick transaction:', error);
    }
  };

  const handleDeleteQuickTransaction = async (index) => {
    try {
      const updatedQuickTransactions = [...quickTransactions];
      updatedQuickTransactions.splice(index, 1);

      await AsyncStorage.setItem('quickTransactions', JSON.stringify(updatedQuickTransactions));
      setQuickTransactions(updatedQuickTransactions);
    } catch (error) {
      console.error('Error deleting quick transaction:', error);
    }
  };

  useEffect(() => {
    fetchQuickTransactions();
  }, [quickTransactions]);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'red' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add Custom Transaction</Text>
      <TextInput
        placeholder="Transaction Name"
        value={transactionName}
        onChangeText={setTransactionName}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />
      <ScrollView horizontal>
        {uniqueQuickTransactionIcons.map((iconSource, index) => (
          <TouchableOpacity
            key={index}
            style={{ margin: 10 }}
            onPress={() => setSelectedIcon(iconSource)}>
            <Image source={iconSource} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}>
        <Picker.Item label="Select a category" value={null} />
        <Picker.Item label="Entertaiments" value="Entertaiments" />
        <Picker.Item label="Restaurants" value="Restaurants" />
        <Picker.Item label="Communal services" value="Communal services" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Transfers" value="Transfers" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <TouchableOpacity onPress={handleSaveCustomTransaction}>
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: 10,
            textAlign: 'center',
            borderRadius: 5,
            marginTop: 10,
          }}>
          Save Custom Transaction
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: 10,
            textAlign: 'center',
            borderRadius: 5,
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {quickTransactions.length ? (
          quickTransactions.map((quickTransaction, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ flex: 1 }}>{quickTransaction.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteQuickTransaction(index)}>
                <Text style={{ color: 'blue' }}>Удалить</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            <Text className="text-md text-white text-center">
              Your quick transactions will be displayed here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
