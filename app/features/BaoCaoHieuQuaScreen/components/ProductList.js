import {Content, Form, Input, Picker, Text} from 'native-base';
import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'; // Version can be specified in package.json
import ModalFilterCampaign from '../../../components/Modal/ModalFilterCampaign';
import {filterProductHelper} from '../../../helpers/helper';
import {COLOR} from '../../../theme';
import ProductItem from './ProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import ModalSelectSort from '../../../components/Modal/ModalSelectSort';

const ViewTypes = {
  ITEM: 0,
};

let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const ProductList = props => {
  const {
    data,
    onFetchDataAdsList,
    handleCheckAds,
    optionAdsList,
    setOptionAdsList,
  } = props;

  const [productAdsList, setProductAdsList] = useState([]);
  const [showModalFilter, setShowModalFilter] = useState(false);

  const [nameSearch, setNameSearch] = useState('');
  const [optionOrder, setOptionOrder] = useState('nameASC');

  const dataOptionOrder = [
    {
      name: 'Tên từ A - Z',
      value: 'nameASC',
    },
    {
      name: 'Tên từ Z - A',
      value: 'nameDESC',
    },
    {
      name: 'Doanh thu từ thấp đến cao',
      value: 'gmvASC',
    },
    {
      name: 'Doanh thu từ cao đến thấp',
      value: 'gmvDESC',
    },
    {
      name: 'Lượt xem từ thấp đến cao',
      value: 'clickASC',
    },
    {
      name: 'Lượt xem từ cao đến thấp',
      value: 'clickDESC',
    },
  ];

  const modalSellectSort = useRef(null);

  const onOpen = () => {
    modalSellectSort.current?.open();
  };

  useEffect(() => {
    setProductAdsList(data);
  }, [data]);

  // Tìm kiếm
  useEffect(() => {
    if (nameSearch) {
      const productAdsListFilter = filterProductHelper(data, nameSearch);
      setProductAdsList(productAdsListFilter);
    } else {
      setProductAdsList(data);
    }
  }, [nameSearch]);

  // Sắp xếp
  useEffect(() => {
    const compare = (a, b) => {
      switch (optionOrder) {
        case 'nameASC':
          if (a.product.name.toLowerCase() > b.product.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        case 'nameDESC':
          if (a.product.name.toLowerCase() > b.product.name.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        case 'gmvASC':
          return a.report.direct_gmv - b.report.direct_gmv;
        case 'gmvDESC':
          return b.report.direct_gmv - a.report.direct_gmv;
        case 'clickASC':
          return a.report.click - b.report.click;
        case 'clickDESC':
          return b.report.click - a.report.click;
        default:
          return 0;
      }
    };
    const productAdsListFilter = [...productAdsList].sort((a, b) =>
      compare(a, b),
    );
    setProductAdsList(productAdsListFilter);
  }, [optionOrder]);

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.ITEM:
        return (
          <ProductItem
            item={data}
            onFetchDataAdsList={onFetchDataAdsList}
            handleCheckAds={handleCheckAds}
            canChangeSize={true}
          />
        );
      default:
        return null;
    }
  };

  const dataProviderMaker = data =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

  const _layoutProvider = useRef(layoutMaker()).current;

  const listView = useRef();

  const dataProvider = useMemo(
    () => dataProviderMaker(productAdsList),
    [productAdsList],
  );

  const toggleModalFilter = () => {
    setShowModalFilter(!showModalFilter);
  };

  return (
    <>
      <ModalSelectSort
        value={optionOrder}
        onSellect={setOptionOrder}
        modalizeRef={modalSellectSort}
      />
      <Content
        style={{
          paddingHorizontal: 17,
          backgroundColor: COLOR.white,
        }}>
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
        </Form>
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              fontSize: 13,
              borderWidth: 1,
              borderColor: COLOR.greyLight,
              borderRadius: 5,
              paddingHorizontal: 10,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              style={{width: 16, height: 16}}
              source={require('../../../assets/image/search.png')}
            />
            <Input
              placeholder="Tìm kiếm sản phẩm"
              style={{
                fontSize: 13,
                height: 40,
              }}
              onChangeText={setNameSearch}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 12,
              backgroundColor: COLOR.light,
              borderRadius: 4,
              alignItems: 'center',
              width: 120,
            }}
            onPress={onOpen}>
            <Image
              style={{width: 16, height: 16, marginRight: 5}}
              source={require('../../../assets/image/sort.png')}
            />
            <Text
              numberOfLines={1}
              style={{color: COLOR.grey, fontSize: 14, marginRight: 3}}>
              {dataOptionOrder.find(i => i.value === optionOrder).name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleModalFilter}
            style={{
              flexDirection: 'row',
              padding: 12,
              backgroundColor: COLOR.light,
              borderRadius: 4,
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{color: COLOR.black, fontSize: 13}}>
              <Icon size={18} color={COLOR.black} name={'filter'} /> Lọc
            </Text>
          </TouchableOpacity>
        </Form>
        <Text style={{marginVertical: 5, fontSize: 14, color: COLOR.grey}}>
          Có tất cả {productAdsList.length} quảng cáo
        </Text>
        <View
          style={{
            minHeight: 1,
            minWidth: 1,
            height: height,
          }}>
          <RecyclerListView
            ref={listView}
            nestedScrollEnabled={true}
            layoutProvider={_layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
          />
        </View>
        <ModalFilterCampaign
          toggleModalFilter={toggleModalFilter}
          showModalFilter={showModalFilter}
          dataProductAds={data}
          setProductAdsList={setProductAdsList}
        />
      </Content>
    </>
  );
};

const layoutMaker = () =>
  new LayoutProvider(
    index => {
      return ViewTypes.ITEM;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.ITEM:
          dim.width = width;
          dim.height = 110;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

export default ProductList;
