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
import KeywordSaveItem from './KeywordSaveItem';

const ViewTypes = {
  ITEM: 0,
};

let { width } = Dimensions.get('window');

const KeywordSaveList = props => {
  const { data, removeKeyword, ToggleModalKeywordPrice, handleCheck } = props;
  const rowRenderer = (type, data) => {
    switch (type) {
      case ViewTypes.ITEM:
        return <KeywordSaveItem item={data} removeKeyword={removeKeyword} handleCheck={handleCheck} ToggleModalKeywordPrice={ToggleModalKeywordPrice} />;
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
          dim.height = 80;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

export default KeywordSaveList;
