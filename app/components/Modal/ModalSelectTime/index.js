import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  BottomModalScrollable,
  BottomModalScrollableRef,
} from 'react-native-bottom-modal-scrollable';
import {Modalize} from 'react-native-modalize';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Button,
  ListItem,
  Left,
  Body,
  List,
} from 'native-base';
import {COLOR} from '../../../theme';
const srcImage1 = require(`../../../assets/image/calendar_1.png`);
const srcImage2 = require(`../../../assets/image/calendar_2.png`);
const srcImage3 = require(`../../../assets/image/calendar_3.png`);
const srcImage4 = require(`../../../assets/image/calendar_4.png`);

const ModalSelectTime = prop => {
  const {modalizeRef, value, setOptionFilter} = prop;

  const listOptionFilter = [
    {name: 'Hôm nay', value: 'real_time'},
    {name: 'Hôm qua', value: 'yesterday'},
    {name: '7 ngày vừa qua', value: 'past7days'},
    {name: '30 ngày vừa qua', value: 'past30days'},
  ];

  const renderListPicker = listOptionFilter.map((i, index) => {
    let srcImage = null;
    switch (index + 1) {
      case 1:
        srcImage = srcImage1;
        break;
      case 2:
        srcImage = srcImage2;
        break;
      case 3:
        srcImage = srcImage3;
        break;
      case 4:
        srcImage = srcImage4;
        break;
      default:
        srcImage = srcImage1;
        break;
    }
    return (
      <TouchableOpacity
        key={index}
        style={{
          borderBottomColor: 'white',
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }}
        onPress={() => {
          setOptionFilter(i.value);
          modalizeRef.current.close();
        }}
        icon>
        <Image
          style={{width: 24, height: 24, marginRight: 10}}
          source={srcImage}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: i.value === value ? COLOR.primary : COLOR.black,
          }}>
          {i.name}
        </Text>
      </TouchableOpacity>
      // <ListItem
      //   key={index}
      //   style={{borderBottomColor: 'white'}}
      //   onPress={() => {
      //     setOptionFilter(i.value);
      //     modalizeRef.current.close();
      //   }}
      //   icon>
      //   <Left>
      //     <Button style={{backgroundColor: COLOR.primary}}>
      //       <Image
      //         style={{width: 20, height: 20, tintColor: COLOR.white}}
      //         source={srcImage}
      //       />
      //     </Button>
      //   </Left>
      //   <Body>
      //     <Text
      //       style={{
      //         color: i.value === value ? COLOR.primary : COLOR.black,
      //       }}>
      //       {i.name}
      //     </Text>
      //   </Body>
      // </ListItem>
    );
  });

  return (
    <Modalize
      handlePosition="inside"
      scrollViewProps={{showsVerticalScrollIndicator: true}}
      snapPoint={300}
      ref={modalizeRef}>
      <View style={styles.modalBox}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.black,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Ngày đặt sẵn
        </Text>
        <List>{renderListPicker}</List>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 20,
  },
  shopItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: COLOR.greyLight,
    borderWidth: 1,
    borderRadius: 5,
  },
  shopActive: {
    borderColor: COLOR.success,
  },
});

export default ModalSelectTime;
