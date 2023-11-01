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
import moment from 'moment';

const ProductItem = props => {
  const { item, onFetchDataAdsList, navigation, handleCheckAds, onDeleteRule } = props;
  // const [check, setCheck] = useState(false);
  const currentShop = useSelector(store => store.account.currentShop);
  console.log(item, "Dầdsfa");
  const dispatch = useDispatch();

  return (
    <>
      <View
        // onPress={() => gotoDetail(item?.campaign?.campaignid, item?.product.name)}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.productItem}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                {/* <Switch
                  style={{ marginHorizontal: Platform.OS === 'ios' ? 10 : 0 }}
                /> */}
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ marginRight: 5, width: 50, backgroundColor: COLOR.primaryDark, alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 3 }}>
                    <Text style={{ fontSize: 12, color: COLOR.white }}  >
                      Sửa
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { onDeleteRule(item._id) }}
                    style={{ marginRight: 5, width: 50, backgroundColor: COLOR.danger, alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 3 }}>
                    <Text style={{ fontSize: 12, color: COLOR.white }}  >
                      Xóa
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -5
                }}>

                <Text style={styles.textDes}>
                  ID: {item._id}
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
                  {moment(item.created_at).format("L")}
                </Text>

              </ScrollView>

            </View>
          </View>
        </View>
      </View>
    </>
  );


};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    margin: 0,
  },
  boxAction: {
    paddingLeft: 5,
  },
});

export default ProductItem;
