import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  showModalUpdateAds,
  showModalUpdatePremiumRate,
  updateAdsState,
} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../helpers/formatNumber';
import { Image } from 'react-native';
import { Switch } from 'react-native';

const ItemPosition = props => {
  const { item, onUpdateAdsPlacement, handleCheckKeyword, title } = props;
  const [statusPlacement, setStatusPlacement] = useState(
    item.status ? item.status : false,
  );
  const [price, setPrice] = useState(
    item.extinfo ? item.extinfo.target.price : 0,
  );
  const checked = false;
  const dispatch = useDispatch();

  console.log("statusPlacement", statusPlacement);

  const onChangeState = status => {
    setStatusPlacement(statusPlacement == 1 ? 2 : 1)
    console.log("statusPlacement");
    const callback = () => {
      setStatusPlacement(statusPlacement == 1 ? 2 : 1);
    };
    onUpdateAdsPlacement(item.placement, status == 1 ? 2 : 1, callback);
  };

  const renderStatus = status => {
    switch (status) {
      case 1:
        return (
          <Text
            style={{
              fontSize: 10,
              color: COLOR.secondary,
              textAlign: 'center',
              padding: 3,
            }}>
            Đang chạy
          </Text>
        );
      case 2:
        return (
          <Text
            style={{
              fontSize: 10,
              color: COLOR.warning,
              textAlign: 'center',
              padding: 3,
            }}>
            Tạm dừng
          </Text>
        );
      default:
        return (
          <Text
            style={{
              fontSize: 10,
              color: COLOR.warning,
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
      case 2:
        return (
          <TouchableOpacity
            onPress={() => onChangeState(status)}
            style={{
              backgroundColor: COLOR.white,
              borderColor: COLOR.success,
              borderWidth: 1,
              padding: 5,
              borderRadius: 3,
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

  const showModalUpdatePremium = () => {
    dispatch(showModalUpdatePremiumRate({ placement: item.placement }));
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={2}>
              {title}
            </Text>
            {/* <Text style={styles.textDes}>
              Lượt xem : {formatNumber(item.click)}
            </Text> */}
            <Text
              style={{
                fontSize: 14,
                color: COLOR.black,
                marginRight: 20,
              }}>
              Mức premium :{item.extinfo?.target.premium_rate}{' '}
              <TouchableOpacity style={{ paddingLeft: 5 }} onPress={showModalUpdatePremium}>
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('../../../assets/image/edit.png')}
                />
              </TouchableOpacity>
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOR.greyDark,
                marginRight: 20,
              }}>
              Giá thầu : {formatMoney(price)}
            </Text>
          </View>
          <View style={styles.imageContainer}></View>

          <View style={styles.boxAction}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10, minWidth: 80
              }}>
              <Switch
                style={{ margin: Platform.OS === 'ios' ? 10 : 0 }}
                value={statusPlacement == 1}
                onValueChange={() => onChangeState(statusPlacement)}
              />
              <Text>{renderStatus(statusPlacement)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>

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
    paddingLeft: 5,
    width: 100,
    marginRight: 30
  },
});
export default ItemPosition;
