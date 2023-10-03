import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { Input, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const OptionItem = ({ item, toggleFilterList }) => {
  const [bieuThuc, setBieuThuc] = useState(item.bieuThuc ? item.bieuThuc : '>');

  const dataBieuThuc = ['>', '<', '='];

  const onchangeBieuThuc = (bieuthucNew) => {
    setBieuThuc(bieuthucNew)
    toggleFilterList({
      ...item,
      bieuThuc: bieuthucNew,
    });
  }

  const onchangeValue = value => {
    toggleFilterList({
      ...item,
      bieuThuc: bieuThuc,
      data: value,
    });
  };

  const onReset = () => {
    toggleFilterList({
      ...item,
      bieuThuc: '>',
      data: '',
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
      }}>
      <Text style={{ width: 100 }} numberOfLines={1}>
        {item.name}
      </Text>
      <View
        style={{
          width: Platform.OS === 'ios' ? 65 : 50,
          borderWidth: 1,
          height: 30,
          borderRadius: 5,
          borderColor: COLOR.greyLight,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {Platform.OS === 'android' && <Text>{bieuThuc}</Text>}
        <Picker
          style={{ padding: 0 }}
          mode="dropdown"
          iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
          selectedValue={bieuThuc}
          onValueChange={onchangeBieuThuc}
          placeholder="chọn biểu thức"
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff">
          {dataBieuThuc.map((i, index) => {
            return (
              <Picker.Item
                key={index}
                style={{ fontSize: 13 }}
                label={i}
                value={i}
              />
            );
          })}
        </Picker>
      </View>
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Input
          keyboardType="numeric"
          onChangeText={onchangeValue}
          value={item.data ? item.data : ''}
          style={{
            borderWidth: 1,
            height: 30,
            borderRadius: 5,
            borderColor: COLOR.greyLight,
            fontSize: 13,
            padding: 0,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={onReset}
        style={{
          backgroundColor: COLOR.white,
          borderColor: COLOR.danger,
          borderWidth: 1,
          padding: 5,
          borderRadius: 3,
        }}>
        <Text style={{ color: COLOR.danger }}>
          <Icon name="times-circle" color={COLOR.danger} size={16} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionItem;
