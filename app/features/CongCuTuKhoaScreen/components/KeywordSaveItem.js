import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatMoney, formatNumber } from '../../../helpers/formatNumber';
import { useEffect } from 'react';

const KeywordSaveItem = props => {
  const { item, removeKeyword, ToggleModalKeywordPrice, handleCheck } = props;
  const [check, setCheck] = useState(item.checked ? true : false);

  const onClickCheck = () => {
    setCheck(!check);
    handleCheck(item.keyword, !check);
  };

  useEffect(() => {
    setCheck(item.checked ? true : false)
  }, [item.checked])


  const onRemoveKeyword = () => {
    removeKeyword(item);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {onClickCheck && (
            <CheckBox
              style={styles.checkbox}
              checked={check}
              color={COLOR.primary}
              onPress={onClickCheck}
            />
          )}
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
                  Atosa :{' '}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLOR.grey,
                    }}>
                    {formatNumber(item?.results)}
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
                    {formatNumber(item?.shopee_volume ? item?.shopee_volume : item?.sp_volume)}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
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
                    {formatNumber(item?.shopee_price ? item?.shopee_price : item?.sp_price)}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => ToggleModalKeywordPrice(item?.keyword)}
                  style={{ paddingLeft: 10 }}>
                  <Image
                    style={{ width: 14, height: 14 }}
                    source={require('../../../assets/image/edit.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.boxAction}>
            <TouchableOpacity
              onPress={onRemoveKeyword}
              style={{
                padding: 5,
                borderRadius: 3,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../../assets/image/minus.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: COLOR.greyLight,
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
    color: COLOR.greyDark,
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
export default KeywordSaveItem;
