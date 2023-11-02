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
import { showModalConfigNotify, showModalSelectShop } from '../MainScreen/actions';
import { getAdsReport, getProductAdsList } from './actions';
import HeaderTab from '../../components/HeaderTab';
import ModalUpdateAds from '../BaoCaoHieuQuaScreen/components/ModalUpdateAds';
import {
  showModalUpdateAds,
  updateAdsState,
} from '../BaoCaoHieuQuaScreen/actions';
import { useCallback } from 'react';
import { getAutomatedRule, updateAutomatedRuleStatus } from '../../apis/tongQuan';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const QuangCaoTimKiemScreen = ({ theme, navigation }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);
  const isShowModal = useSelector(store => store.account.showModalConfigNotify);

  const [productAdsList, setProductAdsList] = useState([1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
  const [ruleList, setRuleList] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();


  const onRefresh = () => {
    setRefreshing(true);

    fetchData()

    setRefreshing(false);
  };


  async function fetchData() {
    // You can await here
    try {

      const response = await getAutomatedRule({ advertiser_id: currentAdsAccount.advertiser_id }, currentShop.id);
      if (response && response.data && response.data.data) {
        const rules = response.data.data.rules;
        setRuleList(rules);
      }
    } catch (error) {
      console.log(error?.response?.data, "#12321s");
      console.log(error, "#12321s");
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isShowModal])



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

  async function updateRuleStatus(status, rule_ids) {
    // You can await here
    try {
      const data = {
        advertiser_id: currentAdsAccount.advertiser_id,
        operate_type: status,
        rule_ids: rule_ids
      };

      const response = await updateAutomatedRuleStatus(data, currentShop.id);
      if (response && response.data && response.data.data) {
        fetchData();
      }
      console.log(response.data, "kết #21321312");
    } catch (error) {
      console.log(error?.response?.data, "#12321s");
      console.log(error, "#12321s");
    }

  }


  const onDeleteRule = (id) => {
    console.log("xóa id nè ", id);
    updateRuleStatus("DELETE", [id])
  };

  const showModalConfig = () => {
    dispatch(showModalConfigNotify([]));
  };

  return (
    <Container>
      <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Cấu hình thông báo"
        navigation={navigation}
      />
      <Content refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <TouchableOpacity
          onPress={() => showModalConfig()}
          style={{ width: 200, margin: 10, backgroundColor: COLOR.primary, alignItems: 'center', borderRadius: 10, padding: 10 }}>
          <Text style={{ color: COLOR.white }}>Thêm cấu hình</Text>
        </TouchableOpacity>
        <ProductList
          data={ruleList}
          navigation={navigation}
          handleCheckAds={handleCheckAds}
          onDeleteRule={onDeleteRule}
        />
      </Content>

    </Container>
  );
};

export default QuangCaoTimKiemScreen;
