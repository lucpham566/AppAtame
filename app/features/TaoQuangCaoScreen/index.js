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
  createSearchAdsBySuggest,
  getProductList,
  showModalUpdateAds,
  updateAdsState,
} from './actions';
import ModalUpdateAds from './components/ModalUpdateAds';
import Toast from 'react-native-toast-message';
import { formatMoney, formatNumber } from './../../helpers/formatNumber';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const TaoQuangCaoScreen = ({ theme, navigation, route }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const productListRe = useSelector(store => store.taoQuangCao.productList);
  const [productList, setProductList] = useState([]);
  const [optionFilter, setOptionFilter] = useState('real_time');
  const [optionAdsList, setOptionAdsList] = useState('all');
  const [productName, setProductName] = useState('');
  const { campaignType, productOfCampaign } = route.params;
  const productCampaignList = productOfCampaign ? productOfCampaign : []
  const dispatch = useDispatch();

  useEffect(() => {
    if (productCampaignList && productCampaignList.length > 0) {
      setProductList(productListRe.filter(i => !productCampaignList.includes(i.itemid)));
    } else {
      setProductList(productListRe);
    }
  }, [productListRe]);

  useEffect(() => { }, [currentShop]);

  useEffect(() => {
    onFetchDataAdsList();
  }, [optionAdsList]);

  useEffect(() => {
    const productAdsListFilter = productListRe?.filter(i => {
      const name = i.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const nameCompare = productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return name.includes(nameCompare);
    });

    setProductList(productAdsListFilter);
  }, [productName]);

  const onFetchDataAdsList = () => {
    const data = {
      id: currentShop?._id,
      type: campaignType,
    };

    dispatch(getProductList(data));
  };

  const listOptionFilter = [
    { name: 'Ngày hôm nay', value: 'real_time' },
    { name: 'Ngày hôm qua', value: 'yesterday' },
    { name: '7 ngày vừa qua', value: 'past7days' },
    { name: '30 ngày vừa qua', value: 'past30days' },
  ];

  const renderListOptionFilter = () => {
    return listOptionFilter.map((item, index) => {
      return (
        <View style={[styles.tabOptionItem]} key={index}>
          <TouchableOpacity
            style={[
              optionFilter === item.value && styles.tabOptionItemActive,
              { backgroundColor: '#e8e8e8' },
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
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text> </Text>
      </TouchableOpacity>
    );
  };

  const handleCheckAds = (id, value) => {
    const newData = productList?.map(i => {
      if (i.itemid === id) {
        return { ...i, checked: value };
      }
      return { ...i };
    });
    setProductList([...newData]);
  };

  const onMakeAds = () => {
    const adsCheck = productList.filter(i => i.checked);
    const ids = adsCheck.map(i => {
      return i.itemid;
    });
    if (campaignType === 'search') {
      const data = {
        id: currentShop?._id,
        itemid_list: ids,
      };
      const callbackSuccess = () => {
        onFetchDataAdsList();
        navigation.goBack();
      };
      dispatch(createSearchAdsBySuggest(data, { callbackSuccess }));
    } else {
      navigation.navigate('SettingQCKPScreen', {
        adsCheck: adsCheck,
        onMakeAdsTargeting: data => onMakeAdsTargeting(data),
      });
    }
  };

  const onMakeAdsTargeting = data => {
    const adsCheck = productList.filter(i => i.checked);
    const ids = adsCheck.map(i => {
      return i.itemid;
    });

    const callbackSuccess = () => {
      onFetchDataAdsList();
      navigation.goBack();
    };
    dispatch(createSearchAdsBySuggest(data, { callbackSuccess }));
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Tạo chiến dịch mới"
        navigation={navigation}
      />
      <Content>
        <View style={styles.boxSection}>
          <Form
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                paddingHorizontal: 10,
              }}
              regular>
              <Icon name={'search'} size={16} color={COLOR.grey} />
              <Input
                placeholder="Tìm kiếm theo tên"
                style={{ fontSize: 13, height: 40, padding: 0 }}
                onChangeText={setProductName}
              />
            </Item>
          </Form>

          <Text style={{ fontSize: 16, marginVertical: 10, fontWeight: 'bold' }}>
            Danh sách sản phẩm
          </Text>
          <ProductList
            data={productList}
            onFetchDataAdsList={onFetchDataAdsList}
            handleCheckAds={handleCheckAds}
          />
        </View>
        <ModalUpdateAds onFetchDataAdsList={onFetchDataAdsList} />
      </Content>

      {productList.filter(i => i.checked).length > 0 && (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 20,
              fontSize: 16,
              color: COLOR.black,
            }}>
            {productList.filter(i => i.checked).length}/{productListRe.length}
          </Text>
          <Button
            onPress={onMakeAds}
            style={{ backgroundColor: COLOR.primary, borderRadius: 6, flex: 1 }}
            block>
            <Text style={{ color: COLOR.white }}>Xác nhận tạo chiến dịch</Text>
          </Button>
        </View>
      )}
    </Container>
  );
};

export default TaoQuangCaoScreen;
