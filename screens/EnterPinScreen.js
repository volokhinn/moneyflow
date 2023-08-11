import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterPinScreen = ({ navigation }) => {
  const [enteredPin, setEnteredPin] = useState('');

  const handlePinSubmit = async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      console.log(savedPin);
      if (enteredPin === savedPin) {
        // Переход на главный экран
        navigation.navigate('Home');
      } else {
        // Показать ошибку неправильного пин-кода
        console.log('Incorrect pin');
      }
    } catch (error) {
      console.error('Error checking pin:', error);
    }
  };

  return (
    <View>
      <Text>Enter your pin:</Text>
      <TextInput
        value={enteredPin}
        maxLength={4}
        textContentType="password"
        onChangeText={setEnteredPin}
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handlePinSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPinScreen;
