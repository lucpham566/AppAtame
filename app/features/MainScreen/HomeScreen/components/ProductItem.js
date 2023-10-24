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
import { COLOR } from '../../../../theme';
import { CheckBox, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { showModalUpdateAds, updateAdsState } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../../helpers/formatNumber';
import { ScrollView } from 'react-native';

const ProductItem = props => {
  const { item, onFetchDataAdsList, handleCheckAds, optionAdsList } = props;
  const currentShop = useSelector(store => store.account.currentShop);
  const checked = item.checked ? true : false;
  const [adsStatus, setAdsStatus] = useState(
    true
  );
  const dispatch = useDispatch();

  const handleCheck = () => {
    handleCheckAds(item.campaign?.campaignid, !checked);
  };

  const onChangeState = (status, id) => {
    // setAdsStatus(!adsStatus);
    // let state = 'ongoing';
    // if (status === 'ongoing') {
    //   state = 'paused';
    // } else {
    //   state = 'ongoing';
    // }
    // const data = {
    //   id: currentShop?._id,
    //   campaign_ids: [id],
    //   state,
    // };

    // const callbackSuccess = () => {
    //   onFetchDataAdsList();
    // };

    // dispatch(updateAdsState(data, { callbackSuccess }));
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
    // dispatch(showModalUpdateAds([id]));
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
              <Text style={styles.productName} numberOfLines={1}>
                {item[optionAdsList][optionAdsList+"_name"]}
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

                />
                <Text></Text>
              </View>
              <Text style={styles.textDes}>
                Ngân sách : 1.000.000 đ {'(Không giới hạn)'}

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
                Chi phí: {item.spend}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CPC: {item.cpc}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CPM: {item.cpm}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Hiển thị: {item.impression}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Click:{item.clicks}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CTR:{' '}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                Chuyển đổi:{' '}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CPA:{' '}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 20,
                }}>
                CVR:{' '}
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
    color: COLOR.primary,
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
