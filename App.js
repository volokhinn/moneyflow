import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

NavigationBar.setBackgroundColorAsync('#000');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewNewUser, setIsNNewewUser] = useState(true); // Добавляем состояние для isNewUser

  useEffect(() => {
    // Загружаем isNewUser из AsyncStorage
    const loadIsNewUser = async () => {
      try {
        const savedIsNewUser = await AsyncStorage.getItem('isNewUser');
        setIsNNewewUser(savedIsNewUser === 'true');
      } catch (error) {
        console.error('Error loading isNewUser:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      loadIsNewUser(); // Загружаем isNewUser после прелоадера
    }, 3000);
  }, []);

  let [fontLoaded] = useFonts({
    Inter400: require('./assets/fonts/Inter-Regular.ttf'),
    Inter100: require('./assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontLoaded) {
    // Верните компонент загрузки шрифтов
    return (
      <View className="flex-1 bg-black">
        <Text className="text-white text-4xl font-black text-center mt-32">Moneyflow</Text>
        <LottieView source={require('./assets/animation_ll920dee.json')} autoPlay loop />
      </View>
    );
  }

  return (
    <>
      <StatusBar translucent style="light" />
      {isLoading ? (
        <View className="flex-1 bg-black">
          <Text className="text-white text-4xl font-black text-center mt-32">Moneyflow</Text>
          <LottieView source={require('./assets/animation_ll920dee.json')} autoPlay loop />
        </View>
      ) : (
        <AppNavigation isNewNewUser={isNewNewUser} /> // Передаем isNewUser в AppNavigation
      )}
    </>
  );
}
