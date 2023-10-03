import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  BottomModalScrollable,
  BottomModalScrollableRef,
} from 'react-native-bottom-modal-scrollable';
import { Modalize } from 'react-native-modalize';

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
import { COLOR } from '../../../theme';
const srcImage1 = require(`../../../assets/image/arrow-down-a-z.png`);
const srcImage2 = require(`../../../assets/image/arrow-down-z-a.png`);
const srcImage3 = require(`../../../assets/image/arrow-down-1-9.png`);
const srcImage4 = require(`../../../assets/image/arrow-down-9-1.png`);
const srcImage5 = require(`../../../assets/image/arrow-down-short-wide.png`);
const srcImage6 = require(`../../../assets/image/arrow-down-wide-short.png`);

const ModalSelectSort = prop => {
  const { modalizeRef, value, onSellect } = prop;

  const dataOptionOder = [
    {
      name: 'Tên từ A - Z',
      value: 'nameASC',
    },
    {
      name: 'Tên từ Z - A',
      value: 'nameDESC',
    },
    {
      name: 'Doanh thu từ thấp đến cao',
      value: 'gmvASC',
    },
    {
      name: 'Doanh thu từ cao đến thấp',
      value: 'gmvDESC',
    },
    {
      name: 'Lượt xem từ thấp đến cao',
      value: 'clickASC',
    },
    {
      name: 'Lượt xem từ cao đến thấp',
      value: 'clickDESC',
    },
  ];

  const renderListPicker = dataOptionOder.map((i, index) => {
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
      case 5:
        srcImage = srcImage5;
        break;
      case 6:
        srcImage = srcImage6;
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
          onSellect(i.value);
          modalizeRef.current.close();
        }}
        icon>
        <Image
          style={{ width: 24, height: 24, marginRight: 10 }}
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
    );
  });

  return (
    <Modalize
      handlePosition="inside"
      scrollViewProps={{ showsVerticalScrollIndicator: true }}
      snapPoint={400}
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
          Sắp xếp dữ liệu
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

export default ModalSelectSort;
