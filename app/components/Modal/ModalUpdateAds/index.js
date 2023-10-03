import {Button, Form, Item, Input, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {formatMoney} from '../../../helpers/formatNumber';
import {COLOR} from '../../../theme';
import {useForm, Controller} from 'react-hook-form';
import {updateAdsQuota} from '../../../features/BaoCaoHieuQuaScreen/actions';

function ModalUpdateAds(props) {
  const [show, setShow] = useState(props.show ? true : false);

  const currentShop = useSelector(store => store.account.currentShop);
  const idList = useSelector(store => store.baoCao.idList);
  const [option, setOption] = useState('total_quota');
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
      daily_quota: '',
    },
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    reset();
    setShow(!show);
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
              giá trị tối thiểu{' '}
              {errors[field].ref.name === 'total_quota' ? '100.000' : '5.000'}đ
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
      total_quota: option === 'total_quota' ? d.total_quota : 0,
      daily_quota: option === 'daily_quota' ? d.daily_quota : 0,
    };

    const callbackSuccess = () => {
      onFetchDataAdsList();
    };

    dispatch(updateAdsQuota(data, {callbackSuccess}));
    toggleModal();
  };

  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Điều chỉnh ngân sách {idList.length > 1 && 'hàng loạt'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <View style={{flex: 1, padding: 3}}>
            <TouchableOpacity
              onPress={() => setOption('total_quota')}
              style={{
                backgroundColor:
                  option === 'total_quota' ? COLOR.secondary : COLOR.greyLight,
                padding: 5,
                borderRadius: 3,
                height: 30,
              }}>
              <Text style={{color: COLOR.white, textAlign: 'center'}}>
                Tổng ngân sách
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, padding: 3}}>
            <TouchableOpacity
              onPress={() => setOption('daily_quota')}
              style={{
                backgroundColor:
                  option === 'daily_quota' ? COLOR.secondary : COLOR.greyLight,
                padding: 5,
                borderRadius: 3,
                height: 30,
              }}>
              <Text style={{color: COLOR.white, textAlign: 'center'}}>
                Ngân sách hàng ngày
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Form style={{width: '100%', marginVertical: 10}}>
          {option === 'total_quota' ? (
            <>
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
            </>
          ) : (
            <>
              <Controller
                control={control}
                rules={{
                  required: 'Không được để trống',
                  min: 5000,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Item regular>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nhập ngân sách hàng ngày"
                    />
                  </Item>
                )}
                name="daily_quota"
              />
              {handleError('daily_quota', errors)}
            </>
          )}
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
