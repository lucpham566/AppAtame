import {
  Button,
  CheckBox,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Image,
  Input,
  Item,
  Thumbnail,
} from 'native-base';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { COLOR } from '../../../theme/color';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import HeaderMain from '../../../components/HeaderMain';
import SocialFooter from '../../../components/SocialFooter';
import { getItem } from '../../../commons/AsyncStorageUtils';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../LoginScreen/actions';
import {
  getAdsPerformance,
  getAdsReportHome,
  getShopReportHome,
  showModalSelectShop,
} from '../actions';
import { formatNumber } from '../../../helpers/formatNumber';
import { showModalPrompt } from '../../../components/Modal/ModalPrompt/actions';
import { useCallback } from 'react';
import LineChartCustom from '../../../components/Chart/LineChart';
import moment from 'moment';
import ModalScrollBottom from '../../../components/Modal/ModalScrollBottom';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = props => {
  const { navigation } = props;
  const [userInfo, setUserInfo] = useState({});
  const [goi, setGoi] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const goiSanPham = useSelector(store => store.account.goiSanPham);
  const currentShop = useSelector(store => store.account.currentShop);
  const shopList = useSelector(store => store.account.shopList);
  const shopReportHome = useSelector(store => store.account.shopReportHome);
  const adsReportHome = useSelector(store => store.account.adsReportHome);
  const adsPerformance = useSelector(store => store.account.adsPerformance);
  const [optionFilter, setOptionFilter] = useState('real_time');

  const [titleChart, setTitleChart] = useState(['shop_pv']);
  const [labelChart, setLabelChart] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const dispatch = useDispatch();

  const listOptionFilter = [
    { name: 'Hôm nay', value: 'real_time' },
    { name: 'Hôm qua', value: 'yesterday' },
    { name: '7 ngày', value: 'past7days' },
    { name: '30 ngày', value: 'past30days' },
  ];

  const dataShopReportHome = [
    {
      value: formatNumber(shopReportHome?.shop_pv?.value),
      text: 'Lượt xem trang',
      name: 'shop_pv',
    },
    {
      value: formatNumber(shopReportHome?.shop_uv?.value),
      text: 'Lượt truy cập',
      name: 'shop_uv',
    },
    {
      value: formatNumber(shopReportHome?.place_gmv?.value),
      text: 'Doanh thu',
      name: 'place_gmv',
    },
    {
      value: formatNumber(shopReportHome?.place_orders?.value),
      text: 'Đơn hàng',
      name: 'place_orders',
    },
    {
      value:
        (shopReportHome?.shop_uv_to_placed_buyers_rate?.value * 100).toFixed(
          2,
        ) + '%',
      text: 'Tỷ lệ chuyển đổi',
      name: 'shop_uv_to_placed_buyers_rate',
    },
    {
      value: formatNumber(shopReportHome?.place_sales_per_order?.value),
      text: 'Doanh thu / Đơn',
      name: 'place_sales_per_order',
    },
  ];

  const dataAdsReportHome = [
    {
      value: formatNumber(adsReportHome?.gmv),
      text: 'Doanh thu',
      name: 'shop_pv',
    },
    {
      value: formatNumber(adsReportHome?.click),
      text: 'Lượt click',
      name: 'shop_uv',
    },
    {
      value: formatNumber(adsReportHome?.cost),
      text: 'Chi phí',
      name: 'place_gmv',
    },
    {
      value: formatNumber(adsReportHome?.impression),
      text: 'Lượt xem',
      name: 'impression',
    },
    {
      value:
        `${adsReportHome.gmv ? (adsReportHome?.cost / adsReportHome?.gmv * 100).toFixed(1) : 0} %`,
      text: 'CIR',
      name: 'broad_cir',
    },
    {
      value: formatNumber(adsReportHome.click ? (adsReportHome?.cost / adsReportHome?.click) : 0),
      text: 'CPC',
      name: 'cpc',
    },
  ];

  useEffect(async () => {
    const info = await getItem('userInfo');
    setUserInfo(info);
  }, []);

  useEffect(() => {
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
    };

    dispatch(getShopReportHome(data));
    dispatch(getAdsReportHome(data));
    dispatch(getAdsPerformance(data));
  }, [currentShop, optionFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    const data = {
      id: currentShop?._id,
      optionFilter: optionFilter,
      type: 'homepage',
    };

    dispatch(getShopReportHome(data));
    dispatch(getAdsReportHome(data));
    dispatch(getAdsPerformance(data));
    setRefreshing(false);
  };

  useEffect(() => {
    fetchGoiSanPham();
  }, [goiSanPham]);

  useEffect(() => {
    const title = titleChart[0];
    const points = shopReportHome[title]?.points;
    if (points) {
      const labels = points.map(i => {
        if (optionFilter === 'past7days' || optionFilter === 'past30days') {
          return moment(i.timestamp * 1000).format('DD/MM');
        }
        return moment(i.timestamp * 1000).format('LT');
      });
      const data = points.map(i => {
        if (title === 'shop_uv_to_placed_buyers_rate') {
          return (i.value * 100).toFixed(2);
        }
        return i.value;
      });
      setLabelChart([...labels]);
      setDataChart([...data]);
    }
  }, [titleChart, shopReportHome]);

  const fetchGoiSanPham = () => {
    if (goiSanPham.extend_package?.length > 0) {
      const listGoi = goiSanPham.extend_package;
      const goi = listGoi.filter(i => i.channel === 'shopee_marketing');
      setGoi(goi[0]?.package?.name);
    }
  };

  const dataMenu = [
    {
      title: 'Tổng quan',
      icon: 'bar-chart-o',
      backgroundColor: '#f57b42',
      onPressButton: () => {
        navigation.navigate('TongQuanScreen');
      },
    },
    {
      title: 'Báo cáo hiệu quả',
      icon: 'list-alt',
      backgroundColor: '#e6470e',
      onPressButton: () => {
        navigation.navigate('BaoCaoHieuQuaScreen');
      },
    },
    {
      title: 'Quảng cáo tìm kiếm',
      icon: 'briefcase',
      backgroundColor: '#15ad47',
      onPressButton: () => {
        navigation.navigate('QuangCaoTimKiemScreen');
      },
    },
    {
      title: 'Quảng cáo khám phá',
      icon: 'briefcase',
      backgroundColor: '#142396',
      onPressButton: () => {
        navigation.navigate('QuangCaoKhamPhaScreen');
      },
    },
    {
      title: 'Công cụ từ khóa',
      icon: 'search',
      backgroundColor: '#e3c907',
      onPressButton: () => {
        navigation.navigate('CongCuTuKhoaScreen');
      },
    },
    {
      title: 'Quản lý shop',
      icon: 'inbox',
      backgroundColor: '#04cfad',
      onPressButton: () => {
        navigation.navigate('QuanLyShopScreen');
      },
    },
  ];

  const renderMenu = dataMenu.map((item, index) => {
    return (
      <View style={styles.tabItem} key={index}>
        <TouchableOpacity style={styles.menuItem} onPress={item.onPressButton}>
          <View
            style={{
              backgroundColor: item.backgroundColor,
              padding: 8,
              borderRadius: 10,
            }}>
            <Icon name={item.icon} size={20} color={COLOR.white} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontWeight: 'bold',
              color: COLOR.grey,
              fontSize: 13,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const renderListStatisticalShopReport = () => {
    return dataShopReportHome.map((item, index) => {
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
              fontFamily: 'SFUHelveticaBold',
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              color: COLOR.black,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.value}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderListStatisticalAdsReport = () => {
    return dataAdsReportHome.map((item, index) => {
      return (
        <View style={[styles.tabInfoItem]} key={index}>
          <Text
            style={{
              color: COLOR.grey,
              fontSize: 12,
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              color: COLOR.black,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.value}
          </Text>
        </View>
      );
    });
  };

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

  const onLogout = () => {
    dispatch(
      logout({
        callbackSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        },
      }),
    );
  };

  return (
    <Container>
      <ImageBackground
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
        source={require('../../../assets/image/Bg.png')}>
        <HeaderMain title="" navigation={navigation} />
        <View style={styles.infoHead}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginLeft: 32,
            }}>
            <View>
              <Thumbnail
                style={styles.logo}
                circular
                source={{
                  uri: 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-shopee-inkythuatso-2-01-24-14-52-10.jpg',
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 5 }}>
                {/* <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: COLOR.white,
                  }}>
                  {currentShop?.username}
                </Text> */}
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    dispatch(showModalSelectShop());
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: COLOR.white,
                    }}>
                    {currentShop?.username}
                  </Text>
                  <Icon
                    style={{
                      marginLeft: 5,
                    }}
                    size={20}
                    color={COLOR.white}
                    name={'sort-down'}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ color: COLOR.white }}>
                  ID:{currentShop?.shop_id}
                </Text>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              dispatch(showModalSelectShop());
            }}
            style={{
              backgroundColor: COLOR.white,
              borderColor: COLOR.secondary,
              borderWidth: 1,
              padding: 5,
              borderRadius: 3,
            }}>
            <Text style={{color: COLOR.secondary}}>Chọn shop</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
      <ModalScrollBottom />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{ width: '100%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={[
              styles.boxOption,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}>
            {renderListOptionFilter()}
          </View>

          <View style={styles.boxStatistical}>
            <Text
              style={{
                color: COLOR.black,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Chỉ số quảng cáo
            </Text>
            <View style={styles.listStatistical}>
              {renderListStatisticalAdsReport()}
            </View>
          </View>
          <View style={styles.boxStatistical}>
            <Text
              style={{
                color: COLOR.black,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Chỉ số toàn shop
            </Text>
            <View style={styles.listStatistical}>
              {renderListStatisticalShopReport()}
            </View>
            <View>
              <LineChartCustom
                data={dataChart}
                titleChart={titleChart}
                labels={labelChart}
              />
            </View>
          </View>

          {/* <View style={styles.menuTab}>{renderMenu}</View> */}

          {/* <View style={styles.boxArticle}>
            <Text
              style={{
                color: COLOR.black,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Thông báo
            </Text>
            <View style={styles.listArticle}>
              <View style={[styles.itemArticle]}>
                <View style={{flex: 1, marginRight: 5}}>
                  <Text
                    style={{
                      color: COLOR.grey,
                      fontSize: 16,
                    }}>
                    Số lượng quảng cáo không hiệu quả
                  </Text>
                  <Text
                    style={{
                      color: COLOR.grey,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {adsPerformance?.low_effective?.number}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BaoCaoHieuQuaScreen')}
                  style={{
                    backgroundColor: COLOR.primary,
                    padding: 10,
                    borderRadius: 6,
                  }}>
                  <Text style={{color: COLOR.white, fontSize: 12}}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.itemArticle]}>
                <View style={{flex: 1, marginRight: 5}}>
                  <Text
                    style={{
                      color: COLOR.grey,
                      fontSize: 16,
                    }}>
                    Số lượng quảng cáo sắp hết ngân sách
                  </Text>
                  <Text
                    style={{
                      color: COLOR.grey,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {adsPerformance?.low_quota?.number}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('QuangCaoHetNganSachScreen')
                  }
                  style={{
                    backgroundColor: COLOR.primary,
                    padding: 10,
                    borderRadius: 6,
                  }}>
                  <Text style={{color: COLOR.white, fontSize: 12}}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
          {/* 
          <View style={styles.footerContainer}>
            <SocialFooter />
          </View> */}
        </ScrollView>
      </View>
    </Container>
  );
};

export default HomeScreen;
