import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BaoCaoHieuQuaScreen from '../BaoCaoHieuQuaScreen';
import QuangCaoHetNganSachScreen from '../BaoCaoHieuQuaScreen/QuangCaoHetNganSachScreen';
import QuangCaoKhamPhaScreen from '../QuangCaoKhamPhaScreen';
import QuangCaoTimKiemScreen from '../QuangCaoTimKiemScreen';
import TongQuanScreen from '../TongQuanScreen';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Thumbnail, View} from 'native-base';
import {Image, Text} from 'react-native';
import {COLOR} from '../../theme';
import CongCuTuKhoaScreen from '../CongCuTuKhoaScreen';
import QuangCaoScreen from '../QuangCaoScreen';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let source_image;
          let tintColor = '#383C3F';
          switch (route.name) {
            case 'HomeScreen':
              source_image = require('../../assets/image/TongQuan.png');
              break;
            case 'TongQuanScreen':
              source_image = require('../../assets/image/TongQuan.png');
              break;
            case 'BaoCaoHieuQuaScreen':
              source_image = require('../../assets/image/report.png');
              break;
            case 'QuangCaoScreen':
              source_image = require('../../assets/image/ads.png');
              break;
            case 'CongCuTuKhoaScreen':
              source_image = require('../../assets/image/CCTK.png');
              break;
            default:
              source_image = require('../../assets/image/shopee.png');
              break;
          }

          return (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLOR.primary : tintColor,
              }}
              source={source_image}
            />
          );
        },
        tabBarLabel: ({focused}) => {
          let label;
          switch (route.name) {
            case 'HomeScreen':
              label = 'Tổng quan';
              break;
            case 'TongQuanScreen':
              label = 'Tổng quan';
              break;
            case 'BaoCaoHieuQuaScreen':
              label = 'Báo cáo';
              break;
            case 'QuangCaoScreen':
              label = 'Quảng cáo';
              break;
            case 'CongCuTuKhoaScreen':
              label = 'Công cụ TK';
              break;
            default:
              label = 'Shopee';
              break;
          }

          return (
            <Text
              style={{
                color: focused ? COLOR.primary : COLOR.grey,
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {label}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />

      {/* <Tab.Screen name="TongQuanScreen" component={TongQuanScreen} /> */}
      <Tab.Screen name="BaoCaoHieuQuaScreen" component={BaoCaoHieuQuaScreen} />
      <Tab.Screen name="QuangCaoScreen" component={QuangCaoScreen} />
      {/* <Tab.Screen
        name="QuangCaoKhamPhaScreen"
        component={QuangCaoKhamPhaScreen}
      />
      <Tab.Screen
        name="QuangCaoTimKiemScreen"
        component={QuangCaoTimKiemScreen}
      /> */}
      {/* <Tab.Screen name="CongCuTuKhoaScreen" component={CongCuTuKhoaScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabScreen;
