import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/LoginScreen';
import RegisterScreen from '../features/LoginScreen/RegisterScreen/index';
import HomeScreen from '../features/MainScreen/HomeScreen';
import TongQuanScreen from '../features/TongQuanScreen';
import UserScreen from '../features/UserScreen/index';
import MainScreen from '../features/MainScreen';
import CongCuTuKhoaScreen from './../features/CongCuTuKhoaScreen/index';
import QuangCaoTimKiemScreen from './../features/QuangCaoTimKiemScreen/index';
import QuangCaoKhamPhaScreen from './../features/QuangCaoKhamPhaScreen/index';
import BaoCaoHieuQuaScreen from './../features/BaoCaoHieuQuaScreen/index';
import QuangCaoHetNganSachScreen from './../features/BaoCaoHieuQuaScreen/QuangCaoHetNganSachScreen';
import QuanLyShopScreen from './../features/QuanLyShopScreen/index';
import SplashScreen from './../features/SplashScreen/index';
import AdsDetailScreen from './../features/AdsDetailScreen/index';
import TaoQuangCaoScreen from '../features/TaoQuangCaoScreen';
import KeywordFileDetailScreen from '../features/CongCuTuKhoaScreen/KeywordFileDetailScreen';
import KeywordForProductScreen from '../features/CongCuTuKhoaScreen/KeywordForProductScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingQCKPScreen from '../features/TaoQuangCaoScreen/SettingQCKPScreen';
import DanhSachTuKhoaDaChonScreen from '../features/CongCuTuKhoaScreen/DanhSachTuKhoaDaChonScreen';
import TongQuanProductScreen from '../features/TongQuanScreen/TongQuanProductScreen';
import BaoCaoProductScreen from '../features/BaoCaoHieuQuaScreen/BaoCaoProductScreen';
import AdsDetailKeywordScreen from '../features/AdsDetailScreen/AdsDetailKeywordScreen';

const Stack = createStackNavigator();

const Screens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="TongQuanScreen" component={TongQuanScreen} />
      <Stack.Screen
        name="TongQuanProductScreen"
        component={TongQuanProductScreen}
      />
      <Stack.Screen
        name="BaoCaoHieuQuaScreen"
        component={BaoCaoHieuQuaScreen}
      />
      <Stack.Screen
        name="BaoCaoProductScreen"
        component={BaoCaoProductScreen}
      />
      <Stack.Screen
        name="QuangCaoHetNganSachScreen"
        component={QuangCaoHetNganSachScreen}
      />
      <Stack.Screen
        name="QuangCaoKhamPhaScreen"
        component={QuangCaoKhamPhaScreen}
      />
      <Stack.Screen
        name="QuangCaoTimKiemScreen"
        component={QuangCaoTimKiemScreen}
      />
      <Stack.Screen name="CongCuTuKhoaScreen" component={CongCuTuKhoaScreen} />
      <Stack.Screen name="SettingQCKPScreen" component={SettingQCKPScreen} />
      <Stack.Screen name="QuanLyShopScreen" component={QuanLyShopScreen} />
      <Stack.Screen name="AdsDetailScreen" component={AdsDetailScreen} />
      <Stack.Screen name="AdsDetailKeywordScreen" component={AdsDetailKeywordScreen} />
      <Stack.Screen name="TaoQuangCaoScreen" component={TaoQuangCaoScreen} />
      <Stack.Screen
        name="KeywordFileDetailScreen"
        component={KeywordFileDetailScreen}
      />
      <Stack.Screen
        name="KeywordForProductScreen"
        component={KeywordForProductScreen}
      />
      <Stack.Screen
        name="DanhSachTuKhoaDaChonScreen"
        component={DanhSachTuKhoaDaChonScreen}
      />
    </Stack.Navigator>
  );
};

export default Screens;
