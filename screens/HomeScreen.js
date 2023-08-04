import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
          <View className="flex-row justify-between mt-20 rounded-3xl mx-2" style={{backgroundColor: '#333'}}>
            <View className="flex-column justify-between my-4 mx-3">
              <Text className="text-white text-[24px]">Stats</Text>
              <View className="mt-6">
              <Text className="text-white text-[24px] font-black">$ 1090,03</Text>
              <Text className="text-white text-[18px] opacity-40 font-black">Total earning</Text>
              </View>
              <View className="mt-6">
              <Text className="text-white text-[24px] font-black">$ 613</Text>
              <Text className="text-white text-[18px] opacity-40 font-black">Total earning</Text>
              </View>
            </View>
            <View className="flex-column justify-between mt-2 mr-4">
            <LinearGradient
              colors={['rgba(66, 66, 66, 1)', 'rgba(48, 48, 48, 0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ padding: 1 }}
              className="p-3 rounded-xl">
              <Image source={require('../assets/img/lamp.png')} />
              <Text className="text-white text-[14px] mt-4"> Things may come {"\n"} and go, but our {"\n"} bills are a constant. {"\n"} Keep them on track {"\n"} with ease</Text>
            </LinearGradient>
            </View>
          </View>
          <View className="mx-4 mt-6">
            <Text className="text-white text-4xl font-black mb-2">Recent bills</Text>
              <View className="flex-row justify-between items-center my-2">
                <Image source={require('../assets/img/services/steam.png')} />
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">Steam Game</Text>
                  <Text className="text-white text-sm opacity-50">05/05/23</Text>
                </View>
                <Text className="text-white text-2xl font-black">$ 69.00</Text>
              </View>
              <View className="flex-row justify-between items-center my-2">
                <Image source={require('../assets/img/services/steam.png')} />
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">Steam Game</Text>
                  <Text className="text-white text-sm opacity-50">05/05/23</Text>
                </View>
                <Text className="text-white text-2xl font-black">$ 69.00</Text>
              </View>
              <View className="flex-row justify-between items-center my-2">
                <Image source={require('../assets/img/services/steam.png')} />
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">Steam Game</Text>
                  <Text className="text-white text-sm opacity-50">05/05/23</Text>
                </View>
                <Text className="text-white text-2xl font-black">$ 69.00</Text>
              </View>
              
              
          </View>
      </ImageBackground>
    </View>
  );
}
