import React, {Component} from 'react';
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
import {COLOR} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StatusBar, TouchableOpacity, Image} from 'react-native';
import {showModalSelectShop} from '../../features/MainScreen/actions';

const HeaderTab = props => {
  const {title} = props;
  const {renderItemLeft, renderItemRight} = props;
  const dispatch = useDispatch();
  const currentShop = useSelector(store => store.account.currentShop);

  return (
    <Header
      // androidStatusBarColor={COLOR.primary}
      style={{
        backgroundColor: COLOR.light,
        borderBottomColor: COLOR.light,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Title
          style={{
            color: COLOR.black,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {title}
        </Title>
        {/* <View>{renderItemLeft}</View> */}

        <View>
          {renderItemRight ? (
            renderItemRight
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(showModalSelectShop());
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
              transparent
              block>
              <Text
                style={{fontWeight: 'bold', color: COLOR.greyDark}}
                numberOfLines={1}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/image/store1.png')}
                />{' '}
                {currentShop.username}{' '}
                <Icon name="caret-down" color={COLOR.grey} size={16} />
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <Left></Left>
      <Body style={{backgroundColor: 'red'}}>
        <Title>{title}</Title>
      </Body>
      <Right></Right> */}
    </Header>
  );
};

export default HeaderTab;
