import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from './../../../theme/color';
import {Container, Header, Content, List, ListItem, Button} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {
  hideModalSelectShop,
  setShop,
} from '../../../features/MainScreen/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Modalize} from 'react-native-modalize';

function ModalSelectShop() {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const showModalSelectShop = useSelector(
    store => store.account.showModalSelectShop,
  );

  const dispatch = useDispatch();

  const modalizeRef = useRef(null);

  useEffect(() => {
    if (showModalSelectShop) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [showModalSelectShop]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const toggleModal = () => {
    dispatch(hideModalSelectShop());
  };

  const setCurrentShopId = async data => {
    try {
      await AsyncStorage.setItem('currentShopId', data);
    } catch (e) {
      console.log(e);
    }
  };

  const renderListShop = () => {
    return shopList?.map((item, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.shopItem,
            currentShop._id === item._id && styles.shopActive,
          ]}
          key={index}
          onPress={() => {
            setCurrentShopId(item._id);
            dispatch(setShop({shopId: item._id}));
            toggleModal();
            Toast.show({
              type: 'success',
              text1: 'Thay đổi shop thành công',
            });
          }}>
          <Image
            style={{width: 20, height: 20, marginRight: 10}}
            source={require(`../../../assets/image/store1.png`)}
          />
          <Text
            style={{
              color: currentShop._id === item._id ? COLOR.primary : COLOR.black,
            }}>
            {item.username}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modalize
      handlePosition="inside"
      scrollViewProps={{showsVerticalScrollIndicator: true}}
      snapPoint={300}
      ref={modalizeRef}
      onClose={toggleModal}>
      <View style={styles.modalBox}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.black,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Chọn shop
        </Text>
        <List>{renderListShop()}</List>
      </View>
    </Modalize>
  );

  return (
    <Modal
      onBackdropPress={() => {
        toggleModal();
      }}
      isVisible={showModalSelectShop}>
      <View style={styles.modalBox}>
        <ScrollView style={{maxHeight: 300}}>
          <List>
            <ListItem itemDivider>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLOR.primary,
                  textAlign: 'center',
                }}>
                Chọn shop
              </Text>
            </ListItem>
            {renderListShop()}
          </List>
        </ScrollView>

        <Button
          style={{backgroundColor: COLOR.primary, borderRadius: 6}}
          block
          onPress={toggleModal}>
          <Text style={{color: COLOR.white}}>Hủy</Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 10,
  },
  shopItem: {
    padding: 10,
    marginVertical: 5,
    // borderColor: COLOR.greyLight,
    // borderWidth: 1,
    // borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopActive: {
    borderColor: COLOR.primary,
    backgroundColor: COLOR.light,
  },
});

export default ModalSelectShop;
