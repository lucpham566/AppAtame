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
import React, {useEffect, useState} from 'react';
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
import {DataTable} from 'react-native-paper';
import HeaderMain from '../../components/HeaderMain';
import HeaderTitle from './../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../theme';
import Chart from '../../components/Chart';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import ProductList from './components/ProductList';
import {showModalSelectShop} from '../MainScreen/actions';
import {
  getAdsReport,
  getProductAdsList,
  showModalUpdateAds,
  updateAdsState,
} from './actions';
import ModalUpdateAds from './components/ModalUpdateAds';
import Toast from 'react-native-toast-message';
import {formatMoney, formatNumber} from './../../helpers/formatNumber';
import HeaderTab from '../../components/HeaderTab';
import ProductItem from './components/ProductItem';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const BaoCaoHieuQuaScreen = ({theme, navigation}) => {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const adsReport = useSelector(store => store.baoCao.adsReport);
  const productAdsListRe = useSelector(store => store.baoCao.productAdsList);
  const [productAdsList, setProductAdsList] = useState([]);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionAdsList, setOptionAdsList] = useState('all');
  const [productName, setProductName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setProductAdsList(productAdsListRe);
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

    setProductAdsList(productAdsListFilter);
  }, [productName]);

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
    setProductAdsList(productAdsListRe);

    setRefreshing(false);
  };

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
    {name: 'Hôm nay', value: 'real_time'},
    {name: 'Hôm qua', value: 'yesterday'},
    {name: '7 ngày', value: 'past7days'},
    {name: '30 ngày', value: 'past30days'},
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
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon size={16} color={COLOR.primary} name="chevron-left" />
        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLOR.primary}}>
          {' '}
          Quay lại
        </Text>
      </TouchableOpacity>
    );
  };

  const handleCheckAds = (id, value) => {
    const newData = productAdsList?.map(i => {
      if (i.campaign?.campaignid === id) {
        return {...i, checked: value};
      }
      return {...i};
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

    dispatch(updateAdsState(data, {callbackSuccess}));
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
  const renderListProductPreview = productAdsList
    .map((item, index) => {
      return (
        <ProductItem
          onFetchDataAdsList={onFetchDataAdsList}
          item={item}
          key={item.campaign?.campaignid}
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
        {/* <Form style={{flexDirection: 'row'}}>
          <Item style={{flex: 1, paddingHorizontal: 10}} picker>
            <Label style={{fontSize: 15, fontWeight: 'bold'}}>
              Chọn shop :{' '}
            </Label>
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
          </Item>
        </Form> */}

        <View
          style={[
            styles.boxOption,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          {renderListOptionFilter()}
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.boxStatistical}>
            <View style={styles.titleBox}>
              <Text style={{fontSize: 16, marginBottom: 5, fontWeight: 'bold'}}>
                Hiệu quả quảng cáo
              </Text>
              {/* <Form style={{flexDirection: 'row', alignItems: 'center'}}>
                <Label>Nhập CIR:</Label>

                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.greyLight,
                    borderRadius: 5,
                    marginHorizontal: 4,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    flex: 1,
                  }}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: COLOR.white,
                    borderColor: COLOR.secondary,
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 3,
                  }}>
                  <Text style={{color: COLOR.secondary}}>Xác nhận</Text>
                </TouchableOpacity>
              </Form> */}
              <Text style={{fontSize: 12, marginTop: 5, color: COLOR.greyDark}}>
                * Chúng tôi quy định hiệu quả chiến dịch như sau: dưới 10% (
                hiệu quả tốt ), từ 10-20% ( hiệu quả trung bình ), trên 20% (
                hiệu quả thấp )
              </Text>
            </View>
            <View style={styles.listStatistical}>
              <View style={[styles.tabInfoItem]}>
                {/* <Icon name="list-alt" size={20} color={'#f57b42'} /> */}
                <Text
                  style={{
                    color: COLOR.grey,
                    fontSize: 12,
                  }}
                  numberOfLines={2}>
                  Số đơn hàng
                </Text>
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {adsReport?.checkout}
                </Text>
              </View>
              <View style={[styles.tabInfoItem]}>
                {/* <Icon name="edit" size={20} color={'#f57b42'} /> */}
                <Text
                  style={{
                    color: COLOR.grey,
                    fontSize: 12,
                  }}
                  numberOfLines={2}>
                  GMV
                </Text>
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {formatMoney(adsReport?.gmv)}
                </Text>
              </View>
              <View style={[styles.tabInfoItem]}>
                {/* <Icon name="star" size={20} color={'#f57b42'} /> */}
                <Text
                  style={{
                    color: COLOR.grey,
                    fontSize: 12,
                  }}
                  numberOfLines={2}>
                  Chi phí
                </Text>
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {formatMoney(adsReport?.cost)}
                </Text>
              </View>
              <View style={[styles.tabInfoItem]}>
                {/* <Icon name="edit" size={20} color={'#f57b42'} /> */}
                <Text
                  style={{
                    color: COLOR.grey,
                    fontSize: 12,
                  }}
                  numberOfLines={2}>
                  Số lượt xem
                </Text>
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {formatNumber(adsReport?.impression)}
                </Text>
              </View>
            </View>
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
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                fontWeight: 'bold',
                flex: 1,
              }}>
              Danh sách trương trình có hiệu quả thấp{' '}
              {`(${productAdsList.length})`}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.light,
                padding: 11,
                borderRadius: 4,
                marginLeft: 20,
              }}
              onPress={() => {
                navigation.navigate('BaoCaoProductScreen');
              }}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../assets/image/search.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <Form
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLOR.greyLight,
              height: 30,
            }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
              selectedValue={optionAdsList}
              onValueChange={setOptionAdsList}
              placeholder="Chọn loại quảng cáo"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff">
              <Picker.Item
                style={{fontSize: 13}}
                label="Tất cả quảng cáo"
                value="all"
              />
              <Picker.Item
                style={{fontSize: 13}}
                label="Quảng cáo tìm kiếm"
                value="search"
              />
              <Picker.Item
                style={{fontSize: 13}}
                label="Quảng cáo khám phá"
                value="targeting"
              />
            </Picker>
          </Form> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={onHandleOpenModalUpdate}
                style={{
                  backgroundColor: COLOR.secondary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  Điều chỉnh giá thầu
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={onchangeStateAdsMutil}
                style={{
                  backgroundColor: COLOR.secondary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  Tạm dừng hàng loạt
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {renderListProductPreview}
          {/* <ProductList
            data={productAdsList}
            onFetchDataAdsList={onFetchDataAdsList}
            handleCheckAds={handleCheckAds}
          /> */}
        </View>

        <ModalUpdateAds onFetchDataAdsList={onFetchDataAdsList} />
      </Content>
      {productAdsList.filter(i => i.checked === true).length > 0 ? (
        <View style={{padding: 10, flexDirection: 'row'}}>
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
