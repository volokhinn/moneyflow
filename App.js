import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" style={styles.AndroidSafeArea}>
        <AppNavigation />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
