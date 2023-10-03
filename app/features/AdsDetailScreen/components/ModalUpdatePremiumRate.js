import {Button, Form, Item, Input, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {formatMoney} from '../../../helpers/formatNumber';
import {COLOR} from '../../../theme';
import {hideModalUpdatePremiumRate, updatePremiumRate} from '../actions';
import {useForm, Controller} from 'react-hook-form';

function ModalUpdatePremiumRate(props) {
  const showModalUpdatePremiumRate = useSelector(
    store => store.adsDetail.showModalUpdatePremiumRate,
  );
  const currentShop = useSelector(store => store.account.currentShop);
  const modalPlacement = useSelector(store => store.adsDetail.modalPlacement);
  const {adsId} = props;
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      premium_rate: '',
    },
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    reset();
    dispatch(hideModalUpdatePremiumRate());
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
              giá trị tối thiểu 0
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

  const onUpdateAdsPremium = d => {
    const data = {
      id: currentShop?._id,
      campaignid: adsId,
      premium_rate: d.premium_rate,
      placement: modalPlacement,
    };

    const callbackSuccess = () => {};

    dispatch(updatePremiumRate(data, {callbackSuccess}));
    toggleModal();
  };

  return (
    <Modal isVisible={showModalUpdatePremiumRate}>
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa mức Premium</Text>
        <Form style={{width: '100%', marginVertical: 10}}>
          <Controller
            control={control}
            rules={{
              required: 'Không được để trống',
              min: 0,
              max: 300,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Item regular>
                <Input
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nhập mức premium"
                  autoFocus={true}
                />
              </Item>
            )}
            name="premium_rate"
          />
          {handleError('premium_rate', errors)}
        </Form>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 3,
            justifyContent: 'flex-end',
          }}>
          <Button
            block
            style={[styles.button, {backgroundColor: COLOR.success}]}
            onPress={handleSubmit(onUpdateAdsPremium)}>
            <Text style={{color: COLOR.white}}>Xác nhận</Text>
          </Button>
          <Button
            block
            style={[styles.button, {backgroundColor: COLOR.danger}]}
            onPress={toggleModal}>
            <Text style={{color: COLOR.white}}>Hủy</Text>
          </Button>
        </View> */}
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              borderRadius: 6,
              backgroundColor: '#DCDCDC',
            }}
            block
            onPress={toggleModal}>
            <Text style={{color: COLOR.black}}>Hủy</Text>
          </Button>
          <Button
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              borderRadius: 6,
              backgroundColor: COLOR.primary,
            }}
            block
            onPress={handleSubmit(onUpdateAdsPremium)}>
            <Text style={{color: COLOR.white}}>Đồng ý</Text>
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

export default ModalUpdatePremiumRate;
