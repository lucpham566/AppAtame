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

let {width} = Dimensions.get('window');

const ListView = memo(props => {
  const productAdsList = useSelector(store => store.tongQuan.productAdsList);

  const _layoutProvider = useRef(layoutMaker()).current;

  const listView = useRef();

  const dataProvider = useMemo(
    () => dataProviderMaker(productAdsList),
    [productAdsList],
  );

  return (
    <View style={{minHeight: 1, minWidth: 1, maxHeight: 300}}>
      <RecyclerListView
        ref={listView}
        nestedScrollEnabled={true}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
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
          dim.height = 110;
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

export default ListView;
