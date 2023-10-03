import { Button, Container, Content } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney, formatNumber } from '../../helpers/formatNumber';
import { COLOR } from '../../theme';
import { useForm, Controller } from 'react-hook-form';
import { getKeywordFileDetail, getKeywordFiles } from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderTitle from '../../components/HeaderTitle';
import ProductList from './components/ProductList';
import KeywordSaveList from './components/KeywordSaveList';
import styles from './styles';
import { showModalPrompt } from '../../components/Modal/ModalPrompt/actions';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

function KeywordFileDetailScreen(props) {
  const { navigation, route } = props;
  const keywordFileDetail = useSelector(
    store => store.congCuTuKhoa.keywordFileDetail,
  );
  const [keywords, setKeywords] = useState([]);
  const [keywordListSaved, setKeywordListSaved] = useState([]);

  const { id, fileName, keyword_count, onAddKeywordForProductModal, adsId, keywordOfProduct } =
    route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (keywordFileDetail.keyword_json) {
      setKeywords(keywordFileDetail.keyword_json);
    }
  }, [keywordFileDetail]);

  useEffect(() => {
    setKeywords(pre => {
      return pre.map(i => {
        if (keywordListSaved.some(j => j.keyword === i.keyword)) {
          return { ...i, checked: true };
        } else {
          return { ...i };
        }
      });
    });
  }, [keywordListSaved]);

  useEffect(() => {
    const data = {
      id,
    };
    dispatch(getKeywordFileDetail(data));
  }, []);

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.primary }}>
          {' '}
        </Text>
      </TouchableOpacity>
    );
  };

  const addKeyword = item => {
    if (keywordListSaved.some(i => i.keyword === item.keyword)) {
      setKeywordListSaved(preState => {
        return preState.filter(i => i.keyword !== item.keyword);
      });
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
    Toast.show({
      type: 'success',
      text1: 'Xóa toàn bộ từ khóa thành công',
    });
  };

  const onAddKeywordForProduct = () => {
    setKeywordListSaved([]);
    onAddKeywordForProductModal(keywordListSaved);
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title={'Chi tiết file'}
        navigation={navigation}
      />

      <View>
        <View style={styles.boxSection}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', color: COLOR.grey }}>
              Tên file: <Text style={{ color: COLOR.primary }}>{fileName}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ flex: 1, color: COLOR.greyDark, fontWeight: 'bold' }}
              numberOfLines={1}>
              số lượng từ khóa : {keyword_count}
            </Text>
          </View>
          {adsId ? <TouchableOpacity
            disabled={!keywordListSaved.length > 0}
            onPress={() =>
              navigation.navigate('DanhSachTuKhoaDaChonScreen', {
                removeAllKeyword: () => removeAllKeyword(),
                keywordListSaved: keywordListSaved,
                removeKeyword: i => removeKeyword(i),
                forProduct: true,
                onAddKeywordForProduct: () => onAddKeywordForProduct(),
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
          </TouchableOpacity> : null}

        </View>

        {/* {adsId && (
          <View style={styles.boxSection}>
            <Text style={{fontSize: 16, marginBottom: 5, fontWeight: 'bold'}}>
              Danh sách từ khóa đã chọn
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}></View>
            <KeywordSaveList
              data={keywordListSaved}
              removeKeyword={removeKeyword}
            />
          </View>
        )} */}
      </View>
      <ProductList
        data={keywords}
        addKeyword={addKeyword}
        adsId={adsId}
        fileId={id}
        maxHeight={height}
        keywordListSaved={keywordListSaved}
        keywordOfProduct={keywordOfProduct}
      />
      {/* {adsId && keywords.length > 0 ? (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Button
            onPress={removeAllKeyword}
            style={{
              backgroundColor: COLOR.greyLight,
              margin: 5,
              borderRadius: 5,
              flex: 1,
            }}
            block>
            <Text
              style={{
                color: COLOR.greyDark,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Xóa toàn bộ
            </Text>
          </Button>
          <Button
            onPress={() => {
              dispatch(
                showModalPrompt(
                  { title: 'Thông báo', text: 'Bạn có chắc thêm từ khóa' },
                  { callbackSuccess: () => onAddKeywordForProduct() },
                ),
              );
            }}
            style={{
              backgroundColor: COLOR.primary,
              margin: 5,
              borderRadius: 5,
              flex: 1,
            }}
            block>
            <Text
              style={{
                color: COLOR.white,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thêm từ khóa
            </Text>
          </Button>
        </View>
      ) : null} */}
    </Container>
  );
}

export default KeywordFileDetailScreen;
