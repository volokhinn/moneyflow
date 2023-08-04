import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <View className="flex-1 relative">
          <Image className="mt-12 ml-[-150]" source={require('../assets/img/coin.png')} />
          <View className="mx-2 mt-12">
            <Text className="text-white font-bold text-[24px]">MoneyFlow</Text>
            <Text className="text-white font-black text-[48px] mt-2">
              Your Personal Banking App
            </Text>
            <Text className="text-white font-normal text-[16px] mt-2">
              Manage finances, pay bills, transfer funds, track expenses securely and easily from
              your mobile device.
            </Text>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.00)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ padding: 1 }}
              className="rounded-full mt-10">
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="flex-row justify-between items-center rounded-full p-4"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                <Text className="text-white text-2xl uppercase font-semibold tracking-[2px]">
                  Start free trial
                </Text>
                <ArrowRightIcon size={25} color={'white'} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
