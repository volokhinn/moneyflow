import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePinScreen = ({ navigation }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');

  const handleChangePinSubmit = async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      if (currentPin === savedPin) {
        await AsyncStorage.setItem('pin', newPin);
        console.log('Pin changed');
        navigation.navigate('Settings'); // Возвращаемся назад после изменения пин-кода
      } else {
        console.log('Incorrect current pin');
      }
    } catch (error) {
      console.error('Error changing pin:', error);
    }
  };

  return (
    <View>
      <Text>Enter current pin:</Text>
      <TextInput
        value={currentPin}
        onChangeText={setCurrentPin}
        keyboardType="numeric"
        secureTextEntry={true}
        maxLength={4}
      />
      <Text>Enter new pin:</Text>
      <TextInput
        value={newPin}
        textContentType="newPassword"
        onChangeText={setNewPin}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />
      <TouchableOpacity onPress={handleChangePinSubmit}>
        <Text>Change Pin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePinScreen;
