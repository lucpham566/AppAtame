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
import {COLOR} from '../../../../theme';
import ProductItem from './ProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import ModalSelectSort from '../../../../components/Modal/ModalSelectSort';

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

  const [productAdsList, setProductAdsList] = useState(data);
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
        // case 'nameASC':
        //   if (a.product.name.toLowerCase() > b.product.name.toLowerCase()) {
        //     return 1;
        //   } else {
        //     return -1;
        //   }
        // case 'nameDESC':
        //   if (a.product.name.toLowerCase() > b.product.name.toLowerCase()) {
        //     return -1;
        //   } else {
        //     return 1;
        //   }
        // case 'gmvASC':
        //   return a.report.direct_gmv - b.report.direct_gmv;
        // case 'gmvDESC':
        //   return b.report.direct_gmv - a.report.direct_gmv;
        // case 'clickASC':
        //   return a.report.click - b.report.click;
        // case 'clickDESC':
        //   return b.report.click - a.report.click;
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
          // <Text
          //     numberOfLines={1}
          //     style={{color: COLOR.grey, fontSize: 14, marginRight: 3}}>
          //    xin chào
          //   </Text>
          <ProductItem
            item={data}
            onFetchDataAdsList={onFetchDataAdsList}
            handleCheckAds={handleCheckAds}
            canChangeSize={true}
            optionAdsList={optionAdsList}
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
          paddingHorizontal: 15,
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
              label="Chiến dịch"
              value="campaign"
            />
            <Picker.Item
              style={{fontSize: 13}}
              label="Nhóm quảng cáo"
              value="adgroup"
            />
            <Picker.Item
              style={{fontSize: 13}}
              label="Quảng cáo"
              value="ads"
            />
          </Picker>
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
        {/* <ModalFilterCampaign
          toggleModalFilter={toggleModalFilter}
          showModalFilter={showModalFilter}
          dataProductAds={data}
          setProductAdsList={setProductAdsList}
        /> */}
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
