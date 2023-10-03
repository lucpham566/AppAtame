import {
  Thumbnail,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Tabs,
  Tab,
  TabHeading,
  Button,
  Switch,
  CheckBox,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import HeaderMain from '../../components/HeaderMain';
import HeaderTitle from '../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../theme';
import Chart from '../../components/Chart';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import {
  getAdsDetail,
  getCampaignReport,
  removeCampaignReportCompare,
  updateAdsBasePrice,
  updateKeywordState,
} from './actions';
import { formatMoney, formatNumber } from '../../helpers/formatNumber';
import LineChartCustom from '../../components/Chart/LineChart';
import moment from 'moment';
import { showModalSelectShop } from '../MainScreen/actions';
import RecycleTestComponent from './components/Test';
import ListView from './components/Test';
import ModalCompare from './components/ModalCompare';
import ItemPosition from './components/ItemPosition';
import { updateAdsState } from '../QuangCaoTimKiemScreen/actions';
import { updateAdsPlacement } from '../QuangCaoKhamPhaScreen/actions';
import ModalUpdatePremiumRate from './components/ModalUpdatePremiumRate';
import ModalUpdateBasePrice from './components/ModalUpdateBasePrice';
import ModalUpdateKeywordPrice from './components/ModalUpdateKeywordPrice';
import ModalSettingAuto from './components/ModalSettingAuto';
import { Image } from 'react-native';
import { useRef } from 'react';
import ModalSelectTime from '../../components/Modal/ModalSelectTime';
import ProductItem from './components/ProductItem';
import { useIsFocused } from '@react-navigation/native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const AdsDetailKeywordScreen = ({ theme, navigation, route }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const adsDetail = useSelector(store => store.adsDetail.adsDetail);
  const campaignReport = useSelector(store => store.adsDetail.campaignReport);
  const placement = useSelector(store => store.adsDetail.placement);
  const itemid = useSelector(store => store.adsDetail.itemid);
  const keywordListRe = useSelector(store => store.adsDetail.keywordList);
  const advertisements = useSelector(store => store.adsDetail.advertisements);

  const campaignReportCompare = useSelector(
    store => store.adsDetail.campaignReportCompare,
  );
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionFilterCompare, setOptionFilterCompare] = useState('');
  const [statusAds, setStatusAds] = useState(true);
  const [titleChart, setTitleChart] = useState('broad_gmv');
  const [labelChart, setLabelChart] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState({});
  const [campaignInfoCompare, setCampaignInfoCompare] = useState({});
  const [basePrice, setBasePrice] = useState(0);
  const [showModalUpdateBasePrice, setShowModalUpdateBasePrice] =
    useState(false);
  const [showModalUpdateKeywordPrice, setShowModalUpdateKeywordPrice] =
    useState(false);
  const [showModalSettingAuto, setShowModalSettingAuto] = useState(false);
  const [itemKeyword, setItemKeyword] = useState(null)

  const [refreshing, setRefreshing] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);


  const { adsId, productName, campaign_type } = route.params;

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const getPercent = name => {
    if (campaignReportCompare && campaignReportCompare.length) {
      return (
        (campaignInfo[name] / campaignInfoCompare[name]) * 100 -
        100
      ).toFixed(0);
    }
    return 0;
  };

  const dataReport = [
    {
      value: formatNumber(campaignInfo?.broad_gmv),
      text: 'Doanh thu',
      name: 'broad_gmv',
      percent: getPercent('broad_gmv'),
    },
    {
      value: formatNumber(campaignInfo?.click),
      text: 'Lượt truy cập',
      name: 'click',
      percent: getPercent('click'),
    },
    {
      value: formatNumber(campaignInfo?.order_amount),
      text: 'Đơn hàng',
      name: 'order_amount',
      percent: getPercent('order_amount'),
    },
    // {
    //   value: formatNumber(shopReport?.paid_orders?.value),
    //   text: 'Đơn hàng',
    //   name: 'paid_orders',
    //   percent: getPercent('paid_orders'),
    // },
    // {
    //   value:
    //     (shopReport?.shop_uv_to_placed_buyers_rate?.value * 100).toFixed(2) +
    //     '%',
    //   text: 'Tỷ lệ chuyển đổi',
    //   name: 'shop_uv_to_placed_buyers_rate',
    //   percent: getPercent('shop_uv_to_placed_buyers_rate'),
    // },
    // {
    //   value: formatNumber(shopReport?.place_sales_per_order?.value),
    //   text: 'Doanh thu / Đơn',
    //   name: 'place_sales_per_order',
    //   percent: getPercent('place_sales_per_order'),
    // },
  ];

  useEffect(() => {
    setKeywordList(keywordListRe);
  }, [keywordListRe]);

  useEffect(() => {
    isFocused && onRefresh()
  }, [isFocused]);

  // useEffect(() => {
  //   onFetchData();
  // }, [currentShop, optionFilter]);

  const onRefresh = () => {
    setRefreshing(true);

    onFetchData();

    setRefreshing(false);
  };

  const onFetchData = () => {
    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      optionFilter: optionFilter,
      placement: placement,
      campaign_type: campaign_type,
      itemid: itemid,
      date: null,
      month: null,
      year: null,
    };
    dispatch(getAdsDetail(data));
  };

  useEffect(() => {
    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      optionFilter: optionFilter,
      placement: placement,
      itemid: itemid,
      date: null,
      month: null,
      year: null,
    };
    setStatusAds(adsDetail?.campaign?.state);
    dispatch(getCampaignReport(data));
  }, [adsDetail]);

  useEffect(() => {
    if (campaignReport) {
      const labels = campaignReport.map(i => {
        if (optionFilter === 'past7days' || optionFilter === 'past30days') {
          return moment(i.timestamp * 1000).format('DD/MM');
        }
        return moment(i.timestamp * 1000).format('LT');
      });
      const data = campaignReport.map(i => {
        // if (titleChart === 'shop_uv_to_placed_buyers_rate') {
        //   return (i.value * 100).toFixed(2);
        // }
        return i[titleChart];
      });
      setLabelChart([...labels]);
      setDataChart([...data]);
    }
  }, [titleChart, campaignReport]);

  useEffect(() => {
    if (campaignReport) {
      let d = {};
      dataReport.forEach(i => {
        let data = 0;
        campaignReport.map(o => {
          data += o[i.name];
        });
        d = { ...d, [i.name]: data };
      });
      setCampaignInfo({ ...d });
    }
  }, [campaignReport]);

  useEffect(() => {
    if (campaignReportCompare) {
      let d = {};
      dataReport.forEach(i => {
        let data = 0;
        campaignReportCompare.map(o => {
          data += o[i.name];
        });
        d = { ...d, [i.name]: data };
      });
      setCampaignInfoCompare({ ...d });
    }
  }, [campaignReportCompare]);

  useEffect(() => {
    setBasePrice(
      advertisements?.find(i => i.placement == 2)
        ? advertisements?.find(i => i.placement == 2).extinfo.target.base_price
        : 0,
    );
  }, [advertisements]);

  useEffect(() => {
    if (keywordList.filter(i => i.checked).length == keywordList.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [keywordList])


  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
      </TouchableOpacity>
    );
  };

  const handleCheckKeyword = (keyword, value) => {
    const newData = keywordList?.map(i => {
      if (i.keyword === keyword) {
        return { ...i, checked: value };
      }
      return { ...i };
    });
    setKeywordList([...newData]);
  };

  const onUpdateStateKeywordMulti = () => {
    const listCheck = keywordList.filter(i => i.checked);
    const dataCheck = listCheck.map(i => {
      return {
        keyword: i.keyword,
        algorithm: i.algorithm,
        match_type: i.match_type,
        price: i.price,
        status: 0,
      };
    });

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };

    dispatch(updateKeywordState(data));
  };

  const onUpdateStateKeyword = (item, status) => {
    const dataCheck = [
      {
        keyword: item.keyword,
        algorithm: item.algorithm,
        match_type: item.match_type,
        price: item.price,
        status: status,
      },
    ];

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };

    const callbackSuccess = () => {
      onFetchData();
    };

    dispatch(updateKeywordState(data, { callbackSuccess }));
  };

  const onUpdateKeywordPrice = (item, price) => {
    const dataCheck = [
      {
        keyword: item.keyword,
        algorithm: item.algorithm,
        match_type: item.match_type,
        price: price,
        status: item.status,
      },
    ];

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };

    const callbackSuccess = () => {
      onFetchData();
    };

    dispatch(updateKeywordState(data, { callbackSuccess }));
  };

  const onUpdateKeywordPriceMulti = (item, price) => {
    const listCheck = keywordList.filter(i => i.checked);
    let dataCheck = [];
    if (item && item.keyword) {
      dataCheck = [
        {
          keyword: item.keyword,
          algorithm: item.algorithm,
          match_type: item.match_type,
          price: price,
          status: item.status,
        },
      ];
    } else {
      dataCheck = listCheck.map(i => {
        return {
          keyword: i.keyword,
          algorithm: i.algorithm,
          match_type: i.match_type,
          price: price,
          status: i.status,
        };
      });
    }

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };


    dispatch(updateKeywordState(data));
  };

  const toggleModelUpdateBasePrice = () => {
    setShowModalUpdateBasePrice(!showModalUpdateBasePrice);
  };

  const toggleModelUpdateKeywordPrice = (item) => {
    setShowModalUpdateKeywordPrice(!showModalUpdateKeywordPrice);
    if (item) {
      setItemKeyword(item)
    } else {
      setItemKeyword(null)
    }
  };

  const updateBasePrice = data => {
    const callbackSuccess = () => {
      setBasePrice(data.base_price);
    };

    dispatch(updateAdsBasePrice(data, { callbackSuccess }));
  };

  const handleCheckAll = () => {
    if (isCheckAll) {
      const newData = keywordList?.map(i => {
        return { ...i, checked: false };
      });
      setKeywordList([...newData]);
      setIsCheckAll(!isCheckAll)
    } else {
      const newData = keywordList?.map(i => {
        return { ...i, checked: true };
      });
      setKeywordList([...newData]);
      setIsCheckAll(!isCheckAll)
    }

  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title={'Danh sách từ khóa'}
        navigation={navigation}
      />

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{
          paddingHorizontal: 17,
          backgroundColor: COLOR.white,
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                  flex: 1,
                }}>
                số lượng: <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>{`(${keywordList.length})`}</Text>
              </Text>
              <CheckBox
                style={{
                  width: 22,
                  height: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginRight: 10,
                  marginLeft: -8,
                  margin: 0,
                }}
                checked={isCheckAll}
                color={COLOR.primary}
                onPress={handleCheckAll}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.light,
                padding: 11,
                borderRadius: 4,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => {
                navigation.navigate('KeywordForProductScreen', {
                  adsId,
                  productName,
                  itemid,
                  keywordOfProduct: keywordList
                });
              }}>
              <Image
                style={{ width: 24, height: 24, marginLeft: 5 }}
                source={require('../../assets/image/word.png')}
              />
              <Text>
                Thêm từ khóa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <ProductList
            keywordList={keywordList}
            handleCheckKeyword={handleCheckKeyword}
            onUpdateStateKeyword={onUpdateStateKeyword}
            onUpdateKeywordPrice={onUpdateKeywordPrice}
            toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
          />
        </View>
      </Content>




      {keywordList.filter(i => i.checked === true).length > 0 ? (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Button
            onPress={onUpdateStateKeywordMulti}
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
            onPress={toggleModelUpdateKeywordPrice}
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


      <ModalUpdatePremiumRate adsId={adsId} />
      {showModalUpdateBasePrice && (
        <ModalUpdateBasePrice
          toggleModelUpdateBasePrice={toggleModelUpdateBasePrice}
          updateBasePrice={updateBasePrice}
          adsId={adsId}
        />
      )}

      {/* <ModalUpdateKeywordPrice
        toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
        onUpdateKeywordPriceMulti={onUpdateKeywordPriceMulti}
        showModal={showModalUpdateKeywordPrice}
        adsId={adsId}
      /> */}
      <ModalUpdateKeywordPrice
        toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
        onUpdateKeywordPriceMulti={onUpdateKeywordPriceMulti}
        itemKeyword={itemKeyword}
        showModal={showModalUpdateKeywordPrice}
        adsId={adsId}
      />
      <ModalSettingAuto
        toggleModelSettingAuto={() =>
          setShowModalSettingAuto(!showModalSettingAuto)
        }
        showModal={showModalSettingAuto}
      />
    </Container>
  );
};

export default AdsDetailKeywordScreen;
