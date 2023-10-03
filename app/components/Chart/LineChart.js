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
import {Content, Spinner} from 'native-base';
import moment from 'moment';
import {formatMoney} from '../../helpers/formatNumber';

const LineChartCustom = props => {
  const {labels, data} = props;
  const dataHide = () => {
    const a = 4;
    const y = Math.floor(data.length / a);
    const di = data.map((item, index) => {
      return index;
    });
    const dh = di.filter(item => {
      return item % y != 0;
    });
    return dh;
  };
  if (labels.length > 0 && data.length > 0) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
                color: (opacity = 1) => COLOR.secondaryDark,
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
                color: (opacity = 1) => `#fc7819`,
              },
            ],
          }}
          hidePointsAtIndex={dataHide()}
          formatYLabel={i => {
            return formatMoney(i);
          }}
          formatXLabel={i => {
            return i;
          }}
          width={Dimensions.get('window').width - 10} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          // yAxisInterval={10} // optional, defaults to 1
          // getDotColor={(dataPoint, dataPointIndex) => {
          //   if (dataPoint > 70 || dataPoint < 35) return '#ff0000'; // red
          //   else return '#00ff00'; // green
          // }}
          // xAxisLabel={{
          // }}
          segments={4}
          chartConfig={{
            backgroundColor: COLOR.white,
            backgroundGradientFrom: COLOR.white,
            backgroundGradientTo: COLOR.white,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0)`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0)`,
            style: {
              borderRadius: 16,
            },
            fillShadowGradientFrom: COLOR.secondaryDark,
            fillShadowGradientTo: COLOR.white,
            propsForDots: {
              r: '0',
              strokeWidth: '0',
              stroke: COLOR.secondary,
            },
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    );
  }

  return (
    <Content>
      <Spinner color={COLOR.secondary} />
    </Content>
  );
};

export default LineChartCustom;
