import React, {Component, useState} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  H3,
  Thumbnail,
  View,
  Drawer,
} from 'native-base';
import {COLOR} from '../../theme';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {showModalPrompt} from '../Modal/ModalPrompt/actions';
import {logout} from '../../features/LoginScreen/actions';

const HeaderMain = props => {
  const {title, navigation} = props;

  const dispatch = useDispatch();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onLogout = () => {
    dispatch(
      logout({
        callbackSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        },
      }),
    );
  };

  return (
    <Header
      // androidStatusBarColor={COLOR.white}
      style={{
        backgroundColor: null,
        borderBottomWidth: 0,
        borderBottomColor: COLOR.primary,
        backgroundColor: 'transparent',

        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <View>
          <TouchableOpacity onPress={toggleDrawer} style={{paddingRight: 50}}>
            <Icon size={24} color={COLOR.white} name="bars" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Thumbnail
            style={{width: 40, height: 40, marginRight: 5}}
            square
            source={{
              uri: 'https://atosa.asia/wp-content/uploads/2022/05/Logo-Atosa-Shopee-02.png',
            }}
          /> */}
          <Title>{title}</Title>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.primary,
              width: 40,
              height: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              dispatch(
                showModalPrompt(
                  {title: 'Thông báo', text: 'Bạn có chắc chắn đăng xuất'},
                  {callbackSuccess: () => onLogout()},
                ),
              );
            }}>
            <Icon size={24} color={COLOR.white} name="sign-out" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Left>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={20} color={COLOR.white} name="chevron-left" />
      </TouchableOpacity>
    </Left>
    <Body style={{backgroundColor: 'red'}}>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Button
        onPress={() => navigation.navigate('UserWishlist')}
        transparent></Button>
    </Right> */}
    </Header>
  );
};

export default HeaderMain;
