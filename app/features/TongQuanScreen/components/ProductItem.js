import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../../theme';
import {CheckBox, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatMoney, formatNumber} from '../../../helpers/formatNumber';

const ProductItem = props => {
  const [check, setCheck] = useState(false);

  const {item} = props;

  const images = item?.product.images.split(',');

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.productItem}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <View style={styles.imageContainer}>
            <Thumbnail
              style={styles.productImage}
              square
              source={{
                uri: 'https://cf.shopee.vn/file/' + images[0],
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.productName} numberOfLines={2}>
              {item?.product.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOR.grey,
                  }}>
                  Doanh thu
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLOR.black,
                  }}>
                  {formatMoney(item?.report.direct_gmv)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOR.grey,
                  }}>
                  Đã bán
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLOR.black,
                  }}>
                  {formatNumber(item?.report.order)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOR.grey,
                  }}>
                  Lượt xem
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLOR.black,
                  }}>
                  {formatNumber(item?.report.impression)}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.boxAction}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>228</Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLOR.success}}>
              <Icon name="caret-up" color={COLOR.success} size={16} /> 60%
            </Text>
            <Text style={{fontSize: 13, color: COLOR.grey}}>
              2 lượt xem /người dùng
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLOR.light,
    padding: 5,
  },
  imageContainer: {
    width: 40,
    marginRight: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  productName: {
    fontWeight: 'bold',
    color: COLOR.greyDark,
    fontSize: 14,
    lineHeight: 16,
  },
  textDes: {
    color: COLOR.grey,
    fontSize: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 0,
    margin: 0,
  },
  boxAction: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default ProductItem;
