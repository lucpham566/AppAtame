import {
  Thumbnail,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Tabs,
  Tab,
  TabHeading,
  Button,
  Input,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Keyboard,
  Image,
} from 'react-native';
import HeaderTitle from './../../components/HeaderTitle/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../theme';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import { searchKeyword, createKeywordFileAction, searchKeywordDone } from './actions';
import KeywordSaveList from './components/KeywordSaveList';
import Toast from 'react-native-toast-message';
import ModalSaveFile from './components/ModalSaveFile';
import ModalKeywordFile from './components/ModalKeywordFile';
import { addKeywordAds, updateKeywordState } from '../AdsDetailScreen/actions';

const KeywordForProductScreen = ({ theme, navigation, route }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const keywordRe = useSelector(store => store.congCuTuKhoa.keywords);
  const [keywords, setKeywords] = useState([]);
  const [optionSearch, setOptionSearch] = useState('shopee');
  const [showModelSaveFile, setShowModelSaveFile] = useState(false);
  const [showModelKeywordFile, setShowModelKeywordFile] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywordListSaved, setKeywordListSaved] = useState([]);

  const { adsId, productName, itemid, keywordOfProduct } = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    onSearchKeyword();
  }, []);

  useEffect(() => {
    setKeywords(keywordRe);
  }, [keywordRe]);

  useEffect(() => {
    setKeywords(pre => {
      return pre.map(i => {
        if (keywordListSaved.some(j => j.keyword === i.keyword)) {
          return { ...i, checked: true };
        } else {
          return { ...i, checked: false };
        }
      });
    });
  }, [keywordListSaved]);

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          dispatch(searchKeywordDone([]))
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.primary,
          }}></Text>
      </TouchableOpacity>
    );
  };

  const onSearchKeyword = () => {
    Keyboard.dismiss();
    const data = {
      shop_id: currentShop?._id,
      keyword,
      itemid: itemid,
      optionSearch,
    };
    dispatch(searchKeyword(data));
  };

  const addKeyword = item => {
    if (keywordListSaved.some(i => i.keyword === item.keyword)) {
      setKeywordListSaved(preState =>
        preState.filter(i => i.keyword !== item.keyword),
      );
    } else {
      setKeywordListSaved(preState => {
        return [{ ...item }, ...preState];
      });
    }
  };

  const removeKeyword = item => {
    setKeywordListSaved(preState =>
      preState.filter(i => i.keyword !== item.keyword),
    );
  };

  const removeAllKeyword = () => {
    setKeywordListSaved([]);
  };

  const createKeywordFile = name => {
    const keyword_json = keywordListSaved.map(i => {
      return {
        keyword: i.keyword,
        results: i.results,
        sp_volume: i.shopee_volume,
        sp_price: i.shopee_price,
        relevance: 10,
        checked: false,
        loading: false,
        price: i.shopee_price,
      };
    });
    const data = {
      filename: name,
      keyword_json,
    };
    const callbackSuccess = () => {
      setKeywordListSaved([]);
    };
    dispatch(createKeywordFileAction(data, { callbackSuccess }));
  };
  const toggleModelSaveFile = () => {
    setShowModelSaveFile(!showModelSaveFile);
  };

  const toggleModelKeywordFile = () => {
    setShowModelKeywordFile(!showModelKeywordFile);
  };

  const onAddKeywordForProduct = (keywords) => {
    // const dataCheck = keywordListSaved.map(i => {
    //   return {
    //     keyword: i.keyword,
    //     algorithm: 'kwrcmdv2',
    //     match_type: 0,
    //     price: i.shopee_price,
    //     status: 1,
    //   };
    // });
    const dataCheck = keywords.map(i => {
      return {
        keyword: i.keyword,
        algorithm: 'kwrcmdv2',
        match_type: 0,
        price: i.shopee_price,
        status: 1,
      };
    });

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };

    const callbackSuccess = () => {
      setKeywordListSaved([]);
      navigation.goBack();
    };

    dispatch(addKeywordAds(data, { callbackSuccess }));
  };

  const onAddKeywordForProductModal = d => {
    const dataCheck = d.map(i => {
      return {
        keyword: i.keyword,
        algorithm: 'kwrcmdv2',
        match_type: 0,
        price: i.shopee_price,
        status: 1,
      };
    });

    const data = {
      id: currentShop?._id,
      campaign_id: adsId,
      placement: 0,
      keyword_list: dataCheck,
    };

    dispatch(addKeywordAds(data));
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Thêm từ khóa"
        navigation={navigation}
      />

      <View>
        {/* <View style={styles.header}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', color: COLOR.grey }}>
              Campaign ID: <Text style={{ color: COLOR.primary }}>{adsId}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ flex: 1, color: COLOR.greyDark, fontWeight: 'bold' }}
              numberOfLines={1}>
              {productName}
            </Text>
          </View>
        </View> */}
        <View style={{ padding: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{ flex: 1, padding: 3 }}>
              <TouchableOpacity
                onPress={() => setOptionSearch('shopee')}
                style={{
                  backgroundColor:
                    optionSearch === 'shopee'
                      ? COLOR.secondary
                      : COLOR.greyLight,
                  padding: 5,
                  borderRadius: 3,
                }}>
                <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                  Shopee
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 3 }}>
              <TouchableOpacity
                onPress={() => setOptionSearch('atosa')}
                style={{
                  backgroundColor:
                    optionSearch === 'atosa'
                      ? COLOR.secondary
                      : COLOR.greyLight,
                  padding: 5,
                  borderRadius: 3,
                }}>
                <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                  Atosa
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 1, padding: 3 }}>
              <TouchableOpacity
                onPress={toggleModelKeywordFile}
                style={{
                  backgroundColor: COLOR.primary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                  File đã lưu
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <Text style={{ fontWeight: 'bold', color: COLOR.secondary, marginLeft: 5 }}>
            Công cụ tìm kiếm : {optionSearch}
          </Text>
        </View>
        <Form style={{ flexDirection: 'row', padding: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.greyLight,
              padding: 0,
              fontSize: 16,
              flex: 1,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              height: 40,
              paddingHorizontal: 10,
            }}>
            <Input
              style={{
                padding: 0,
                fontSize: 16,
              }}
              placeholder="Nhập từ khóa cần phân tích"
              placeholderTextColor={COLOR.grey}
              onChangeText={setKeyword}
              value={keyword}
            />
          </View>
          <TouchableOpacity
            onPress={onSearchKeyword}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              backgroundColor: COLOR.primary,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              width: 50,
            }}
            block>
            <Text
              style={{ fontWeight: 'bold', color: COLOR.white, fontSize: 13 }}>
              <Icon name="search" color={COLOR.white} size={16} />
            </Text>
          </TouchableOpacity>
        </Form>
        <View style={styles.boxSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>
              Danh sách từ khóa
            </Text>
            <TouchableOpacity
              onPress={toggleModelKeywordFile}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: COLOR.grey }}>
                Tệp từ khóa {' '}
              </Text>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../assets/image/folder.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={toggleModelKeywordFile}
                style={{
                  backgroundColor: COLOR.secondary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  File từ khóa đã lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <TouchableOpacity
            disabled={!keywordListSaved.length > 0}
            onPress={() =>
              navigation.navigate('DanhSachTuKhoaDaChonScreen', {
                removeAllKeyword: () => removeAllKeyword(),
                keywordListSaved: keywordListSaved,
                removeKeyword: i => removeKeyword(i),
                forProduct: true,
                onAddKeywordForProduct: (keywords) => onAddKeywordForProduct(keywords),
              })
            }
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                keywordListSaved.length > 0 ? '#F9F1E6' : COLOR.greyLight,
              padding: 10,
              borderRadius: 4,
              width: 180,
            }}>
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor:
                  keywordListSaved.length > 0 ? COLOR.primary : COLOR.grey,
              }}
              source={require('../../assets/image/word_choose.png')}
            />
            <Text
              style={{
                color: keywordListSaved.length > 0 ? COLOR.black : COLOR.grey,
                fontWeight: keywordListSaved.length > 0 ? 'bold' : 'normal',
              }}>
              {' '}
              Từ khóa đã chọn{' '}
              {keywordListSaved.length > 0
                ? `(${keywordListSaved.length})`
                : null}
            </Text>
          </TouchableOpacity>

        </View>

        {/* <View style={styles.boxSection}>
          <Text style={{fontSize: 16, marginBottom: 5, fontWeight: 'bold'}}>
            Danh sách từ khóa đã chọn
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={onAddKeywordForProduct}
                style={{
                  backgroundColor: COLOR.success,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  Thêm từ khóa
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={removeAllKeyword}
                style={{
                  backgroundColor: COLOR.danger,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  Xóa toàn bộ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <KeywordSaveList
            data={keywordListSaved}
            removeKeyword={removeKeyword}
          />
        </View> */}
      </View>
      <ProductList
        data={keywords}
        addKeyword={addKeyword}
        adsId={adsId}
        keywordOfProduct={keywordOfProduct}
        keywordListSaved={[]}
      />
      {showModelSaveFile && (
        <ModalSaveFile
          createKeywordFile={createKeywordFile}
          toggleModelSaveFile={toggleModelSaveFile}
        />
      )}
      {showModelKeywordFile && (
        <ModalKeywordFile
          navigation={navigation}
          toggleModelKeywordFile={toggleModelKeywordFile}
          onAddKeywordForProductModal={onAddKeywordForProductModal}
          adsId={adsId}
          keywordOfProduct={keywordOfProduct}
        />
      )}
    </Container>
  );
};

export default KeywordForProductScreen;
