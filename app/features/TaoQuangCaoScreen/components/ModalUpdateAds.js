import {Button, Form, Item, Input, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {formatMoney} from '../../../helpers/formatNumber';
import {COLOR} from '../../../theme';
import {hideModalUpdateAds, updateAdsQuota} from '../actions';
import {useForm, Controller} from 'react-hook-form';

function ModalUpdateAds(props) {
  const showModalUpdateAds = useSelector(
    store => store.baoCao.showModalUpdateAds,
  );
  const currentShop = useSelector(store => store.account.currentShop);
  const idList = useSelector(store => store.baoCao.idList);
  const {onFetchDataAdsList} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      total_quota: '',
    },
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    reset();
    dispatch(hideModalUpdateAds());
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
              giá trị tối thiểu 100.000đ
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

  const onUpdateAdsQuota = d => {
    const data = {
      id: currentShop?._id,
      campaign_ids: idList,
      total_quota: d.total_quota,
      daily_quota: 0,
    };

    const callbackSuccess = () => {
      onFetchDataAdsList();
    };

    dispatch(updateAdsQuota(data, {callbackSuccess}));
    toggleModal();
  };

  return (
    <Modal isVisible={showModalUpdateAds}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Điều chỉnh ngân sách {idList.length > 1 && 'hàng loạt'}
        </Text>
        <Form style={{width: '100%'}}>
          <Controller
            control={control}
            rules={{
              required: 'Không được để trống',
              min: 100000,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Item regular>
                <Input
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nhập ngân sách tối đa"
                />
              </Item>
            )}
            name="total_quota"
          />
          {handleError('total_quota', errors)}
        </Form>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 3,
            justifyContent: 'flex-end',
          }}>
          <Button
            block
            style={[styles.button, {backgroundColor: COLOR.success}]}
            onPress={handleSubmit(onUpdateAdsQuota)}>
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

export default ModalUpdateAds;
