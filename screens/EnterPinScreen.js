import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterPinScreen = ({ navigation }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isPinCorrect, setIsPinCorrect] = useState(true);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const handleKeyPress = (key) => {
    if (isChecking) return;

    if (key === '<') {
      setEnteredPin(enteredPin.slice(0, -1));
    } else if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + key);
    }
  };

  useEffect(() => {
    if (enteredPin.length === 4) {
      setIsChecking(true);
      checkPin();
    }
  }, [enteredPin]);

  const checkPin = async () => {
    try {
      const savedPin = await AsyncStorage.getItem('pin');
      if (enteredPin === savedPin) {
        setIsPinCorrect(true);
        navigation.navigate('Home');
      } else {
        setIsPinCorrect(false);
        Animated.sequence([
          Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]).start(() => {
          setIsChecking(false);
          setEnteredPin('');
        });
      }
    } catch (error) {
      console.error('Error checking pin:', error);
    }
  };

  return (
    <View>
      <Text>Enter your pin:</Text>
      <View style={styles.pinContainer}>
        {Array.from({ length: 4 }, (_, index) => (
          <View
            key={index}
            style={[styles.pinDot, enteredPin.length > index && styles.pinDotFilled]}
          />
        ))}
      </View>
      <Animated.View style={[styles.keyboard, { transform: [{ translateX: shakeAnimation }] }]}>
        {Array.from({ length: 9 }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleKeyPress(index + 1)}
            style={styles.key}>
            <Text style={styles.keyText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => handleKeyPress(0)} style={styles.key}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress('<')} style={styles.key}>
          <Text style={styles.keyText}>←</Text>
        </TouchableOpacity>
      </Animated.View>
      {!isPinCorrect && <Text style={styles.errorText}>Incorrect pin. Please try again.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 5,
  },
  pinDotFilled: {
    backgroundColor: 'black',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  keyText: {
    fontSize: 24,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default EnterPinScreen;
