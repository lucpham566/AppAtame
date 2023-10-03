import {Button, Form, Item, Input, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {formatMoney} from '../../../helpers/formatNumber';
import {COLOR} from '../../../theme';
import {useForm, Controller} from 'react-hook-form';

function ModalSaveFile(props) {
  const {toggleModelSaveFile, createKeywordFile} = props;
  const showModalSaveFile = true;
  const currentShop = useSelector(store => store.account.currentShop);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      fileName: '',
    },
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    reset();
    toggleModelSaveFile();
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
              }}></Text>
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

  const onSubmitCreate = d => {
    createKeywordFile(d.fileName);
    toggleModal();
  };

  return (
    <Modal isVisible={showModalSaveFile}>
      <View style={styles.container}>
        <Text style={styles.title}>Tạo file từ khóa</Text>
        <Form style={{width: '100%'}}>
          <Controller
            control={control}
            rules={{
              required: 'Tên file không được để trống',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Item
                style={{
                  fontSize: 16,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: COLOR.greyLight,
                  paddingHorizontal: 10,
                }}
                regular>
                <Input
                  style={{
                    fontSize: 16,
                    height: 40,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Đặt tên file"
                  placeholderTextColor={COLOR.grey}
                />
              </Item>
            )}
            name="fileName"
          />
          {handleError('fileName', errors)}
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.primary,
            }}>
            * Độ dài tên file tối thiểu 5 ký tự
          </Text>
        </Form>

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
            <Text style={{color: COLOR.black, fontWeight: 'bold'}}>Hủy</Text>
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
            onPress={handleSubmit(onSubmitCreate)}>
            <Text style={{color: COLOR.white, fontWeight: 'bold'}}>Đồng ý</Text>
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
    marginBottom: 20,
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

export default ModalSaveFile;
