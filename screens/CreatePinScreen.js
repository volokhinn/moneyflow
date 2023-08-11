import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePinScreen = ({ navigation, setIsNewUser }) => {
  const [pin, setPin] = useState('');

  const handlePinSubmit = async () => {
    try {
      await AsyncStorage.setItem('pin', pin);
      console.log('Pin saved');
      setIsNewUser(false);
      await AsyncStorage.setItem('isNewUser', 'false'); // Установите флаг нового пользователя в false
      console.log('isNewUser set to false');
      navigation.navigate('EnterPin'); // Используем navigation.navigate для перехода
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };
  

  return (
    <View>
      <Text>Create your pin:</Text>
      <TextInput
        value={pin}
        maxLength={4}
        textContentType="password"
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry
      />
      <TouchableOpacity onPress={handlePinSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePinScreen;
