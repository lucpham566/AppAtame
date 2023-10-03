import React, {useEffect, useState} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getShopReportCompare, removeShopReportCompare} from '../actions';
import RNPickerSelect from 'react-native-picker-select';
import {Container, Header, Content, Form, Item, Picker} from 'native-base';

function ModalCompare(props) {
  const currentShop = useSelector(store => store.account.currentShop);
  const {optionFilterCompare, setOptionFilterCompare} = props;
  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = time => {
    const data = {
      id: currentShop?._id,
      optionFilter: 'day',
      date: time.getDay(),
      month: time.getMonth(),
      year: time.getFullYear(),
    };
    dispatch(getShopReportCompare(data));
  };

  useEffect(() => {
    if (optionFilterCompare) {
      const data = {
        id: currentShop?._id,
        optionFilter: optionFilterCompare,
        date: null,
        month: null,
        year: null,
      };
      dispatch(getShopReportCompare(data));
    } else {
      dispatch(removeShopReportCompare());
    }
  }, [optionFilterCompare]);

  return (
    <View style={{flex: 1}}>
      <Form>
        <Picker
          style={{
            backgroundColor: COLOR.white,
            borderColor: COLOR.secondary,
            borderWidth: 1,
            padding: 5,
            borderRadius: 3,
          }}
          mode="dialog"
          selectedValue={optionFilterCompare}
          onValueChange={setOptionFilterCompare}
          placeholder="Đối chiếu dữ liệu"
          placeholderStyle={{color: '#bfc6ea'}}
          placeholderIconColor="#007aff">
          <Picker.Item label="Đối chiếu dữ liệu" value="" />
          <Picker.Item label="Ngày hôm qua" value="yesterday" />
          <Picker.Item label="7 ngày vừa qua" value="past7days" />
          <Picker.Item label="30 ngày vừa qua" value="past30days" />
        </Picker>
      </Form>
      {/* <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          backgroundColor: COLOR.white,
          borderColor: COLOR.secondary,
          borderWidth: 1,
          padding: 5,
          borderRadius: 3,
        }}>
        <Text style={{color: COLOR.secondary, textAlign: 'center'}}>
          Đối chiếu dữ liệu{' '}
          <Icon name="arrows-h" color={COLOR.secondary} size={13} />
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        locale="vi"
        mode="date"
        title="Chọn ngày"
        open={open}
        date={dateCompare}
        onConfirm={date => {
          setOpen(false);
          setDateCompare(date);
          onSubmit(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </View>
  );
}

export default ModalCompare;
