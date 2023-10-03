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
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import HeaderMain from '../../components/HeaderMain';
import HeaderTitle from '../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../theme';
import Chart from '../../components/Chart';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import ProductList from './components/ProductList';
import {
  getProductAdsList,
  getShopReport,
  removeShopReportCompare,
} from './actions';
import {formatMoney, formatNumber} from '../../helpers/formatNumber';
import LineChartCustom from '../../components/Chart/LineChart';
import moment from 'moment';
import {showModalSelectShop} from '../MainScreen/actions';
import RecycleTestComponent from './components/Test';
import ListView from './components/Test';
import ModalCompare from './components/ModalCompare';
import HeaderTab from '../../components/HeaderTab';
import ModalScrollBottom from '../../components/Modal/ModalScrollBottom';
import {useRef} from 'react';
import ModalSelectScrollBottom from '../../components/Modal/ModalSelectScrollBottom';
import ModalSelectTime from '../../components/Modal/ModalSelectTime';
import ModalSelectSort from '../../components/Modal/ModalSelectSort';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const TongQuanProductScreen = ({theme, navigation}) => {
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

  const dispatch = useDispatch();

  const listOptionFilter = [
    {name: 'Hôm nay', value: 'real_time'},
    {name: 'Hôm qua', value: 'yesterday'},
    {name: '7 ngày', value: 'past7days'},
    {name: '30 ngày', value: 'past30days'},
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

  const onRemoveCompare = () => {
    setOptionFilterCompare('');
    dispatch(removeShopReportCompare());
  };

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.primary,
          }}></Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Tìm kiếm sản phẩm"
        navigation={navigation}
      />
      <ProductList />
    </Container>
  );
};

export default TongQuanProductScreen;
