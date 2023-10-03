import {Button, Content, Form, Input, Picker, Text} from 'native-base';
import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'; // Version can be specified in package.json
import ModalSelectSort from '../../../components/Modal/ModalSelectSort';
import {filterProductHelper} from '../../../helpers/helper';
import {COLOR} from '../../../theme';
import ProductItem from './ProductItem';

const ViewTypes = {
  ITEM: 0,
};

let {width, height} = Dimensions.get('window');

const ProductList = memo(props => {
  const productAdsListRe = useSelector(store => store.tongQuan.productAdsList);
  const [productAdsList, setProductAdsList] = useState([]);

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
    setProductAdsList(productAdsListRe);
  }, [productAdsListRe]);

  // Tìm kiếm
  useEffect(() => {
    if (nameSearch) {
      const productAdsListFilter = filterProductHelper(
        productAdsListRe,
        nameSearch,
      );
      setProductAdsList(productAdsListFilter);
    } else {
      setProductAdsList(productAdsListRe);
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

  const _layoutProvider = useRef(layoutMaker()).current;

  const listView = useRef();

  const dataProvider = useMemo(
    () => dataProviderMaker(productAdsList),
    [productAdsList],
  );

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
          }}>
          {/* <Text
          style={{
            color: COLOR.primary,
            fontWeight: 'bold',
            marginRight: 5,
            fontSize: 13,
          }}>
          SL: {productAdsList?.length}
        </Text> */}
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

          {/* <Picker
            style={{padding: 0}}
            mode="dropdown"
            // iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
            // style={{width: undefined}}
            selectedValue={optionOrder}
            onValueChange={setOptionOrder}
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff">
            {dataOptionOrder.map((i, index) => {
              return (
                <Picker.Item
                  key={index}
                  style={{fontSize: 13}}
                  label={i.name}
                  value={i.value}
                />
              );
            })}
          </Picker> */}
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
        </Form>
        <Text style={{marginVertical: 5, fontSize: 14, color: COLOR.grey}}>
          Có tất cả {productAdsList.length} sản phẩm
        </Text>
        <View style={{minHeight: 1, minWidth: 1, maxHeight: height}}>
          <RecyclerListView
            ref={listView}
            nestedScrollEnabled={true}
            layoutProvider={_layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            canChangeSize={true}
          />
        </View>
      </Content>
    </>
  );
});

const layoutMaker = () =>
  new LayoutProvider(
    index => {
      return ViewTypes.ITEM;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.ITEM:
          dim.width = width;
          dim.height = 90;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

const rowRenderer = (type, data) => {
  switch (type) {
    case ViewTypes.ITEM:
      return <ProductItem item={data} />;
    default:
      return null;
  }
};

const dataProviderMaker = data =>
  new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

export default ProductList;
