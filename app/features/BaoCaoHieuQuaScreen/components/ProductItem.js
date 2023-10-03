import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from 'react-native';
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
import { ScrollView } from 'react-native';

const ProductItem = props => {
  const { item, onFetchDataAdsList, handleCheckAds } = props;
  const currentShop = useSelector(store => store.account.currentShop);
  const checked = item.checked ? true : false;
  const [adsStatus, setAdsStatus] = useState(
    item?.campaign.state === 'ongoing',
  );
  const dispatch = useDispatch();

  const handleCheck = () => {
    handleCheckAds(item.campaign?.campaignid, !checked);
  };

  const images = item?.product.images.split(',');

  const onChangeState = (status, id) => {
    setAdsStatus(!adsStatus);
    let state = 'ongoing';
    if (status === 'ongoing') {
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

    dispatch(updateAdsState(data, { callbackSuccess }));
  };

  const renderStatus = status => {
    switch (status) {
      case 'ongoing':
        return (
          <Text
            style={{
              color: COLOR.secondary,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Đang chạy
          </Text>
        );
      case 'paused':
        return (
          <Text
            style={{
              color: COLOR.warning,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Tạm dừng
          </Text>
        );
      default:
        return (
          <Text
            style={{
              color: COLOR.danger,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Không xác định
          </Text>
        );
    }
  };

  const showModalUpdate = id => {
    dispatch(showModalUpdateAds([id]));
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {handleCheckAds && (
                <CheckBox
                  style={styles.checkbox}
                  checked={checked}
                  color={COLOR.primary}
                  onPress={handleCheck}
                />
              )}
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
              <Text style={styles.productName} numberOfLines={1}>
                {item?.product.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -10,
                }}>
                <Switch
                  style={{ margin: Platform.OS === 'ios' ? 10 : 0 }}
                  value={adsStatus}
                  onValueChange={() =>
                    onChangeState(
                      item?.campaign.state,
                      item?.campaign.campaignid,
                    )
                  }
                />
                <Text>{renderStatus(item?.campaign.state)}</Text>
              </View>
              <Text style={styles.textDes}>
                {formatMoney(item.campaign?.daily_quota)} ngân sách hàng ngày
                <TouchableOpacity
                  onPress={() => showModalUpdate(item?.campaign.campaignid)}
                  style={{}}>
                  <Image
                    style={{ width: 14, height: 14 }}
                    source={require('../../../assets/image/edit.png')}
                  />
                </TouchableOpacity>
              </Text>
            </View>
            <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Click: {formatNumber(item.report?.click)}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CPC: {formatNumber(item.report?.cost / (item.report?.click ? item.report?.click : 1))}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                GMV: {formatNumber(item.report?.broad_gmv)}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Chi phí: {formatMoney(item.report?.cost)}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Ngân sách:{' '}
                {item.campaign?.total_quota == 0
                  ? '∞'
                  : formatMoney(item.campaign?.total_quota)}
              </Text>
            </ScrollView>
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
    width: 24,
    marginRight: 10,
  },
  productImage: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  productName: {
    fontWeight: 'bold',
    color: COLOR.secondaryDark,
    paddingRight: 50,
  },
  textDes: {
    color: COLOR.grey,
    fontSize: 13,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 15,
    marginLeft: -10,
    margin: 0,
  },
  boxAction: {
    paddingLeft: 5,
  },
});
export default ProductItem;
