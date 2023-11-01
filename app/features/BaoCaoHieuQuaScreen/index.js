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
import {
  getAdsReport,
  getProductAdsList,
  showModalUpdateAds,
  updateAdsState,
} from './actions';
import ModalUpdateAds from './components/ModalUpdateAds';
import Toast from 'react-native-toast-message';
import { formatMoney, formatNumber } from './../../helpers/formatNumber';
import HeaderTab from '../../components/HeaderTab';
import ProductItem from './components/ProductItem';
import { getAutomatedRule, getHistoryNotify } from '../../apis/tongQuan';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const BaoCaoHieuQuaScreen = ({ theme, navigation }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const [productAdsList, setProductAdsList] = useState([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
  const [notifyList, setNotifyList] = useState([]);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);

  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionAdsList, setOptionAdsList] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setProductAdsList(productAdsListRe);
  // }, [productAdsListRe]);

  useEffect(() => {
    onRefresh();
  }, [currentAdsAccount]);


  const onRefresh = () => {
    setRefreshing(true);

    fetchData();

    setRefreshing(false);
  };


  async function fetchData() {
    try {

      const response = await getHistoryNotify({ advertiser_id: currentAdsAccount.advertiser_id }, currentShop.id);
      if (response && response.data && response.data.data) {
        const data = response.data.data.data;
        setNotifyList(data);
      }
      console.log(response.data, "dsafdsafjklsadfk");
    } catch (error) {
      console.log(error?.response?.data, "#12321s");
      console.log(error, "#12321s");
    }

  }

  console.log(notifyList, "notifyList dầdsafsad");

  const onFetchDataAdsList = () => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
      campaign_type: optionAdsList,
    };

    dispatch(getProductAdsList(data));
  };

  const listOptionFilter = [
    { name: 'Hôm nay', value: 'real_time' },
    { name: 'Hôm qua', value: 'yesterday' },
    { name: '7 ngày', value: 'past7days' },
    { name: '30 ngày', value: 'past30days' },
  ];

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
  const renderListProductPreview = notifyList
    .map((item, index) => {
      return (
        <ProductItem
          onFetchDataAdsList={onFetchDataAdsList}
          item={item}
          key={index}
        />
      );
    });

  return (
    <Container>
      <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Báo cáo hiệu quả"
        navigation={navigation}
      />
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        {renderListProductPreview}

        <ModalUpdateAds onFetchDataAdsList={onFetchDataAdsList} />
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
              Điều chỉnh giá thầu
            </Text>
          </Button>
        </View>
      ) : null}
    </Container>
  );
};

export default BaoCaoHieuQuaScreen;
