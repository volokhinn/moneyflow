import { View, Text, ImageBackground, Image } from 'react-native';
import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import {keywordsToIcons} from '../helpers/TransactionHelpers';

export default function HomeScreen({ transactions }) {
  const calculateIncome = () => {
    let incomeSum = 0;
    transactions.forEach((transaction) => {
      if (transaction.isIncome) {
        incomeSum += +transaction.amount;
      }
    });
    return incomeSum;
  };

  const calculateExpense = () => {
    let expenseSum = 0;
    transactions.forEach((transaction) => {
      if (!transaction.isIncome) {
        expenseSum += +transaction.amount;
      }
    });
    return expenseSum;
  };

  const lastThreeTransactions = transactions.slice(-3);

  const status = ['Things may come', 'Things may come 111']

  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <View
          className="flex-row justify-between mt-20 rounded-3xl mx-2"
          style={{ backgroundColor: '#333' }}>
          <View className="flex-column justify-between my-4 mx-3">
            <Text className="text-white text-[24px]">Stats</Text>
            <View className="mt-6">
              <Text className="text-white text-[24px] font-black">$ {calculateIncome()}</Text>
              <Text className="text-white text-[18px] opacity-40 font-black">Total earning</Text>
            </View>
            <View className="mt-6">
              <Text className="text-white text-[24px] font-black">$ {calculateExpense()}</Text>
              <Text className="text-white text-[18px] opacity-40 font-black">Total expense</Text>
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
              <View className="h-40 mt-4">
              <Swiper horizontal={false} width={100} loop autoplay autoplayTimeout={10} height={0} showsPagination={false}>
                <View>
                  <Text className="text-white text-[14px]">
                    Things may come and go, but our bills are a constant. Keep them
                    on track with ease
                  </Text>
                </View>
                <View>
                  <Text className="text-white text-[14px]">
                  In order to understand that happiness is not in money, you first need to know both – happiness and money.
                  </Text>
                </View>
              </Swiper>
              </View>
            </LinearGradient>
          </View>
        </View>
        <View className="mx-4 mt-6">
          <Text className="text-white text-4xl font-black mb-2">Recent bills</Text>
          {transactions.length ? (
            lastThreeTransactions.map((transaction, index) => (
              <View key={index} className="flex-row justify-between items-center my-2">
                {transaction.name.toLowerCase().replace(/\s/g, '') in keywordsToIcons ? (
                  <Image
                    source={keywordsToIcons[transaction.name.toLowerCase()]?.img}
                    className="h-10 w-10"
                  />
                ) : transaction.isIncome ? (
                  <Image source={require('../assets/adaptive-icon.png')} className="h-10 w-10" />
                ) : (
                  <Image source={require('../assets/favicon.png')} className="h-10 w-10" />
                )}
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">{transaction.name}</Text>
                  <Text className="text-white text-sm opacity-50">{transaction.date}</Text>
                </View>
                <Text className="text-white text-2xl font-black">
                  {transaction.isIncome ? '+ $' : '- $'}
                  {transaction.amount}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-white text-2xl self-center mt-16 font-black">Not found</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
