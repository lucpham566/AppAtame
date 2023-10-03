import React, { Component } from 'react';
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
} from 'native-base';
import { COLOR } from '../../theme';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar, TouchableOpacity } from 'react-native';

const HeaderTitle = props => {
  const { title } = props;
  const { renderItemLeft, renderItemRight } = props;
  return (
    <Header
      // androidStatusBarColor={COLOR.primary}
      style={{
        backgroundColor: COLOR.white,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.white,
        shadowColor: COLOR.whites,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5
        }}>
        <View>{renderItemLeft}</View>
        <Title style={{ color: COLOR.black, textAlign: 'center' }}>{title}</Title>
        <View></View>
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

export default HeaderTitle;
