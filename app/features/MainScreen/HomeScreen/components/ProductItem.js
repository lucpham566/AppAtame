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
import { showModalConfig, showModalConfigNotify, updateAdsState } from '../../actions';

const ProductItem = props => {
  const { item, onFetchDataAdsList, handleCheckAds, optionAdsList } = props;
  const currentShop = useSelector(store => store.account.currentShop);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);

  const checked = item.checked ? true : false;
  const [adsStatus, setAdsStatus] = useState(
    item[optionAdsList].operation_status == "ENABLE"
  );
  const dispatch = useDispatch();

  const handleCheck = () => {
    handleCheckAds(item.campaign?.campaignid, !checked);
  };

  console.log(item.spend, item, "item.cpm");

  const onChangeState = (status, id) => {
    setAdsStatus(!adsStatus);
    let state = 'ENABLE';
    if (status === 'ENABLE') {
      state = 'DISABLE';
    } else {
      state = 'ENABLE';
    }

    const data = {
      type: optionAdsList,
      advertiser_id: currentAdsAccount.advertiser_id,
      belong_to_atosa: currentAdsAccount.belong_to_atosa,
      ids: [id],
      operation_status: state,
    };

    const callbackSuccess = () => {
      //onFetchDataAdsList();
    };

    dispatch(updateAdsState(data, currentShop?.id, { callbackSuccess }));
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

  const showModalConfig = id => {
    dispatch(showModalConfigNotify([id]));
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
                {item[optionAdsList][optionAdsList + "_name"]} hìnhaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Text>
              <TouchableOpacity
                onPress={() => showModalConfig(item[optionAdsList].id)}
                style={{ width: 50, backgroundColor: COLOR.primaryLight, alignItems: 'center', borderRadius: 10, padding: 3 }}>
                <Image style={{ width: 20, height: 20 ,tintColor:COLOR.white}} source={require(`../../../../assets/image/icon_tabar_4.png`)} />
              </TouchableOpacity>
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
                  style={{ marginHorizontal: Platform.OS === 'ios' ? 10 : 10 }}
                  value={adsStatus}
                  onValueChange={() =>
                    onChangeState(
                      item[optionAdsList].operation_status,
                      item[optionAdsList][optionAdsList + "_id"]
                    )
                  }
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
    paddingRight: 10,
    flexGrow: 1
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
