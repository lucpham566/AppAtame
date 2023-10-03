import { Container, Header, Content, List, ListItem, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../../helpers/formatNumber';
import { COLOR } from '../../../theme';
import { useForm, Controller } from 'react-hook-form';
import { getKeywordFiles } from '../actions';

function ModalKeywordFile(props) {
  const {
    toggleModelKeywordFile,
    navigation,
    onAddKeywordForProductModal,
    adsId,
    keywordOfProduct
  } = props;
  const showModalKeywordFile = true;
  const currentShop = useSelector(store => store.account.currentShop);
  const keywordFiles = useSelector(store => store.congCuTuKhoa.keywordFiles);

  const renderListFile = () => {
    return keywordFiles?.map((item, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.shopItem,
            currentShop._id === item._id && styles.shopActive,
          ]}
          key={index}
          onPress={() => {
            navigation.navigate('KeywordFileDetailScreen', {
              id: item._id,
              fileName: item.filename,
              keyword_count: item.keyword_count,
              onAddKeywordForProductModal,
              adsId,
              keywordOfProduct
            });
            toggleModelKeywordFile();
          }}>
          <Image
            style={{ width: 24, height: 24, marginRight: 5 }}
            source={require('../../../assets/image/folder.png')}
          />
          <Text>{item.filename}</Text>
        </TouchableOpacity>
      );
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      fileName: '',
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKeywordFiles());
  }, []);

  const toggleModal = () => {
    reset();
    toggleModelKeywordFile();
  };

  return (
    <Modal
      onBackdropPress={() => {
        toggleModal();
      }}
      isVisible={showModalKeywordFile}>
      <View style={styles.modalBox}>
        <ScrollView style={{ height: 300 }}>
          <List>
            <ListItem itemDivider>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLOR.primary,
                  textAlign: 'center',
                }}>
                Danh file đã lưu
              </Text>
            </ListItem>
            {renderListFile()}
          </List>
        </ScrollView>

        <Button
          style={{ backgroundColor: COLOR.danger }}
          block
          onPress={toggleModal}>
          <Text style={{ color: COLOR.white }}>Đóng</Text>
        </Button>
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
  modalBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 10,
  },
  shopItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: COLOR.greyLight,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopActive: {
    borderColor: COLOR.success,
  },
});

export default ModalKeywordFile;
