import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCategoryByTransactionName, categories } from '../helpers/TransactionHelpers';

export default function StatsScreen({ transactions }) {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    fetchTransactionDataByMonth(transactions); // Вызываем функцию для обновления данных графика
  }, [transactions]);

  const fetchTransactionDataByMonth = (transactions) => {
    const dataByMonth = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const [day, month, year] = transaction.date.split('.');
      const transactionMonth = parseInt(month) - 1;
      const amountToAdd = transaction.isIncome ? transaction.amount : 0;
      dataByMonth[transactionMonth] += amountToAdd;
    });

    setMonthData(dataByMonth);
  };

  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <ScrollView className="mt-8 mb-14">
          <Text className="text-white text-2xl font-black mt-20 mx-4">Spend stats by month</Text>
          <View>
            <ScrollView horizontal={true} s className="my-6 rounded-full">
              <BarChart
                backgroundColor="black"
                data={{
                  labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [{ data: monthData }],
                }}
                width={800}
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                withInnerLines={false}
                showBarTops={false}
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: 'black',
                  backgroundGradientTo: '#3434343d',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  fillShadowGradient: 'gray',
                  fillShadowGradientOpacity: 0.5,
                  barRadius: 15,
                  barPercentage: 0.8,
                }}
                fromZero={true}
                style={{
                  borderRadius: 16,
                  alignSelf: 'flex-start',
                }}
              />
            </ScrollView>
          </View>
          <View className="mx-1 flex-row justify-between">
            <TouchableOpacity
              className="py-2 px-4 rounded-full border-white border-[1px]"
              style={{ backgroundColor: 'black' }}
              onPress={() => setWeek(true)}>
              <Text className="text-white text-sm">Last week</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 rounded-full border-white border-[1px]">
              <Text className="text-white text-sm">Last month</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2 px-4 rounded-full border-white border-[1px]">
              <Text className="text-white text-sm">Last year</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row space-x-4 mx-1 mt-6 mb-2">
            <View
              className="p-2 rounded-xl w-[47%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Entertaiments</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/entertaiments.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
            <View
              className="p-2 rounded-xl w-[47%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Restaurants</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/restaurants.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row space-x-4 mx-1 mt-2 mb-2">
            <View
              className="p-2 rounded-xl w-[54%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Сommunal services</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/communal.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
            <View
              className="p-2 rounded-xl w-[40%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Shopping</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/shopping.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row space-x-4 mx-1 mt-2 mb-2">
            <View
              className="p-2 rounded-xl w-[47%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Transfers</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/transfer.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
            <View
              className="p-2 rounded-xl w-[47%]"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
              <Text className="text-white text-base font-black mb-1">Other</Text>
              <View className="flex-row items-center">
                <Image source={require('../assets/img/services/other.png')} />
                <View>
                  <Text className="text-white font-black text-2xl ml-4">$ 106</Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">50%</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
