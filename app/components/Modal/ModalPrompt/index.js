import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from './../../../theme/color';
import {Container, Header, Content, List, ListItem, Button} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {hideModalPrompt} from './actions';

function ModalPrompt() {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const showModalPrompt = useSelector(
    store => store.modalPrompt.showModalPrompt,
  );
  const title = useSelector(store => store.modalPrompt.title);
  const text = useSelector(store => store.modalPrompt.text);
  const description = useSelector(store => store.modalPrompt.description);
  const callbackSuccess = useSelector(
    store => store.modalPrompt.callbackSuccess,
  );

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(hideModalPrompt());
  };

  const onSubmit = () => {
    dispatch(hideModalPrompt());
    if (callbackSuccess) {
      callbackSuccess();
    }
  };

  return (
    <Modal
      onBackdropPress={() => {
        toggleModal();
      }}
      isVisible={showModalPrompt}>
      <View style={styles.modalBox}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.primary,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        {text ? (
          <Text
            style={{
              fontSize: 14,
              color: COLOR.greyDark,
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            {text}
          </Text>
        ) : null}

        {description ? (
          <Text
            style={{
              fontSize: 13,
              color: COLOR.grey,
              textAlign: 'center',
              paddingBottom: 10,
            }}>
            {description}
          </Text>
        ) : null}
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
            onPress={onSubmit}>
            <Text style={{color: COLOR.white}}>Đồng ý</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

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

export default ModalPrompt;
