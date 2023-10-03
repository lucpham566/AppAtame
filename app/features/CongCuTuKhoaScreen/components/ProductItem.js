import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatMoney, formatNumber } from '../../../helpers/formatNumber';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const ProductItem = props => {
  const { item, addKeyword, adsId, fileId, keywordListSaved, keywordOfProduct } = props;

  const [checked, setChecked] = useState(item.checked ? true : false)

  useEffect(() => {
    setChecked(item.checked ? true : false)
  }, [item.checked])

  const onAddKeyword = () => {
    if (keywordOfProduct && (keywordOfProduct.length + keywordListSaved.length + 1 > 200)) {
      Toast.show({
        type: 'error',
        text1: 'Số từ khóa đã đạt giới hạn 200',
      });
    } else {
      addKeyword(item);
      setChecked(!checked)
    }
  };

  const renderActionBox = () => {
    if (fileId) {
      if (adsId) {
        return (
          <View style={styles.boxAction}>
            <TouchableOpacity
              onPress={onAddKeyword}
              style={{
                padding: 5,
                borderRadius: 3,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              {checked ? (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require('../../../assets/image/minus.png')}
                />
              ) : (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require('../../../assets/image/add.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      if (keywordOfProduct?.some(i => i.keyword === item?.keyword)) {
        return (
          <View style={styles.boxAction}>
            <TouchableOpacity
              disabled={keywordOfProduct?.some(i => i.keyword === item?.keyword)}
              onPress={onAddKeyword}
              style={{
                padding: 5,
                borderRadius: 3,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text style={{ color: COLOR.grey, fontSize: 12 }}>Đã thêm</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View style={styles.boxAction}>
          <TouchableOpacity
            disabled={keywordOfProduct?.some(i => i.keyword === item?.keyword)}
            onPress={onAddKeyword}
            style={{
              padding: 5,
              borderRadius: 3,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            {checked ? (
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../../assets/image/minus.png')}
              />
            ) : (
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../../assets/image/add.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <CheckBox
            style={styles.checkbox}
            checked={check}
            color={COLOR.primary}
            onPress={handleCheck}
          /> */}
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={2}>
              {item?.keyword}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Atosa :
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLOR.black,
                    }}>
                    {formatNumber(item.results)}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Shopee :{' '}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLOR.black,
                    }}>
                    {formatNumber(fileId ? item.sp_volume : item.shopee_volume)}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Giá :{' '}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLOR.black,
                    }}>
                    {formatMoney(fileId ? item.sp_price : item.shopee_price)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.boxAction}>
            {item.results ? (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginVertical: 3,
                  color: COLOR.primary,
                }}>
                Lượt tìm kiếm : {formatNumber(item.results)}
              </Text>
            ) : null}
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 3,
                color: COLOR.secondary,
              }}>
              Tìm kiếm shopee:{' '}
              {formatNumber(fileId ? item.sp_volume : item.shopee_volume)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 3,
                color: COLOR.success,
              }}>
              Giá: {formatMoney(fileId ? item.sp_price : item.shopee_price)}
            </Text>
          </View> */}

          {renderActionBox()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: COLOR.light,
  },
  imageContainer: {
    width: 80,
    marginRight: 5,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productName: {
    fontWeight: 'bold',
    color: COLOR.black,
    fontSize: 14,
    marginBottom: 5,
  },
  textDes: {
    color: COLOR.grey,
    fontSize: 13,
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
    // flex: 1,
    alignItems: 'flex-end',
  },
});
export default ProductItem;
