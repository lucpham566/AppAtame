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
import ModalUpdateAds from '../BaoCaoHieuQuaScreen/components/ModalUpdateAds';
import {
  showModalUpdateAds,
  updateAdsState,
} from '../BaoCaoHieuQuaScreen/actions';
import { useCallback } from 'react';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const QuangCaoTimKiemScreen = ({ theme, navigation }) => {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const adsReport = useSelector(store => store.baoCao.adsReport);
  const productAdsListRe = useSelector(store => store.baoCao.productAdsList);
  const [productAdsList, setProductAdsList] = useState([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionAdsList, setOptionAdsList] = useState('search');
  const [productName, setProductName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [productAdsListRe]);

  useEffect(() => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: optionAdsList,
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
      campaign_type: optionAdsList,
    };

    dispatch(getAdsReport(data));
    dispatch(getProductAdsList(data));

    setRefreshing(false);
  };

  useEffect(() => {
    onFetchDataAdsList();
  }, [optionAdsList]);

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

  }, [productName]);

  const onFetchDataAdsList = () => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: 'search',
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
      campaignType: 'search',
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
      <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Cấu hình thông báo"
        navigation={navigation}
      />
      <Content>

        <ProductList
          data={productAdsList}
          onFetchDataAdsList={onFetchDataAdsList}
          navigation={navigation}
          handleCheckAds={handleCheckAds}
        />
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
    </Container>
  );
};

export default QuangCaoTimKiemScreen;
