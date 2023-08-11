// CreatePinScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePinScreen = ({ navigation }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [pinDotScale] = useState(new Animated.Value(1));

  const handleKeyPress = (key) => {
    if (key === '<') {
      setEnteredPin(enteredPin.slice(0, -1));
    } else if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + key);
    }
  };

  useEffect(() => {
    if (enteredPin.length === 4) {
      savePin();
    }
  }, [enteredPin]);

  const savePin = async () => {
    try {
      await AsyncStorage.setItem('pin', enteredPin);
      await AsyncStorage.setItem('isNewUser', 'false');
      navigation.navigate('EnterPin');
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };

  return (
    <View>
      <Text>Create your pin:</Text>
      <View style={styles.pinContainer}>
        {Array.from({ length: 4 }, (_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.pinDot,
              enteredPin.length > index && styles.pinDotFilled,
              { transform: [{ scale: enteredPin.length === index ? pinDotScale : 1 }] },
            ]}
          />
        ))}
      </View>
      <View style={styles.keyboard}>
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
      </View>
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
});

export default CreatePinScreen;
