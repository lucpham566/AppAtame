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
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
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
import {
  getProductAdsList,
  getShopReport,
  getShopReportCompare,
  removeShopReportCompare,
} from './actions';
import { formatMoney, formatNumber } from '../../helpers/formatNumber';
import LineChartCustom from '../../components/Chart/LineChart';
import moment from 'moment';
import { showModalSelectShop } from '../MainScreen/actions';
import RecycleTestComponent from './components/Test';
import ListView from './components/Test';
import ModalCompare from './components/ModalCompare';
import HeaderTab from '../../components/HeaderTab';
import ModalScrollBottom from '../../components/Modal/ModalScrollBottom';
import { useRef } from 'react';
import ModalSelectScrollBottom from '../../components/Modal/ModalSelectScrollBottom';
import ModalSelectTime from '../../components/Modal/ModalSelectTime';
import ProductItem from './components/ProductItem';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const TongQuanScreen = ({ theme, navigation }) => {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const shopReport = useSelector(store => store.tongQuan.shopReport);
  const shopReportCompare = useSelector(
    store => store.tongQuan.shopReportCompare,
  );
  const productAdsList = useSelector(store => store.tongQuan.productAdsList);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionFilterCompare, setOptionFilterCompare] = useState('');
  const [dateCompare, setDateCompare] = useState(new Date());
  const [titleChart, setTitleChart] = useState('shop_pv');
  const [labelChart, setLabelChart] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
    if (shopReportCompare && shopReportCompare.shop_pv) {
      return (
        (shopReport[name]?.value / shopReportCompare[name]?.value) * 100 -
        100
      ).toFixed(0);
    }
    return 0;
  };

  const dataReport = [
    {
      value: formatNumber(shopReport?.shop_pv?.value),
      text: 'Lượt xem trang',
      name: 'shop_pv',
      percent: getPercent('shop_pv'),
    },
    {
      value: formatNumber(shopReport?.shop_uv?.value),
      text: 'Lượt truy cập',
      name: 'shop_uv',
      percent: getPercent('shop_uv'),
    },
    {
      value: formatNumber(shopReport?.place_gmv?.value),
      text: 'Doanh thu',
      name: 'place_gmv',
      percent: getPercent('place_gmv'),
    },
    {
      value: formatNumber(shopReport?.place_orders?.value),
      text: 'Đơn hàng',
      name: 'place_orders',
      percent: getPercent('paid_orders'),
    },
    {
      value:
        (shopReport?.shop_uv_to_placed_buyers_rate?.value * 100).toFixed(2) +
        '%',
      text: 'Tỷ lệ chuyển đổi',
      name: 'shop_uv_to_placed_buyers_rate',
      percent: getPercent('shop_uv_to_placed_buyers_rate'),
    },
    {
      value: formatNumber(shopReport?.place_sales_per_order?.value),
      text: 'Doanh thu / Đơn',
      name: 'place_sales_per_order',
      percent: getPercent('place_sales_per_order'),
    },
  ];

  useEffect(() => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      date: null,
      month: null,
      year: null,
    };
    dispatch(getShopReport(data));
    dispatch(getProductAdsList(data));
  }, [currentShop, optionFilter]);

  const onRefresh = () => {
    setRefreshing(true);

    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      date: null,
      month: null,
      year: null,
    };
    dispatch(getShopReport(data));
    dispatch(getProductAdsList(data));

    setRefreshing(false);
  };

  useEffect(() => {
    const points = shopReport[titleChart]?.points;
    if (points) {
      const labels = points.map(i => {
        if (optionFilter === 'past7days' || optionFilter === 'past30days') {
          return moment(i.timestamp * 1000).format('DD/MM');
        }
        return moment(i.timestamp * 1000).format('LT');
      });
      const data = points.map(i => {
        if (titleChart === 'shop_uv_to_placed_buyers_rate') {
          return (i.value * 100).toFixed(2);
        }
        return i.value;
      });
      setLabelChart([...labels]);
      setDataChart([...data]);
    }
  }, [titleChart, shopReport]);

  useEffect(() => {
    if (optionFilterCompare) {
      const data = {
        id: currentShop?._id,
        optionFilter: optionFilterCompare,
        date: null,
        month: null,
        year: null,
      };
      dispatch(getShopReportCompare(data));
    } else {
      dispatch(removeShopReportCompare());
    }
  }, [optionFilterCompare]);

  const onRemoveCompare = () => {
    setOptionFilterCompare('');
    dispatch(removeShopReportCompare());
  };

  const renderTitleCompare = () => {
    if (shopReportCompare && shopReportCompare.shop_pv) {
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
              {
                backgroundColor: COLOR.white,
                shadowColor: COLOR.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 10,
                borderRadius: 10,
              },
              optionFilter === item.value && styles.tabOptionItemActive,
            ]}
            onPress={() => {
              setOptionFilter(item.value);
            }}>
            <Text
              style={{
                color: COLOR.grey,
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
          {shopReportCompare && shopReportCompare.shop_pv && (
            <Text
              style={{
                color: item.percent >= 0 ? COLOR.success : COLOR.danger,
                fontSize: 12,
                textAlign: 'right',
              }}>
              {item.percent > 0 && '+'}{item.percent}%
            </Text>
          )}
        </TouchableOpacity>
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

  const renderListProductPreview = productAdsList
    .map((item, index) => {
      return <ProductItem item={item} key={index} />;
    });

  return (
    <Container>
      <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Tổng quan"
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
      <Content refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {/* <Form style={{flexDirection: 'row'}}>
          <Item
            style={{flex: 1, paddingHorizontal: 10, paddingVertical: 5}}
            picker>
            <TouchableOpacity
              onPress={() => {
                dispatch(showModalSelectShop());
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
              transparent
              block>
              <Text
                style={{fontWeight: 'bold', color: COLOR.greyDark}}
                numberOfLines={1}>
                {currentShop.username}{' '}
                <Icon name="caret-down" color={COLOR.grey} size={16} />
              </Text>
            </TouchableOpacity>
            <ModalCompare
              optionFilterCompare={optionFilterCompare}
              setOptionFilterCompare={setOptionFilterCompare}
            />
          </Item>
        </Form> */}
        {/* 
        <View
          style={[
            styles.boxOption,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          {renderListOptionFilter()}
        </View> */}

        <View style={styles.chartContainer}>
          <Form style={{ flexDirection: 'row' }}>
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

          <View style={styles.boxStatistical}>
            <View style={styles.titleBox}>
              <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>
                Chỉ số toàn shop
              </Text>
              {renderTitleCompare()}
              {/* <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 8}}>
                  <Icon name="circle" size={16} color={'#0b5ad9'} /> CPS :
                  <Text style={{fontWeight: 'bold'}}> 0đ</Text>
                </Text>
                <Text style={{marginRight: 8}}>
                  <Icon name="circle" size={16} color={'#e0c91f'} /> CPC :
                  <Text style={{fontWeight: 'bold'}}> 351đ </Text>
                </Text>
                <Text style={{marginRight: 8}}>
                  <Icon name="circle" size={16} color={'#0be6a0'} /> CIR :
                  <Text style={{fontWeight: 'bold'}}> 0.00% </Text>
                </Text>
              </View> */}
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
        <View style={styles.boxSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>
              Chỉ số sản phẩm {`(${productAdsList.length})`}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.light,
                padding: 11,
                borderRadius: 4,
              }}
              onPress={() => {
                navigation.navigate('TongQuanProductScreen');
              }}>
              <Image
                style={{ width: 18, height: 18 }}
                source={require('../../assets/image/search.png')}
              />
            </TouchableOpacity>
          </View>
          {renderListProductPreview}
          {/* <ProductList /> */}
          {/* <ListView data={productAdsList}/> */}
        </View>
      </Content>
    </Container>
  );
};

export default TongQuanScreen;
