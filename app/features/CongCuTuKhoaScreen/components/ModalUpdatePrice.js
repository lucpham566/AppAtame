import { Button, Form, Item, Input, Label } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../../helpers/formatNumber';
import { COLOR } from '../../../theme';
import { useForm, Controller } from 'react-hook-form';

function ModalUpdatePrice(props) {

  const { onSubmit, showModal, setShowModal } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      price: '',
    },
  });

  const toggleModal = () => {
    reset();
    setShowModal(!showModal);
  };

  const handleError = (field, errors) => {
    return (
      <>
        {errors[field] &&
          errors[field].type !== 'pattern' &&
          (errors[field]?.type === 'min' ? (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              giá trị tối thiểu 200 đ
            </Text>
          ) : (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              {errors[field]?.message}
            </Text>
          ))}
        {errors[field]?.type === 'pattern' && (
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.danger,
            }}>
            Không đúng định dạng
          </Text>
        )}
      </>
    );
  };

  const onUpdatePrice = d => {
    toggleModal();
    onSubmit(d)
  };

  return (
    <Modal isVisible={showModal}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Điều chỉnh giá thầu
        </Text>
        <Form style={{ width: '100%', marginVertical: 10 }}>
          <Controller
            control={control}
            rules={{
              required: 'Không được để trống',
              min: 200,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Item style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
              }} regular>
                <Input
                  style={{
                    height: 40
                  }}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nhập số tiền"
                />
              </Item>
            )}
            name="price"
          />
          {handleError('price', errors)}
        </Form>
        <View style={{ flexDirection: 'row' }}>
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
            <Text style={{ color: COLOR.grey }}>Hủy</Text>
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
            onPress={handleSubmit(onUpdatePrice)}>
            <Text style={{ color: COLOR.white }}>Xác nhận</Text>
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
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
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

export default ModalUpdatePrice;
