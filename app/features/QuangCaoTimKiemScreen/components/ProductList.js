import { Form, Input, Text, Picker } from 'native-base';
import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'; // Version can be specified in package.json
import ModalFilterCampaign from '../../../components/Modal/ModalFilterCampaign';
import { filterProductHelper } from '../../../helpers/helper';
import { COLOR } from '../../../theme';
import ProductItem from './ProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelectSort from '../../../components/Modal/ModalSelectSort';

const ViewTypes = {
  ITEM: 0,
};

let { width } = Dimensions.get('window');

const ProductList = props => {
  const { data, onFetchDataAdsList, navigation, handleCheckAds, onDeleteRule } = props;
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

  useEffect(() => {
    setProductAdsList(data);
  }, [data]);

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.ITEM:
        return (
          <ProductItem
            item={data}
            onFetchDataAdsList={onFetchDataAdsList}
            navigation={navigation}
            handleCheckAds={handleCheckAds}
            onDeleteRule={onDeleteRule}
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
      {/* <Form
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLOR.primary,
            fontWeight: 'bold',
            marginRight: 5,
            fontSize: 13,
          }}>
          SL: {productAdsList?.length}
        </Text>
        <Input
          placeholder="Tìm kiếm theo tên"
          style={{
            fontSize: 13,
            borderWidth: 1,
            borderColor: COLOR.greyLight,
            height: 30,
            padding: 5,
            borderRadius: 5,
          }}
          onChangeText={setNameSearch}
        />
        <Picker
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
        </Picker>
        <TouchableOpacity
          onPress={toggleModalFilter}
          style={{
            backgroundColor: COLOR.white,
            borderColor: COLOR.secondary,
            borderWidth: 1,
            padding: 5,
            borderRadius: 3,
          }}>
          <Text style={{color: COLOR.secondary, fontSize: 13}}>
            <Icon size={23} color={COLOR.secondary} name={'filter'} /> Lọc
          </Text>
        </TouchableOpacity>
      </Form> */}
      <View
        style={{
          backgroundColor: COLOR.white,
        }}>
        <Text style={{ marginVertical: 5, fontSize: 14, color: COLOR.grey }}>
          Có tất cả {productAdsList.length} cấu hình
        </Text>
        <View style={{ minHeight: 1, minWidth: 1, flex: 1 }}>
          <RecyclerListView
            ref={listView}
            nestedScrollEnabled={true}
            layoutProvider={_layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            canChangeSize={true}
          />
        </View>
        {/* <ModalFilterCampaign
          toggleModalFilter={toggleModalFilter}
          showModalFilter={showModalFilter}
          dataProductAds={data}
          setProductAdsList={setProductAdsList}
        /> */}
      </View>
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
          dim.height = 100;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

export default ProductList;
