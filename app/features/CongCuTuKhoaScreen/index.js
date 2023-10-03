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
import { searchKeyword, createKeywordFileAction } from './actions';
import KeywordSaveList from './components/KeywordSaveList';
import Toast from 'react-native-toast-message';
import ModalSaveFile from './components/ModalSaveFile';
import ModalKeywordFile from './components/ModalKeywordFile';
import HeaderTab from '../../components/HeaderTab';

let { width, height } = Dimensions.get('window');

const CongCuTuKhoaScreen = ({ theme, navigation }) => {
  const currentShop = useSelector(store => store.account.currentShop);
  const keywordRe = useSelector(store => store.congCuTuKhoa.keywords);
  const [keywords, setKeywords] = useState([]);
  const [showModelSaveFile, setShowModelSaveFile] = useState(false);
  const [showModelKeywordFile, setShowModelKeywordFile] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywordListSaved, setKeywordListSaved] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keywordRe && keywordRe.length > 0 && keywordRe[0].competition_level) {
      setKeywords(keywordRe);
    }
    else {
      setKeywords([]);
    }
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
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.primary} name="chevron-left" />
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.primary }}>
          {' '}
          Quay lại
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemRight = () => {
    return (
      <TouchableOpacity
        onPress={toggleModelKeywordFile}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: COLOR.grey }}>
          Tệp từ khóa đã lưu{' '}
        </Text>
        <Image
          style={{ width: 24, height: 24 }}
          source={require('../../assets/image/folder.png')}
        />
      </TouchableOpacity>
    );
  };

  const onSearchKeyword = () => {
    Keyboard.dismiss();
    const data = {
      shop_id: currentShop?._id,
      keyword,
      optionSearch: 'atosa',
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
    setKeywords(pre => {
      return pre.map(i => {
        return { ...i, checked: false };
      });
    });
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

  return (
    <Container>
      <HeaderTab
        renderItemLeft={renderItemLeft()}
        title="Công cụ từ khóa"
        navigation={navigation}
        renderItemRight={renderItemRight()}
      />

      <View>
        <Form style={{ flexDirection: 'row', padding: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLOR.greyLight,
              height: 30,
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
                onPress={toggleModelSaveFile}
                style={{
                  backgroundColor: COLOR.secondary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{color: COLOR.white, textAlign: 'center'}}>
                  Lưu file
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 3}}>
              <TouchableOpacity
                onPress={removeAllKeyword}
                style={{
                  backgroundColor: COLOR.secondary,
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
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>
          Lượt tìm kiếm và giá thầu từ khóa
        </Text>
        <TouchableOpacity
          disabled={!keywordListSaved.length > 0}
          onPress={() =>
            navigation.navigate('DanhSachTuKhoaDaChonScreen', {
              removeAllKeyword: () => removeAllKeyword(),
              keywordListSaved: keywordListSaved,
              removeKeyword: i => removeKeyword(i),
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
      <ProductList
        data={keywords}
        addKeyword={addKeyword}
        keywordListSaved={keywordListSaved}
        maxHeight={height}
      />

      {keywords && keywords.length > 0 ? (
        <></>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            marginTop: 0
          }}>
          <Image
            style={{ height: width - 150, width: width - 150 }}
            source={require('../../assets/image/CCTK_banner.png')}
          />
          <Text style={{ textAlign: 'center', color: COLOR.grey }}>
            Hiện chưa có từ khóa nào.{'\n'}Bạn vui lòng nhập từ khóa cần
            phân tích.
          </Text>
        </View>
      )}



      {/* <ListView data={productAdsList}/> */}
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
        />
      )}
    </Container>
  );
};

export default CongCuTuKhoaScreen;
