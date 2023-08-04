
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { BarChart, LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default function StatsScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground
        className="h-full w-full"
        resizeMode="cover"
        source={require('../assets/img/welcomebg.png')}>
        <Text className="text-white text-3xl font-black mt-20 mx-4">Spend stats by week</Text>
        <View>
        <ScrollView horizontal={true} s className="my-6 mx-4 rounded-full">
        <BarChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={800} // from react-native
    height={200}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    }}
    bezier
    style={{
      marginVertical: 10,
      borderRadius: 16,
    }}
  />
        </ScrollView>
        </View>
        <Text className="text-white text-4xl mx-4">123</Text>
    </ImageBackground>
    </View>
  )
}