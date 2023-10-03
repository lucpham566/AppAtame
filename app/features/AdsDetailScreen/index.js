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
import HeaderTitle from './../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../theme';
import Chart from '../../components/Chart';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import {
  getAdsDetail,
  getCampaignReport,
  getCampaignReportCompare,
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
import { updateAdsState } from './../QuangCaoTimKiemScreen/actions';
import { updateAdsPlacement } from './../QuangCaoKhamPhaScreen/actions';
import ModalUpdatePremiumRate from './components/ModalUpdatePremiumRate';
import ModalUpdateBasePrice from './components/ModalUpdateBasePrice';
import ModalUpdateKeywordPrice from './components/ModalUpdateKeywordPrice';
import ModalSettingAuto from './components/ModalSettingAuto';
import { Image } from 'react-native';
import { useRef } from 'react';
import ModalSelectTime from '../../components/Modal/ModalSelectTime';
import ProductItem from './components/ProductItem';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const AdsDetailScreen = ({ theme, navigation, route }) => {
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

  const { adsId, productName, campaign_type } = route.params;
  const modalOptionFilter = useRef(null);
  const onOpen = () => {
    modalOptionFilter.current?.open();
  };

  const modalCompare = useRef(null);

  const onOpenCompare = () => {
    modalCompare.current?.open();
  };

  const dispatch = useDispatch();

  const listOptionFilter = [
    { name: 'Hôm nay', value: 'real_time' },
    { name: 'Hôm qua', value: 'yesterday' },
    { name: '7 ngày', value: 'past7days' },
    { name: '30 ngày', value: 'past30days' },
  ];

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
      text: 'Lượt click',
      name: 'click',
      percent: getPercent('click'),
    },
    {
      value: formatNumber(campaignInfo?.order),
      text: 'Đơn hàng',
      name: 'order',
      percent: getPercent('order'),
    },
    {
      value: formatNumber(campaignInfo?.impression),
      text: 'Lượt xem',
      name: 'impression',
      percent: getPercent('impression'),
    },
    {
      value: formatNumber(campaignInfo?.order_amount),
      text: 'Đã bán',
      name: 'order_amount',
      percent: getPercent('order_amount'),
    },
    {
      value: formatNumber(campaignInfo?.cost),
      text: 'Chi phí',
      name: 'cost',
      percent: getPercent('cost'),
    },
  ];

  useEffect(() => {
    setKeywordList(keywordListRe);
  }, [keywordListRe]);

  useEffect(() => {
    onFetchData();
  }, [currentShop, optionFilter]);

  useEffect(() => {
    if (optionFilterCompare) {
      const data = {
        id: currentShop?._id,
        campaign_id: adsId,
        optionFilter: optionFilterCompare,
        placement: placement,
        campaign_type: campaign_type,
        itemid: itemid,
        date: null,
        month: null,
        year: null,
      };
      dispatch(getCampaignReportCompare(data));
    } else {
      dispatch(removeCampaignReportCompare());
    }
  }, [optionFilterCompare]);

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

  const onRemoveCompare = () => {
    setOptionFilterCompare('');
    dispatch(removeCampaignReportCompare());
  };

  const onChangeState = (status, id) => {
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

    setStatusAds(pre => {
      if (pre === 'ongoing') {
        return 'paused';
      } else {
        return 'ongoing';
      }
    });
    const callbackSuccess = () => { };

    dispatch(updateAdsState(data, { callbackSuccess }));
  };

  const renderTitleCompare = () => {
    if (optionFilterCompare) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLOR.primary }}>
            So sánh với{' '}
            {listOptionFilter.filter(i => i.value === optionFilterCompare)
              .length &&
              listOptionFilter.filter(i => i.value === optionFilterCompare)[0]
                .name}
          </Text>
          <TouchableOpacity
            onPress={onRemoveCompare}
            style={{
              backgroundColor: COLOR.primary,
              borderColor: COLOR.primary,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 6,
              marginLeft: 10,
            }}>
            <Text style={{ color: COLOR.white, textAlign: 'center' }}>Hủy</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderListOptionFilter = () => {
    return listOptionFilter.map((item, index) => {
      return (
        <View style={[styles.tabOptionItem]} key={index}>
          <TouchableOpacity
            style={[
              optionFilter === item.value && styles.tabOptionItemActive,
              {
                backgroundColor: COLOR.white,
                shadowColor: COLOR.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 10,
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              setOptionFilter(item.value);
            }}>
            <Text
              style={{
                color: COLOR.grey,
                fontSize: 14,
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

  const renderListStatistical = () => {
    return dataReport.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setTitleChart(item.name);
          }}
          style={[
            styles.tabInfoItem,
            titleChart === item.name && styles.tabInfoItemActive,
          ]}
          key={index}>
          <Text
            style={{
              color: COLOR.grey,
              fontSize: 12,
            }}>
            {item.text}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: COLOR.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {item.value}
            </Text>
          </View>
          {optionFilterCompare ? (
            <Text
              style={{
                color: item.percent >= 0 ? COLOR.success : COLOR.danger,
                fontSize: 12,
                textAlign: 'right',
              }}>
              {item.percent > 0 && '+'}{item.percent} %
            </Text>
          ) : null}
        </TouchableOpacity>
      );
    });
  };

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
      </TouchableOpacity>
    );
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

  const onUpdateAdsPlacement = (placement, status, callback) => {
    const data = {
      id: currentShop?._id,
      campaignid: adsId,
      placement: placement,
      status,
    };

    const callbackSuccess = () => {
      callback();
    };

    dispatch(updateAdsPlacement(data, { callbackSuccess }));
  };

  const renderDisplayPosition = () => {
    const advertisement2 = advertisements?.find(i => i.placement == 2);
    const advertisement5 = advertisements?.find(i => i.placement == 5);
    const advertisement8 = advertisements?.find(i => i.placement == 8);
    return (
      <>
        {advertisement2 && (
          <ItemPosition
            item={advertisement2}
            title="Trang chủ - Gợi ý hôm nay"
            onUpdateAdsPlacement={onUpdateAdsPlacement}
          />
        )}
        {advertisement5 && (
          <ItemPosition
            item={advertisement5}
            title="Trang chi tiết sản phẩm - Có thể bạn cũng thích"
            onUpdateAdsPlacement={onUpdateAdsPlacement}
          />
        )}
        {/* {advertisement8 && (
          <ItemPosition
            item={advertisement8}
            title="Trang chủ - Gợi ý hôm nay"
          />
        )} */}
      </>
    );
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

  const renderListKeywordPreview = keywordList
    .map((item, index) => {
      return (
        <ProductItem
          key={item.keyword}
          item={item}
          onUpdateStateKeyword={onUpdateStateKeyword}
          toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
        />
      );
    });

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title={'Chi tiết quảng cáo'}
        navigation={navigation}
      />

      <ModalSelectTime
        value={optionFilter}
        setOptionFilter={setOptionFilter}
        modalizeRef={modalOptionFilter}
      />

      <ModalSelectTime
        value={optionFilterCompare}
        setOptionFilter={setOptionFilterCompare}
        modalizeRef={modalCompare}
      />

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{ fontWeight: 'bold', color: COLOR.grey }}>
              Campaign ID:{' '}
              <Text style={{ color: COLOR.secondary, fontWeight: 'bold' }}>
                {adsId}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              {renderStatus(statusAds)}
              <Switch
                style={{ margin: Platform.OS === 'ios' ? 10 : 0 }}
                value={statusAds === 'ongoing'}
                onValueChange={() => onChangeState(statusAds, adsId)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ flex: 1, color: COLOR.black, fontWeight: 'bold' }}
              numberOfLines={1}>
              {productName}
            </Text>
          </View>
          {campaign_type === 'targeting' && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: COLOR.greyDark,
                  marginRight: 10,
                }}>
                Giá đấu thầu :{' '}
                <Text style={{ color: COLOR.primary }}>
                  {formatMoney(basePrice)}
                </Text>
              </Text>
              <TouchableOpacity onPress={toggleModelUpdateBasePrice}>
                {/* <Icon name="pencil" size={16} color={COLOR.secondary} /> */}
                <Image
                  style={{ width: 14, height: 14 }}
                  source={require('../../assets/image/edit.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* <View
          style={[
            styles.boxOption,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          {renderListOptionFilter()}
        </View> */}

        <Form style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Button
            style={{
              padding: 5,
              borderRadius: 6,
              backgroundColor: COLOR.white,
              borderColor: COLOR.greyLight,
              borderWidth: 1,
              justifyContent: 'center',
              marginRight: 10,
              paddingHorizontal: 20,
              flex: 1, justifyContent: 'space-between'
            }}
            onPress={() => onOpen()}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={require('../../assets/image/calendar_2.png')}
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {listOptionFilter.find(i => i.value === optionFilter).name}
              </Text>
            </View>
            <Image
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={require('../../assets/image/down-filled-triangular-arrow2.png')}
            />
          </Button>
          <Button
            style={{
              padding: 10,
              borderRadius: 6,
              backgroundColor: optionFilterCompare
                ? COLOR.light
                : COLOR.primary,
              width: 100,
            }}
            block
            onPress={onOpenCompare}>
            {optionFilterCompare ? (
              <Image
                style={{ width: 24, height: 24, marginRight: 10 }}
                source={require('../../assets/image/Compare.png')}
              />
            ) : null}
            <Text
              style={{
                color: optionFilterCompare ? COLOR.black : COLOR.white,
              }}>
              Đối chiếu
            </Text>
          </Button>
          {/* <ModalCompare
              optionFilterCompare={optionFilterCompare}
              setOptionFilterCompare={setOptionFilterCompare}
            /> */}
        </Form>

        <View style={styles.chartContainer}>
          <View style={styles.boxStatistical}>
            <View style={styles.titleBox}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: -20,
                  marginBottom: 5,
                }}>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', marginRight: 30 }}>
                  Chỉ số quảng cáo :{' '}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>{renderTitleCompare()}</View>
            </View>
            <View style={styles.listStatistical}>
              {renderListStatistical()}
            </View>
          </View>

          <View>
            <LineChartCustom
              data={dataChart}
              titleChart={titleChart}
              labels={labelChart}
            />
          </View>
        </View>
        {campaign_type === 'search' && (
          <View style={styles.boxSection}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                  fontWeight: 'bold',
                  flex: 1,
                }}>
                Danh sách từ khóa
                {`(${keywordList.length})`}
              </Text>
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
                  navigation.navigate('AdsDetailKeywordScreen', { adsId, productName, campaign_type });
                }}>
                <Text>
                  Điều chỉnh
                </Text>
                <Image
                  style={{ width: 24, height: 24, marginLeft: 5 }}
                  source={require('../../assets/image/chevron-right-double.png')}
                />
              </TouchableOpacity>
            </View>
            {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginVertical: 5,
              }}>
              <View style={{padding: 3}}>
                <TouchableOpacity
                  onPress={() => setShowModalSettingAuto(!showModalSettingAuto)}
                  style={{
                    backgroundColor: COLOR.secondary,
                    padding: 5,
                    borderRadius: 3,
                    flex: 1,
                  }}>
                  <Text style={{color: COLOR.white, textAlign: 'center'}}>
                    Cài đặt tự động
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 3 }}>
                <TouchableOpacity
                  onPress={toggleModelUpdateKeywordPrice}
                  style={{
                    backgroundColor: COLOR.secondary,
                    padding: 5,
                    borderRadius: 3,
                    flex: 1,
                  }}>
                  <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                    Điều chỉnh giá thầu
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 3 }}>
                <TouchableOpacity
                  onPress={onUpdateStateKeywordMulti}
                  style={{
                    backgroundColor: COLOR.secondary,
                    padding: 5,
                    borderRadius: 3,
                    flex: 1,
                  }}>
                  <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                    Tạm dừng hàng loạt
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 3 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('KeywordForProductScreen', {
                      adsId,
                      productName,
                      itemid,
                    });
                  }}
                  style={{
                    backgroundColor: COLOR.secondary,
                    padding: 5,
                    borderRadius: 3,
                    flex: 1,
                  }}>
                  <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                    Thêm từ khóa
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView> */}
            {renderListKeywordPreview}
          </View>
        )}

        {campaign_type === 'targeting' && (
          <View style={styles.boxSection}>
            <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>
              Vị trí hiển thị :
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}></View>
            {renderDisplayPosition()}
            {/* <ListView data={productAdsList}/> */}
          </View>
        )}
      </Content>
      <ModalUpdatePremiumRate adsId={adsId} />
      {showModalUpdateBasePrice && (
        <ModalUpdateBasePrice
          toggleModelUpdateBasePrice={toggleModelUpdateBasePrice}
          updateBasePrice={updateBasePrice}
          adsId={adsId}
        />
      )}

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

export default AdsDetailScreen;
