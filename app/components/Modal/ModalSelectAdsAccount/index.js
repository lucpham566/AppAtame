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
import {COLOR} from '../../../theme/color';
import {Container, Header, Content, List, ListItem, Button} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {
  hideModalSelectAdsAccount,
  hideModalSelectShop,
  setAdsAccount,
  setShop,
} from '../../../features/MainScreen/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Modalize} from 'react-native-modalize';

function ModalSelectAdsAccount() {
  const shopList = useSelector(store => store.account.shopList);
  const adsAccountList = useSelector(store => store.account.adsAccountList);
  const currentShop = useSelector(store => store.account.currentShop);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);
  const showModalSelectAdsAccount = useSelector(
    store => store.account.showModalSelectAdsAccount,
  );

  const dispatch = useDispatch();

  const modalizeRef = useRef(null);

  useEffect(() => {
    if (showModalSelectAdsAccount) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [showModalSelectAdsAccount]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const toggleModal = () => {
    dispatch(hideModalSelectAdsAccount());
  };

  const setCurrentShopId = async data => {
    try {
      await AsyncStorage.setItem('currentShopId', data);
    } catch (e) {
      console.log(e);
    }
  };

  const renderListShop = () => {
    return adsAccountList?.map((item, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.shopItem,
            currentAdsAccount?.advertiser_id === item.advertiser_id && styles.shopActive,
          ]}
          key={index}
          onPress={() => {
            dispatch(setAdsAccount(item.advertiser_id));
            toggleModal();
          }}>
          <Image
            style={{width: 20, height: 20, marginRight: 10}}
            source={require(`../../../assets/image/tiktok_icon.png`)}
          />
          <Text
            style={{
              color: currentAdsAccount?.advertiser_id === item.advertiser_id ? COLOR.primary : COLOR.black,
            }}>
            {item.name}
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
          Tài khoản quảng cáo
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
      isVisible={showModalSelectAdsAccount}>
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
                Tài khoản Tiktok
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

export default ModalSelectAdsAccount;
