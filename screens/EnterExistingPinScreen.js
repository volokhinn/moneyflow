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

const EnterExistingPinScreen = ({ navigation }) => {
  const [existingEnteredPin, setExistingEnteredPin] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isPinCorrect, setIsPinCorrect] = useState(true);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const handleKeyPress = (key) => {
    if (isChecking) return;

    if (key === '<') {
      setExistingEnteredPin(existingEnteredPin.slice(0, -1));
    } else if (existingEnteredPin.length < 4) {
      setExistingEnteredPin(existingEnteredPin + key);
    }
  };

  useEffect(() => {
    if (existingEnteredPin.length === 4) {
      setIsChecking(true);
      checkPin();
    }
  }, [existingEnteredPin]);

  const checkPin = useMemo(() => async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      if (existingEnteredPin === savedPin) {
        setIsPinCorrect(true);
        setExistingEnteredPin('');
        setIsChecking(false);
        existingEnteredPin.length = 0;
        navigation.navigate('CreateNewPin');
      } else {
        setIsPinCorrect(false);
        Animated.sequence([
          Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]).start(() => {
          setIsChecking(false);
          setExistingEnteredPin('');
        });
      }
    } catch (error) {
      console.error('Error checking pin:', error);
    }
  });

  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <Image className="mt-12 ml-[-150] absolute" source={require('../assets/img/coin.png')} />
        <Text className="text-white text-2xl font-black my-20 text-center">Enter your pin</Text>
        <View className="flex-row justify-center mt-4">
          {Array.from({ length: 4 }, (_, index) => (
            <View
              key={index}
              className="w-4 h-4 rounded-full bg-transparent border-[1px] border-white my-1 mb-20 mx-2"
              style={[existingEnteredPin.length > index && styles.pinDotFilled]}
            />
          ))}
        </View>
        <Animated.View
          className="flex-row mx-10 flex-wrap justify-center mt-5"
          style={[{ transform: [{ translateX: shakeAnimation }] }]}>
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
        {!isPinCorrect && (
          <Text className="text-red-600 mt-3 text-center">Incorrect pin. Please try again.</Text>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  pinDotFilled: {
    backgroundColor: 'white',
  },
});

export default EnterExistingPinScreen;
