import {
  Body,
  Button,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Switch,
  Thumbnail,
  Title,
  View,
} from 'native-base';
import * as React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import styles from './styles';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { COLOR } from './../../theme/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { getItem } from '../../commons/AsyncStorageUtils';
import { formatMoney } from '../../helpers/formatNumber';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/LoginScreen/actions';
import { showModalPrompt } from '../Modal/ModalPrompt/actions';

const DrawerMenu = props => {
  const { navigation } = props;
  const [autoApDungGoi, setAutoApDungGoi] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();

  const data = [
    {
      title: 'Chức năng',
      ValueList: [
        // {
        //   title: 'Tổng quan',
        //   icon: 'bar-chart-o',
        //   onPressButton: () => {
        //     navigation.navigate('TongQuanScreen');
        //   },
        // },
        // {
        //   title: 'Báo cáo hiệu quả',
        //   icon: 'list-alt',
        //   onPressButton: () => {
        //     navigation.navigate('BaoCaoHieuQuaScreen');
        //   },
        // },
        // {
        //   title: 'Quảng cáo tìm kiếm',
        //   icon: 'briefcase',
        //   onPressButton: () => {
        //     navigation.navigate('QuangCaoTimKiemScreen');
        //   },
        // },
        // {
        //   title: 'Quảng cáo khám phá',
        //   icon: 'briefcase',
        //   onPressButton: () => {
        //     navigation.navigate('QuangCaoKhamPhaScreen');
        //   },
        // },
        // {
        //   title: 'Công cụ từ khóa',
        //   icon: 'search',
        //   onPressButton: () => {
        //     navigation.navigate('CongCuTuKhoaScreen');
        //   },
        // },
        {
          title: 'Tài khoản quản lý',
          icon: 'inbox',
          onPressButton: () => {
            navigation.navigate('QuanLyShopScreen');
          },
        },
        // {
        //   title: 'Đăng xuát',
        //   icon: 'sign-out',
        //   onPressButton: () => {
        //     dispatch(
        //       showModalPrompt(
        //         {title: 'Thông báo', text: 'Bạn có chắc chắn đăng xuất'},
        //         {callbackSuccess: () => onLogout()},
        //       ),
        //     );
        //   },
        // },
      ],
    },
  ];

  useEffect(async () => {
    const info = await getItem('userInfo');
    console.log('userInfor ', info);
    setUserInfo(info);
  }, []);

  const onLogout = () => {
    dispatch(
      logout({
        callbackSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        },
      }),
    );
  };

  const renderListMenu = data.map((item, index) => {
    return (
      <View key={index}>
        {/* <ListItem itemDivider>
          <Text>{item.title}</Text>
        </ListItem> */}
        {item.ValueList.map((i, index) => {
          return (
            <ListItem onPress={i.onPressButton} icon key={index}>
              <Left>
                <Icon name={i.icon} size={16} color={COLOR.primary} />
              </Left>
              <Body>
                <Text>{i.title}</Text>
              </Body>
            </ListItem>
          );
        })}
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: '100%',
          paddingTop: 0,
        }}
        source={{
          uri: 'https://img.pikbest.com/backgrounds/20220119/business-curve-blue-sci-tech-style-banner_6239878.jpg!bw700',
        }}>
        <View style={styles.userSection}>
          <Thumbnail
            style={styles.avatar}
            square
            source={require(`../../assets/image/tiktok_banner.png`)}
          />
          <View style={styles.userInfo}>
            <Text style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', color: COLOR.white }}>
                {userInfo?.display_name}
              </Text>
            </Text>
            <Text style={{ color: COLOR.white }}>
              <Icon
                style={{
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                name="circle"
                size={16}
                color={COLOR.active}
              />{' '}
              Hoạt động
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 15, backgroundColor: '#F1F1F1' }}>
          <View style={{ marginBottom: 10 }}>
            <Text>
              Gói :{' '}
              <Text
                style={{
                  color: COLOR.secondaryDark,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Atosa VIP
              </Text>
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text>Tự động áp dụng gói : </Text>
            <Switch value={autoApDungGoi} onValueChange={setAutoApDungGoi} />
          </View> */}
        </View>
        <List>{renderListMenu}</List>
      </View>
      <Button
        onPress={() => {
          dispatch(
            showModalPrompt(
              { title: 'Thông báo', text: 'Bạn có chắc chắn đăng xuất' },
              { callbackSuccess: () => onLogout() },
            ),
          );
        }}
        block
        style={[
          {
            backgroundColor: COLOR.primary,
            marginTop: 20,
            margin: 20,
            borderRadius: 6,
          },
        ]}>
        <Text style={[styles.textButton, { color: 'white' }]}>Đăng xuất</Text>
      </Button>
      {/* <DrawerContentScrollView
        style={{padding: 0}}
        {...props}></DrawerContentScrollView> */}
    </View>
  );
};

export default DrawerMenu;
