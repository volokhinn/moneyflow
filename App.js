import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

NavigationBar.setBackgroundColorAsync('#000');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ваш код для загрузки данных или выполнения других инициализационных действий
    setTimeout(() => {
      setIsLoading(false); // Здесь выключаем прелоадер после завершения загрузки
    }, 2000); // Пример: имитация задержки в 2 секунды
  }, []);

  let [fontLoaded] = useFonts({
    Inter400: require('./assets/fonts/Inter-Regular.ttf'),
    Inter100: require('./assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontLoaded) {
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="black" />
    </View>;
  }

  return (
    <>
      <StatusBar translucent style="light" />
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <AppNavigation />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
