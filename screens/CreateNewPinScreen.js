import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateNewPinScreen = ({ navigation }) => {
  const [newEnteredPin, setNewEnteredPin] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [pinDotScale] = useState(new Animated.Value(1));

  const handleKeyPress = (key) => {
    if (key === '<') {
      setNewEnteredPin(newEnteredPin.slice(0, -1));
    } else if (newEnteredPin.length < 4) {
      setNewEnteredPin(newEnteredPin + key);
    }
  };

  useEffect(() => {
    if (newEnteredPin.length === 4) {
      setIsChecking(true);
      savePin();
    }
  }, [newEnteredPin]);

  const savePin = useMemo(() => async () => {
    try {
      await AsyncStorage.setItem('pin', newEnteredPin);
      setNewEnteredPin('');
      newEnteredPin.length = 0;
      setIsChecking(false);
      navigation.navigate('Settings');
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  });

  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <Image className="mt-12 ml-[-150] absolute" source={require('../assets/img/coin.png')} />
        <Text className="text-white text-2xl font-black my-20 text-center">Create your pin</Text>
        <View className="flex-row justify-center mt-4">
          {Array.from({ length: 4 }, (_, index) => (
            <View
              key={index}
              className="w-4 h-4 rounded-full bg-transparent border-[1px] border-white my-1 mb-20 mx-2"
              style={[newEnteredPin.length > index && styles.pinDotFilled]}
            />
          ))}
        </View>
        <Animated.View className="flex-row mx-10 flex-wrap justify-center mt-5">
          {Array.from({ length: 9 }, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleKeyPress(index + 1)}
              className="w-14 h-14 rounded-full bg-black justify-center items-center m-2">
              <Text className="text-2xl text-white">{index + 1}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => handleKeyPress(0)}
            className="w-14 h-14 rounded-full bg-black justify-center items-center m-2">
            <Text className="text-2xl text-white">0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress('<')}
            className="w-14 h-14 rounded-full bg-black justify-center items-center m-2">
            <Text className="text-2xl text-white">←</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  pinDotFilled: {
    backgroundColor: 'white',
  },
});

export default CreateNewPinScreen;
