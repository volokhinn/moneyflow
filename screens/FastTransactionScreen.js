import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { keywordsToIcons } from '../helpers/TransactionHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FastTransactionScreen() {
  const [transactionName, setTransactionName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigation = useNavigation();

  const uniqueQuickTransactionIcons = Array.from(
    new Set(Object.values(keywordsToIcons).map((item) => item.img)),
  );

  const handleIconPress = (iconPath) => {
    setSelectedIcon(iconPath);
  };

  const handleSaveCustomTransaction = async () => {
    try {
      if (transactionName && selectedIcon !== null) {
        const newQuickTransaction = {
          name: transactionName,
          iconPath: selectedIcon,
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

      navigation.navigate('Settings');
    } catch (error) {
      console.error('Error saving quick transaction:', error);
    }
  };

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
      <TouchableOpacity onPress={handleSaveCustomTransaction}>
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: 10,
            textAlign: 'center',
            borderRadius: 5,
          }}>
          Save Custom Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}
