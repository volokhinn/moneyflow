import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { keywordsToIcons } from '../helpers/TransactionHelpers';

export default function BillsScreen({ transactions }) {
  function getServiceIconFromText(text, isIncome) {
    const lowercaseText = text.toLowerCase();
  
    for (const keyword in keywordsToIcons) {
      const keywordMatches = lowercaseText.includes(keyword.toLowerCase());
      if (keywordMatches) {
        return keywordsToIcons[keyword].img;
      }
    }
  
    if (isIncome) {
      return require('../assets/favicon.png');
    } else {
      return require('../assets/adaptive-icon.png');
    }
  }

  return (
    <>
      <View>
        <ImageBackground
          className="h-full w-full"
          resizeMode="cover"
          source={require('../assets/img/welcomebg.png')}>
          <Text className="text-white text-4xl font-black mt-12 mx-4 mb-2">All bills</Text>
          <ScrollView className="mx-4 mb-14">
            {transactions.map((transaction, index) => (
              <View key={index} className="flex-row justify-between items-center my-2">
                <Image
                  source={getServiceIconFromText(transaction.name, transaction.isIncome)}
                  className="h-10 w-10"
                />
                <View className="flex-column justify-between">
                  <Text className="text-white text-xl font-black">{transaction.name}</Text>
                  <Text className="text-white text-sm opacity-50">{transaction.date}</Text>
                </View>
                <Text className="text-white text-2xl font-black">
                  {transaction.isIncome ? '+ $' : '- $'}
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
}
