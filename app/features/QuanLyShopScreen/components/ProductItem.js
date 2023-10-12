import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../../theme';
import {CheckBox, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  formatMoney,
  formatNumber,
  formatPercent,
} from '../../../helpers/formatNumber';
import {setShop} from '../../MainScreen/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductItem = props => {
  const [check, setCheck] = useState(false);
  const currentShop = useSelector(store => store.account.currentShop);
  const {item} = props;
  const dispatch = useDispatch();
  const setCurrentShopId = async data => {
    try {
      await AsyncStorage.setItem('currentShopId', data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectShop = () => {
    setCurrentShopId(item.id);
    dispatch(setShop({shopId: item.id}));
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.productItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.imageContainer}>
            <Thumbnail
              style={styles.productImage}
              square
              source={require(`../../../assets/image/tiktok_icon.png`)}
            />
            {/* {renderStatus(item?.campaign.state)} */}
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.productName} numberOfLines={1}>
              {item?.custom_info?.display_name}
            </Text>
            <Text numberOfLines={1} style={styles.textDes}>ID : {item?.id}</Text>
          </View>
          <View style={styles.boxAction}>
            {currentShop.id === item.id ? (
              <Text
                style={{
                  color: '#1F65CD',
                  textAlign: 'center',
                  backgroundColor: '#D8EEF9',
                  borderColor: '#1F65CD',
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 3,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                Mặc định
              </Text>
            ) : (
              <TouchableOpacity
                onPress={onSelectShop}
                style={{
                  backgroundColor: COLOR.white,
                  borderColor: COLOR.greyLight,
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 3,
                  marginBottom: 5,
                }}>
                <Text style={{color: COLOR.grey, textAlign: 'center'}}>
                  Đặt làm mặc định
                </Text>
              </TouchableOpacity>
            )}
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
    borderTopColor: '#F1F1F1',
  },
  imageContainer: {
    width: 60,
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
    paddingVertical: 5,
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
  },
});
export default ProductItem;
