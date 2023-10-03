import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {COLOR} from '../../theme';

const Chart = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <LineChart
        data={{
          labels: [
            '0',
            '3',
            '4',
            '7',
            '9',
            '15',
            '0',
            '3',
            '4',
            '7',
            '9',
            '15',
            '0',
            '3',
            '4',
            '7',
            '9',
            '15',
            '3',
            '4',
            '7',
            '9',
            '15',
          ],
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
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: (opacity = 1) => `#fc7819`,
            },
            // {
            //   data: [
            //     Math.random() * 100,
            //     Math.random() * 100,
            //     Math.random() * 100,
            //     Math.random() * 100,
            //     Math.random() * 100,
            //     Math.random() * 100,
            //   ],
            //   color: (opacity = 1) => `#fc7819`,
            // },
          ],
        }}
        // hidePointsAtIndex={[1,3,5,7,9,11]}
        formatXLabel={(i) => {
          console.log(i);
          return '2'
        }}
        width={Dimensions.get('window').width + 40} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        // yAxisInterval={10} // optional, defaults to 1
        getDotColor={(dataPoint, dataPointIndex) => {
          console.log(dataPointIndex);
          if (dataPoint > 70 || dataPoint < 35) return '#ff0000'; // red
          else return '#00ff00'; // green
        }}
        // xAxisLabel={{
        // }}
        segments={6}
        chartConfig={{
          backgroundColor: COLOR.white,
          backgroundGradientFrom: COLOR.white,
          backgroundGradientTo: COLOR.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0)`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0)`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '0',
            // stroke: COLOR.greyLight,
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingLeft: 16,
        }}
      />
    </View>
  );
};

export default Chart;
