import {
  Thumbnail,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
  Button,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import HeaderMain from '../../components/HeaderMain';
import HeaderTitle from './../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../theme';
import Chart from '../../components/Chart';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import { showModalSelectShop } from '../MainScreen/actions';
import { getAdsReport, getProductAdsList } from './actions';
import HeaderTab from '../../components/HeaderTab';
import { useCallback } from 'react';
import {
  showModalUpdateAds,
  updateAdsState,
} from '../BaoCaoHieuQuaScreen/actions';
import ModalUpdateAds from '../BaoCaoHieuQuaScreen/components/ModalUpdateAds';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const QuangCaoKhamPhaScreen = ({ theme, navigation }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const productAdsListRe = useSelector(
    store => store.quangCaoKhamPha.productAdsList,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [productAdsList, setProductAdsList] = useState([]);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [productName, setProductName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setProductAdsList(productAdsListRe);
  }, [productAdsListRe]);

  useEffect(() => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: 'targeting',
    };

    dispatch(getAdsReport(data));
    dispatch(getProductAdsList(data));
  }, [currentShop, optionFilter]);

  const onRefresh = () => {
    setRefreshing(true);

    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: 'targeting',
    };

    dispatch(getAdsReport(data));
    dispatch(getProductAdsList(data));

    setRefreshing(false);
  };

  useEffect(() => {
    const productAdsListFilter = productAdsListRe?.filter(i => {
      const name = i.product?.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const nameCompare = productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return name.includes(nameCompare);
    });

    setProductAdsList(productAdsListFilter);
  }, [productName]);

  const onFetchDataAdsList = () => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: 'targeting',
    };

    dispatch(getProductAdsList(data));
  };

  const listOptionFilter = [
    { name: 'Hôm nay', value: 'real_time' },
    { name: 'Hôm qua', value: 'yesterday' },
    { name: '7 ngày', value: 'past7days' },
    { name: '30 ngày', value: 'past30days' },
  ];

  const renderListOptionFilter = () => {
    return listOptionFilter.map((item, index) => {
      return (
        <View style={[styles.tabOptionItem]} key={index}>
          <TouchableOpacity
            style={[
              {
                backgroundColor: COLOR.white,
                borderColor: COLOR.light,
                borderWidth: 1,
                borderRadius: 16,
              },
              optionFilter === item.value && styles.tabOptionItemActive,
            ]}
            onPress={() => {
              setOptionFilter(item.value);
            }}>
            <Text
              style={{
                color: optionFilter === item.value ? COLOR.primary : COLOR.grey,
                fontWeight: optionFilter === item.value ? 'bold' : 'normal',
                fontSize: 13,
                textAlign: 'center',
                paddingHorizontal: 2,
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.primary} name="chevron-left" />
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.primary }}>
          {' '}
          Quay lại
        </Text>
      </TouchableOpacity>
    );
  };

  const gotoAdsCreationScreen = () => {
    navigation.navigate('TaoQuangCaoScreen', {
      campaignType: 'targeting',
      productOfCampaign: productAdsList?.map(i => i.product.itemid)
    });
  };

  const handleCheckAds = (id, value) => {
    const newData = productAdsList?.map(i => {
      if (i.campaign?.campaignid === id) {
        return { ...i, checked: value };
      }
      return { ...i };
    });
    setProductAdsList([...newData]);
  };

  const onchangeStateAdsMutil = () => {
    const adsCheck = productAdsList.filter(i => i.checked);
    const ids = adsCheck.map(i => {
      return i.campaign?.campaignid;
    });

    let state = 'paused';
    const data = {
      id: currentShop?._id,
      campaign_ids: ids,
      state,
    };

    const callbackSuccess = () => {
      onFetchDataAdsList();
    };

    dispatch(updateAdsState(data, { callbackSuccess }));
  };

  const onHandleOpenModalUpdate = () => {
    const adsCheck = productAdsList.filter(i => i.checked);
    const ids = adsCheck.map(i => {
      return i.campaign?.campaignid;
    });
    if (ids && ids.length > 0) {
      dispatch(showModalUpdateAds(ids));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Chưa chọn quảng cáo nào',
      });
    }
  };

  return (
    <Container>
      {/* <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Quảng cáo khám phá"
        navigation={navigation}
      /> */}
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Form
          style={{
            flexDirection: 'row',
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: COLOR.light,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(showModalSelectShop());
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                padding: 10,
              }}
              transparent
              block>
              {/* <Icon name='arrow-back' /> */}
              <Text
                style={{ fontWeight: 'bold', color: COLOR.greyDark }}
                numberOfLines={1}>
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require('../../assets/image/store1.png')}
                />{' '}
                {currentShop.username}{' '}
                <Icon name="caret-down" color={COLOR.grey} size={16} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', paddingRight: 10 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={gotoAdsCreationScreen}>
              <Text style={{ marginRight: 5, color: COLOR.primary }}>
                Tạo chiến dịch
              </Text>
              <View
                style={{
                  backgroundColor: COLOR.primary,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require('../../assets/image/plus_white.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Form>

        <View
          style={[
            styles.boxOption,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}>
          {renderListOptionFilter()}
        </View>

        <View style={styles.boxSection}>
          <Text
            style={{
              paddingHorizontal: 17,
              fontSize: 16,
              marginBottom: 5,
              fontWeight: 'bold',
            }}>
            Danh sách quảng cáo
          </Text>
          <ProductList
            data={productAdsList}
            onFetchDataAdsList={onFetchDataAdsList}
            navigation={navigation}
            handleCheckAds={handleCheckAds}
          />
        </View>
      </Content>

      {productAdsList.filter(i => i.checked === true).length > 0 ? (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Button
            onPress={onchangeStateAdsMutil}
            style={{
              backgroundColor: COLOR.primary,
              margin: 5,
              borderRadius: 5,
              flex: 1,
            }}
            block>
            <Text
              style={{
                color: COLOR.white,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Tạm dừng hàng loạt
            </Text>
          </Button>
          <Button
            onPress={onHandleOpenModalUpdate}
            style={{
              backgroundColor: COLOR.primary,
              margin: 5,
              borderRadius: 5,
              flex: 1,
            }}
            block>
            <Text
              style={{
                color: COLOR.white,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Điều chỉnh ngân sách
            </Text>
          </Button>
        </View>
      ) : null}

      <ModalUpdateAds onFetchDataAdsList={onFetchDataAdsList} />

      {/* <View style={{padding: 10}}>
        <Button
          onPress={gotoAdsCreationScreen}
          style={{backgroundColor: COLOR.secondary}}
          block>
          <Text style={{color: COLOR.white}}>
            Tạo chiến dịch mới theo gợi ý
          </Text>
        </Button>
      </View> */}
    </Container>
  );
};

export default QuangCaoKhamPhaScreen;
