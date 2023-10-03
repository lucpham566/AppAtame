import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showModalUpdateAds, updateAdsState } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../helpers/formatNumber';
import { Switch } from 'react-native';
import { Image } from 'react-native';

const ProductItem = props => {
  const {
    item,
    onUpdateStateKeyword,
    handleCheckKeyword,
    toggleModelUpdateKeywordPrice,
  } = props;
  const currentShop = useSelector(store => store.account.currentShop);
  const checked = item.checked ? true : false;
  const [keywordStatus, setKeywordStatus] = useState(item.status === 1);
  const dispatch = useDispatch();

  const handleCheck = () => {
    handleCheckKeyword(item.keyword, !checked);
  };

  const onChangeState = status => {
    setKeywordStatus(!keywordStatus);
    onUpdateStateKeyword(item, status === 1 ? 0 : 1);
  };

  const renderStatus = status => {
    switch (status) {
      case 1:
        return (
          <Text
            style={{
              fontSize: 12,
              color: COLOR.secondary,
              textAlign: 'center',
              padding: 3,
              marginLeft: 5,
            }}>
            Đang chạy
          </Text>
        );
      case 0:
        return (
          <Text
            style={{
              fontSize: 12,
              color: COLOR.warning,
              textAlign: 'center',
              padding: 3,
              marginLeft: 5,
            }}>
            Tạm dừng
          </Text>
        );
      default:
        return (
          <Text
            style={{
              backgroundColor: COLOR.danger,
              fontSize: 10,
              color: COLOR.white,
              textAlign: 'center',
              padding: 3,
            }}>
            lỗi
          </Text>
        );
    }
  };

  const renderButtonAction = status => {
    switch (status) {
      case 1:
        return (
          <TouchableOpacity
            onPress={() => onChangeState(status)}
            style={{
              backgroundColor: COLOR.white,
              borderColor: COLOR.danger,
              borderWidth: 1,
              padding: 5,
              borderRadius: 3,
              marginBottom: 5,
            }}>
            <Text
              style={{ color: COLOR.danger, textAlign: 'center', fontSize: 13 }}>
              Tạm dừng
            </Text>
          </TouchableOpacity>
        );
      case 0:
        return (
          <TouchableOpacity
            onPress={() => onChangeState(status)}
            style={{
              backgroundColor: COLOR.white,
              borderColor: COLOR.success,
              borderWidth: 1,
              padding: 5,
              borderRadius: 3,
              marginBottom: 5,
            }}>
            <Text
              style={{ color: COLOR.success, textAlign: 'center', fontSize: 13 }}>
              Hoạt động
            </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const showModalUpdate = id => {
    dispatch(showModalUpdateAds([id]));
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {handleCheckKeyword && (
            <CheckBox
              style={styles.checkbox}
              checked={checked}
              color={COLOR.primary}
              onPress={handleCheck}
            />
          )}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.productName} numberOfLines={1}>
              {item?.keyword}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10, minWidth: 80
              }}>
              <Switch
                style={{ margin: Platform.OS === 'ios' ? 10 : 0 }}
                value={keywordStatus}
                onValueChange={() => onChangeState(item.status)}
              />
              <Text>{renderStatus(item.status)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: 120 }}>
              <Text style={styles.textDes}>
                Giá thầu {formatMoney(item.price)}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => toggleModelUpdateKeywordPrice(item)}
                style={{}}>
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('../../../assets/image/edit.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.boxAction}>
            {renderButtonAction(item.status)}
            <TouchableOpacity
              onPress={() => toggleModelUpdateKeywordPrice(item)}
              style={{
                backgroundColor: COLOR.white,
                borderColor: COLOR.primary,
                borderWidth: 1,
                padding: 5,
                borderRadius: 3,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: COLOR.primary,
                  textAlign: 'center',
                  fontSize: 13,
                }}>
                Điều chỉnh
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: COLOR.greyDark,
              marginRight: 20,
            }}>
            <Icon name="money" size={13} color={COLOR.greyDark} /> Chi phí{' '}
            {formatMoney(item.cost)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: COLOR.greyDark,
              marginRight: 20,
            }}>
            <Icon name="eye" size={13} color={COLOR.greyDark} /> lượt xem{' '}
            {formatMoney(item.click)}
          </Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: COLOR.light,
  },
  imageContainer: {
    width: 60,
    marginRight: 5,
  },
  productImage: {
    width: 60,
    height: 60,
  },
  productName: {
    fontWeight: 'bold',
    color: COLOR.greyDark,
    flex: 1
  },
  textDes: {
    color: COLOR.grey,
    fontSize: 13,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 0,
    margin: 0,
  },
  boxAction: {
    paddingLeft: 5,
    width: 100,
  },
});
export default ProductItem;
