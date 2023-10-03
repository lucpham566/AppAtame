import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'; // Version can be specified in package.json
import ProductItem from './ProductItem';

const ViewTypes = {
  ITEM: 0,
};

let {width, height} = Dimensions.get('window');

const ProductList = memo(props => {
  const {data, onFetchDataAdsList, handleCheckAds} = props;

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

  const dataProvider = useMemo(() => dataProviderMaker(data), [data]);

  return (
    <View style={{minHeight: 1, minWidth: 1, height: 550}}>
      <RecyclerListView
        ref={listView}
        nestedScrollEnabled={true}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
        canChangeSize={true}
      />
    </View>
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
          dim.height = 100;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

export default ProductList;
