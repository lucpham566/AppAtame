import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'; // Version can be specified in package.json
import ModalUpdateKeywordPrice from './ModalUpdateKeywordPrice';
import ProductItem from './ProductItem';
import { Text } from 'react-native';

const ViewTypes = {
  ITEM: 0,
};

let { width } = Dimensions.get('window');

const ProductList = memo(props => {
  const [showModalUpdateKeywordPrice, setShowModalUpdateKeywordPrice] =
    useState(false);
  const [itemKeyword, setItemKeyword] = useState(null);
  const {
    keywordList,
    onUpdateStateKeyword,
    handleCheckKeyword,
    onUpdateKeywordPrice,
    toggleModelUpdateKeywordPrice
  } = props;

  // const toggleModelUpdateKeywordPrice = item => {
  //   setItemKeyword(item);
  //   setShowModalUpdateKeywordPrice(!showModalUpdateKeywordPrice);
  // };

  const _layoutProvider = useRef(layoutMaker()).current;
  const listView = useRef();

  const dataProvider = useMemo(
    () => dataProviderMaker(keywordList),
    [keywordList],
  );

  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.ITEM:
        return (
          <ProductItem
            item={data}
            handleCheckKeyword={handleCheckKeyword}
            onUpdateStateKeyword={onUpdateStateKeyword}
            toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={{ minHeight: 1, minWidth: 1 }}>
        <RecyclerListView
          ref={listView}
          nestedScrollEnabled={true}
          layoutProvider={_layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
          canChangeSize={true}
        />
      </View>
      {/* <ModalUpdateKeywordPrice
        toggleModelUpdateKeywordPrice={toggleModelUpdateKeywordPrice}
        onUpdateKeywordPriceMulti={onUpdateKeywordPrice}
        showModal={showModalUpdateKeywordPrice}
        itemKeyword={itemKeyword}
      /> */}
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
          dim.height = 50;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

const dataProviderMaker = data =>
  new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);

export default ProductList;
