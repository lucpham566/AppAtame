import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateAdsState } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../helpers/formatNumber';
import { showModalUpdateAds } from '../../BaoCaoHieuQuaScreen/actions';
import { Switch } from 'react-native';
import { Platform } from 'react-native';

const ProductItem = props => {
  const { item, onFetchDataAdsList, navigation, handleCheckAds } = props;
  // const [check, setCheck] = useState(false);
  const checked = item.checked ? true : false;
  const currentShop = useSelector(store => store.account.currentShop);
  const [adsStatus, setAdsStatus] = useState(
    item?.campaign.state === 'ongoing',
  );
  const dispatch = useDispatch();

  const handleCheck = () => {
    // setCheck(!check);
    handleCheckAds(item.campaign?.campaignid, !checked);
  };

  const images = item?.product.images.split(',');

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
      console.log('callback succeess');
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

  const gotoDetail = (id, name) => {
    navigation.navigate('AdsDetailScreen', {
      adsId: id,
      productName: name,
      campaign_type: 'targeting',
    });
  };

  const showModalUpdate = id => {
    dispatch(showModalUpdateAds([id]));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => gotoDetail(item?.campaign?.campaignid, item?.product.name)}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
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

            </View>
          </View>
        </View>
      </TouchableOpacity>
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
          Ngân sách: {' '}
          {item.campaign?.total_quota == 0
            ? '∞'
            : formatMoney(item.campaign?.total_quota)}
        </Text>
      </ScrollView>
    </>
  );

  return (
    <TouchableOpacity
      onPress={() => gotoDetail(item?.campaign?.campaignid, item?.product.name)}
      style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.productItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            {renderStatus(item?.campaign.state)}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={1}>
              {item?.product.name}
            </Text>
            <Text style={styles.textDes}>
              Ngân sách hàng ngày : {formatMoney(item.campaign?.daily_quota)}{' '}
              <TouchableOpacity
                onPress={() => showModalUpdate(item?.campaign.campaignid)}
                style={{}}>
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('../../../assets/image/edit.png')}
                />
              </TouchableOpacity>
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ fontSize: 13, color: COLOR.danger, marginRight: 10 }}>
                CIR: {formatPercent(item?.report.cir)}
              </Text>
              <Text
                style={{ fontSize: 13, color: COLOR.danger, marginRight: 10 }}>
                CPC: {formatNumber(item?.report.cpc)}
              </Text>
              <Text
                style={{ fontSize: 13, color: COLOR.danger, marginRight: 10 }}>
                Click: {formatNumber(item?.report.click)}
              </Text>
            </View>
          </View>
          {/* <View style={styles.boxAction}>
            <TouchableOpacity
              onPress={() =>
                onChangeState(item?.campaign.state, item?.campaign.campaignid)
              }
              style={{
                backgroundColor: COLOR.white,
                borderColor: COLOR.danger,
                borderWidth: 1,
                padding: 5,
                borderRadius: 3,
                marginBottom: 5,
              }}>
              <Text style={{color: COLOR.danger, textAlign: 'center'}}>
                Tạm dừng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.white,
                borderColor: COLOR.success,
                borderWidth: 1,
                padding: 5,
                borderRadius: 3,
              }}>
              <Text style={{color: COLOR.success, textAlign: 'center'}}>
                Điều chỉnh
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: COLOR.greyDark,
              marginRight: 20,
            }}>
            GMV: {formatNumber(item.report?.order_gmv)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: COLOR.greyDark,
              marginRight: 20,
            }}>
            <Icon name="money" size={13} color={COLOR.greyDark} /> Chi phí{' '}
            {formatMoney(item.report?.cost)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: COLOR.greyDark,
              marginRight: 20,
            }}>
            <Icon name="money" size={13} color={COLOR.greyDark} /> Ngân sách{' '}
            {item.campaign?.total_quota == 0
              ? '∞'
              : formatMoney(item.campaign?.total_quota)}
          </Text>
        </View> */}
      </View>
    </TouchableOpacity>
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
    paddingRight: 50
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
