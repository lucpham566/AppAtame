import {
  Thumbnail,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
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
import {showModalSelectShop} from '../MainScreen/actions';
import {
  getAdsReport,
  getProductAdsList,
  showModalUpdateAds,
  updateAdsState,
} from './actions';
import ModalUpdateAds from './components/ModalUpdateAds';
import Toast from 'react-native-toast-message';
import {formatMoney, formatNumber} from '../../helpers/formatNumber';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const QuangCaoHetNganSachScreen = ({theme, navigation}) => {
  const shopList = useSelector(store => store.account.shopList);
  const currentShop = useSelector(store => store.account.currentShop);
  const adsReport = useSelector(store => store.baoCao.adsReport);
  const lowQuotaCampaignIds = useSelector(
    store => store.account.lowQuotaCampaignIds,
  );
  const productAdsListData = useSelector(store => store.baoCao.productAdsList);
 
  const [productAdsListRe, setProductAdsListRe] = useState([]);
  const [productAdsList, setProductAdsList] = useState([]);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionAdsList, setOptionAdsList] = useState('all');
  const [productName, setProductName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setProductAdsListRe(
      productAdsListData.filter(i =>
        lowQuotaCampaignIds.includes(i.campaign.campaignid),
      ),
    );
  }, [productAdsListData]);

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
              optionFilter === item.value && styles.tabOptionItemActive,
              {
                backgroundColor: COLOR.white,
                shadowColor: COLOR.primary,
                shadowOffset: {width: 0, height: 0},
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

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Quảng cáo sắp hết ngân sách"
        navigation={navigation}
      />
      <Content>
        <View style={styles.boxSection}>
          {/* <Text style={{fontSize: 16, marginBottom: 5, fontWeight: 'bold'}}>
            Danh sách trương trình có hiệu quả thấp
          </Text> */}
          <Form
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
            {/* <Input
              placeholder="Tìm kiếm theo tên"
              style={{
                fontSize: 13,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                height: 30,
                padding: 5,
                borderRadius: 5,
              }}
              onChangeText={setProductName}
            /> */}
          </Form>
          <View
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
          </View>
          <ProductList
            data={productAdsList}
            onFetchDataAdsList={onFetchDataAdsList}
            handleCheckAds={handleCheckAds}
            maxHeight={500}
          />
        </View>
        <ModalUpdateAds onFetchDataAdsList={onFetchDataAdsList} />
      </Content>
    </Container>
  );
};

export default QuangCaoHetNganSachScreen;
