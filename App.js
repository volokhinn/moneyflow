import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

NavigationBar.setBackgroundColorAsync('#000');

export default function App() {
  let [fontLoaded] = useFonts({
    Inter400: require('./assets/fonts/Inter-Regular.ttf'),
    Inter100: require('./assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontLoaded) {
    <ActivityIndicator size={20} color="black" />;
  }

  return (
    <>
      <StatusBar style="light" />
      {/* <SafeAreaView className="flex-1" style={styles.AndroidSafeArea}> */}
      <AppNavigation />
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
