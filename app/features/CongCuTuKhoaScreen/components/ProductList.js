import { Form, Input, Picker, Text } from 'native-base';
import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'; // Version can be specified in package.json
import { COLOR } from '../../../theme';
import ProductItem from './ProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalFilterKeyword from '../../../components/Modal/ModalFilterKeyword';
import ModalSelectSort from '../../../components/Modal/ModalSelectSort';
import { Image } from 'react-native';
import ModalSelectSortKeyword from '../../../components/Modal/ModalSelectSortKeyword';

const ViewTypes = {
  ITEM: 0,
};

let { width } = Dimensions.get('window');

const ProductList = memo(props => {
  const { data, addKeyword, adsId, fileId, maxHeight, keywordListSaved, keywordOfProduct } = props;

  const [keywordList, setKeywordList] = useState([]);
  const [showModalFilter, setShowModalFilter] = useState(false);

  const [nameSearch, setNameSearch] = useState('');
  const [optionOrder, setOptionOrder] = useState('nameASC');

  const dataOptionOrder = [
    {
      name: 'Lượt tìm kiếm atosa từ cao đến thấp',
      value: 'resultDESC',
    },
    {
      name: 'Lượt tìm kiếm atosa từ thấp đến cao',
      value: 'resultASC',
    },
    {
      name: 'Tên từ A - Z',
      value: 'nameASC',
    },
    {
      name: 'Tên từ Z - A',
      value: 'nameDESC',
    },
    {
      name: 'Lượt tìm kiếm shopee từ cao đến thấp',
      value: 'resultShopeeDESC',
    },
    {
      name: 'Lượt tìm kiếm shopee từ thấp đến cao',
      value: 'resultShopeeASC',
    },
  ];

  const modalSellectSort = useRef(null);

  const onOpen = () => {
    modalSellectSort.current?.open();
  };


  useEffect(() => {
    setKeywordList([...data]);
  }, [data]);

  // Tìm kiếm
  useEffect(() => {
    if (nameSearch) {
      const keywordListFilter = data.filter(i => {
        const name = i.keyword
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const nameCompare = nameSearch
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        return name.includes(nameCompare);
      });
      setKeywordList(keywordListFilter);
    } else {
      setKeywordList(data);
    }
  }, [nameSearch]);

  // Sắp xếp
  useEffect(() => {
    const compare = (a, b) => {
      switch (optionOrder) {
        case 'nameASC':
          if (a.keyword.toLowerCase() > b.keyword.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        case 'nameDESC':
          if (a.keyword.toLowerCase() > b.keyword.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        case 'resultASC':
          return a.results - b.results;
        case 'resultDESC':
          return b.results - a.results;
        case 'resultShopeeASC':
          if (fileId) {
            return a.sp_volume - b.sp_volume;
          } else {
            return a.shopee_volume - b.shopee_volume;
          }
        case 'resultShopeeDESC':
          if (fileId) {
            return b.sp_volume - a.sp_volume;
          } else {
            return b.shopee_volume - a.shopee_volume;
          }
        default:
          return 0;
      }
    };
    const keywordListFilter = [...keywordList].sort((a, b) => compare(a, b));
    setKeywordList(keywordListFilter);
  }, [optionOrder]);

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.ITEM:
        return (
          <ProductItem
            item={data}
            addKeyword={addKeyword}
            adsId={adsId}
            fileId={fileId}
            keywordListSaved={keywordListSaved}
            keywordOfProduct={keywordOfProduct}
            checked={keywordListSaved.some(i => i.keyword === data.keyword)}
          />
        );
      default:
        return null;
    }
  };

  const _layoutProvider = useRef(layoutMaker()).current;

  const listView = useRef();

  const dataProviderMaker = data =>
    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

  const dataProvider = useMemo(
    () => dataProviderMaker(keywordList),
    [keywordList],
  );

  const toggleModalFilter = () => {
    setShowModalFilter(!showModalFilter);
  };

  if (data && data.length > 0) {
    return (
      <>
        <ModalSelectSortKeyword
          value={optionOrder}
          onSellect={setOptionOrder}
          modalizeRef={modalSellectSort}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Form
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
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
                style={{ width: 16, height: 16 }}
                source={require('../../../assets/image/search.png')}
              />
              <Input
                placeholder="Tìm kiếm"
                style={{
                  fontSize: 13,
                  height: 40,
                }}
                numberOfLines={1}
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
                style={{ width: 16, height: 16, marginRight: 5 }}
                source={require('../../../assets/image/sort.png')}
              />
              <Text
                numberOfLines={1}
                style={{ color: COLOR.grey, fontSize: 14, marginRight: 3 }}>
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
              <Text style={{ color: COLOR.black, fontSize: 13 }}>
                <Icon size={18} color={COLOR.black} name={'filter'} /> Lọc
              </Text>
            </TouchableOpacity>
          </Form>
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
            SL: {keywordList?.length}
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
            style={{ padding: 0 }}
            mode="dropdown"
            // iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
            // style={{width: undefined}}
            selectedValue={optionOrder}
            onValueChange={setOptionOrder}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff">
            {dataOptionOrder.map((i, index) => {
              return (
                <Picker.Item
                  key={index}
                  style={{ fontSize: 13 }}
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
            <Text style={{ color: COLOR.secondary, fontSize: 13 }}>
              <Icon size={23} color={COLOR.secondary} name={'filter'} /> Lọc
            </Text>
          </TouchableOpacity>
        </Form> */}
          <View
            style={{ minHeight: 1, minWidth: 1 }}>
            <RecyclerListView
              ref={listView}
              nestedScrollEnabled={true}
              layoutProvider={_layoutProvider}
              dataProvider={dataProvider}
              rowRenderer={rowRenderer}
              canChangeSize={true}
            />
          </View>
          <ModalFilterKeyword
            toggleModalFilter={toggleModalFilter}
            showModalFilter={showModalFilter}
            dataKeyword={data}
            setKeywordList={setKeywordList}
          />
        </View>
      </>
    );
  }

  return <></>


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
          dim.height = 60;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

export default ProductList;
