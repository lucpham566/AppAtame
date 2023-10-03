import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../../theme';
import {CheckBox, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showModalUpdateAds, updateAdsState} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../helpers/formatNumber';

const ProductItem = props => {
  const {item, onFetchDataAdsList, handleCheckAds} = props;
  const currentShop = useSelector(store => store.account.currentShop);
  const checked = item.checked ? true : false;
  const dispatch = useDispatch();

  const handleCheck = () => {
    handleCheckAds(item.itemid, !checked);
  };

  const images = item?.images?.split(',');

  const onChangeState = (status, id) => {
    console.log(item?.campaign.state);
    let state = 'ongoing';
    if ((status = 'ongoing')) {
      state = 'paused';
    } else {
      state = 'ongoing';
    }
    const data = {
      id: currentShop?._id,
      campaign_ids: [id],
      state,
    };

    const callbackSuccess = () => {
      onFetchDataAdsList();
    };

    dispatch(updateAdsState(data, {callbackSuccess}));
  };

  const renderStatus = status => {
    switch (status) {
      case 'ongoing':
        return (
          <Text
            style={{
              backgroundColor: COLOR.success,
              fontSize: 10,
              color: COLOR.white,
              textAlign: 'center',
            }}>
            Đang chạy
          </Text>
        );
      case 'paused':
        return (
          <Text
            style={{
              backgroundColor: COLOR.warning,
              fontSize: 10,
              color: COLOR.white,
              textAlign: 'center',
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
            }}>
            lỗi
          </Text>
        );
    }
  };

  const renderRate = value => {
    const list = [1, 2, 3, 4, 5];
    return list.map((i, index) => {
      return (
        <Icon
          key={index}
          name={
            value - i >= 0
              ? 'star'
              : i - value <= 0.5
              ? 'star-half-full'
              : 'star-o'
          }
          size={13}
          color={COLOR.starActive}
        />
      );
    });
  };

  const showModalUpdate = id => {
    dispatch(showModalUpdateAds([id]));
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.productItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            style={styles.checkbox}
            checked={checked}
            color={COLOR.primary}
            onPress={handleCheck}
          />
          <View style={styles.imageContainer}>
            <Thumbnail
              style={styles.productImage}
              square
              source={{
                uri: 'https://cf.shopee.vn/file/' + images[0],
              }}
            />
            {/* {renderStatus(item?.campaign.state)} */}
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.productName} numberOfLines={2}>
              {item?.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.danger,
                  marginRight: 10,
                }}></Text> */}
              {renderRate(item.rating_star)}
              <Text style={{color: COLOR.grey, fontSize: 13}}>
                {' '}
                {item.rating_star.toFixed(1)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Giá bán
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLOR.grey,
                  }}>
                  {formatMoney(item.price)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Số lượng
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLOR.grey,
                  }}>
                  {item.stock}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLOR.grey,
                  }}>
                  Đã bán
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLOR.grey,
                  }}>
                  {item.sold}
                </Text>
              </View>
            </View>
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
    borderTopColor: COLOR.light,
  },
  imageContainer: {
    width: 70,
    marginRight: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
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
    marginRight: 15,
    marginLeft: 0,
    margin: 0,
  },
  boxAction: {
    paddingLeft: 5,
    width: 100,
  },
});
export default ProductItem;
