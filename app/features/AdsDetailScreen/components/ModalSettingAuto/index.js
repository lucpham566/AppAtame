import {Button, Form, Item, Input, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {formatMoney} from '../../../../helpers/formatNumber';
import {COLOR} from '../../../../theme';
import {
  hideModalUpdatePremiumRate,
  updateAdsBasePrice,
  updatePremiumRate,
} from '../../actions';
import {useForm, Controller} from 'react-hook-form';
import DuyTriTuDongTab from './DuyTriTuDongTab';

function ModalSettingAuto(props) {
  const currentShop = useSelector(store => store.account.currentShop);
  const {toggleModelSettingAuto, showModal} = props;
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      price: '',
    },
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    reset();
    toggleModelSettingAuto();
  };

  const handleError = (field, errors) => {
    if (errors[field]) {
      if (errors[field].type !== 'pattern') {
        if (errors[field]?.type === 'min') {
          return (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              giá trị tối thiểu 200
            </Text>
          );
        } else if (errors[field]?.type === 'max') {
          return (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              giá trị tối đa 300
            </Text>
          );
        } else {
          return (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              {errors[field]?.message}
            </Text>
          );
        }
      } else {
        return (
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.danger,
            }}>
            Không đúng định dạng
          </Text>
        );
      }
    }
  };

  const onSubmit = d => {
    toggleModal();
  };

  return (
    <Modal isVisible={showModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Cài đặt tự động</Text>
        <DuyTriTuDongTab />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 3,
            justifyContent: 'flex-end',
          }}>
          <Button
            block
            style={[styles.button, {backgroundColor: COLOR.success}]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={{color: COLOR.white}}>Xác nhận</Text>
          </Button>
          <Button
            block
            style={[styles.button, {backgroundColor: COLOR.danger}]}
            onPress={toggleModal}>
            <Text style={{color: COLOR.white}}>Hủy</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLOR.white,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.grey,
    marginBottom: 3,
    textAlign: 'center',
  },
  button: {
    margin: 3,
    backgroundColor: COLOR.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ModalSettingAuto;
