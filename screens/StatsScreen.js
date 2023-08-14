import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { keywordsToIcons, getCategoryExpenses } from '../helpers/TransactionHelpers';

export default function StatsScreen({ transactions }) {
  const [monthData, setMonthData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('Last week');
  const [periodExpenses, setPeriodExpenses] = useState(0);

  useEffect(() => {
    fetchTransactionDataByMonth(transactions);
    setPeriodExpenses(updatePeriodExpenses(selectedPeriod));
  }, [transactions, selectedPeriod]);

  const fetchTransactionDataByMonth = (transactions) => {
    const dataByMonth = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const [day, month, year] = transaction.date.split('.');
      const transactionMonth = parseInt(month) - 1;
      const amountToAdd = transaction.isIncome ? transaction.amount : -transaction.amount;
      dataByMonth[transactionMonth] += amountToAdd;
    });

    setMonthData(dataByMonth);
  };

  const updatePeriodExpenses = (period) => {
    const periodTotalExpenses = getPeriodExpenses(period, transactions);
    setPeriodExpenses(periodTotalExpenses);
  };

  const getPeriodExpenses = (period) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = getWeekNumber(currentDate)[1];

    const isSameYear = (transactionDate) =>
      transactionDate && transactionDate.getFullYear() === currentYear;
    const isSameMonth = (transactionDate) =>
      transactionDate && transactionDate.getMonth() === currentMonth;
    const isSameWeek = (transactionDate) =>
      transactionDate && getWeekNumber(transactionDate)[1] === currentWeek;

    let filteredTransactions = [];

    switch (period) {
      case 'Last week':
        filteredTransactions = transactions.filter(
          (transaction) =>
            isSameYear(new Date(transaction.date)) && isSameWeek(new Date(transaction.date)),
        );
        break;
      case 'Last month':
        filteredTransactions = transactions.filter(
          (transaction) =>
            isSameYear(new Date(transaction.date)) && isSameMonth(new Date(transaction.date)),
        );
        break;
      case 'Last year':
        filteredTransactions = transactions.filter((transaction) =>
          isSameYear(new Date(transaction.date)),
        );
        break;
      default:
        break;
    }

    return filteredTransactions.reduce((total, transaction) => {
      if (!transaction.isIncome) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const getWeekNumber = (date) => {
    const currentDate = date;
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + 1) / 7);
    return [currentDate.getFullYear(), weekNumber];
  };

  const totalExpenses = transactions.reduce((total, transaction) => {
    if (transaction.isIncome === false) {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  return (
    <View>
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <ScrollView className="mt-8 mb-14">
          <Text className="text-white text-4xl font-black mt-4 mx-4 mb-2">Statistics</Text>
          <Text className="text-white text-2xl font-black mt-4 mx-4">Balance stats by month</Text>
          <View>
            <ScrollView horizontal={true} s className="mt-6 mb-4 rounded-full">
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
                yAxisSuffix=""
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
          <Text className="text-white text-2xl font-black mb-4 mx-4">Spend stats by periods</Text>
          <View className="mx-1 flex-row justify-between">
            <TouchableOpacity
              className={`py-2 px-4 rounded-full border-white border-[1px] ${
                selectedPeriod === 'Last week' ? 'bg-black' : ''
              }`}
              onPress={() => setSelectedPeriod('Last week')}>
              <Text className="text-white text-sm">Last week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-2 px-4 rounded-full border-white border-[1px] ${
                selectedPeriod === 'Last month' ? 'bg-black' : ''
              }`}
              onPress={() => setSelectedPeriod('Last month')}>
              <Text className="text-white text-sm">Last month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-2 px-4 rounded-full border-white border-[1px] ${
                selectedPeriod === 'Last year' ? 'bg-black' : ''
              }`}
              onPress={() => setSelectedPeriod('Last year')}>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Entertaiments', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Entertaiments', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Restaurants', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Restaurants', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Communal Services', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Communal Services', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Shopping', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Shopping', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Transfers', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Transfers', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
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
                  <Text className="text-white font-black text-2xl ml-4">
                    $ {getCategoryExpenses('Other', transactions)}
                  </Text>
                  <Text className="text-gray-300 opacity-50 font-black text-xl ml-4 mt-2">
                    {totalExpenses === 0
                      ? '0%'
                      : `${(
                          (getCategoryExpenses('Other', transactions) / totalExpenses) *
                          100
                        ).toFixed(2)}%`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
