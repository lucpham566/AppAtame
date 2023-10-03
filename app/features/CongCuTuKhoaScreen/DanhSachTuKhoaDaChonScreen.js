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
  CheckBox,
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
import HeaderTitle from '../../components/HeaderTitle/index';
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
import { showModalPrompt } from '../../components/Modal/ModalPrompt/actions';
import ModalUpdatePrice from './components/ModalUpdatePrice';

let { width } = Dimensions.get('window');

const DanhSachTuKhoaDaChonScreen = ({ theme, navigation, route }) => {
  const [keywords, setKeywords] = useState([]);
  const [showModelSaveFile, setShowModelSaveFile] = useState(false);
  const [showModelKeywordFile, setShowModelKeywordFile] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywordListSaved, setKeywordListSaved] = useState(
    route.params.keywordListSaved,
  );
  const [modalKeywordPrice, setModalKeywordPrice] = useState(false);
  const [modalKeywordPriceMulti, setModalKeywordPriceMulti] = useState(false);
  const [itemKeywordUpdate, setItemKeywordUpdate] = useState(null);
  const [isCheckAll, setIsCheckAll] = useState(false);


  const { forProduct } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (keywordListSaved.filter(i => i.checked).length == keywordListSaved.length) {
      setIsCheckAll(true)
    } else {
      setIsCheckAll(false)
    }
  }, [keywordListSaved])


  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text> </Text>
      </TouchableOpacity>
    );
  };

  const removeKeyword = item => {
    setKeywordListSaved(preState =>
      preState.filter(i => i.keyword !== item.keyword),
    );
    route.params.removeKeyword(item);
  };

  const removeAllKeyword = () => {
    setKeywordListSaved([]);
    route.params.removeAllKeyword();
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
      removeAllKeyword();
      navigation.goBack();
    };
    dispatch(createKeywordFileAction(data, { callbackSuccess }));
  };
  const toggleModelSaveFile = () => {
    setShowModelSaveFile(!showModelSaveFile);
  };

  const onAddKeywordForProduct = () => {
    route.params.onAddKeywordForProduct(keywordListSaved);
    navigation.goBack();
  };

  const renderAction = () => {
    if (forProduct) {
      return (
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
      );
    } else {
      return (
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
            onPress={toggleModelSaveFile}
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
              Lưu tệp từ khóa
            </Text>
          </Button>
        </View>
      );
    }
  };

  const ToggleModalKeywordPrice = (item) => {
    setModalKeywordPrice(true)
    if (item) {
      setItemKeywordUpdate(item)
    }
    else {
      setItemKeywordUpdate(null)
    }
  }

  const onSubmitUpdateKeyword = (d) => {
    if (itemKeywordUpdate) {
      setKeywordListSaved(pre => {
        return pre.map(i => {
          if (i.keyword === itemKeywordUpdate) {
            return { ...i, shopee_price: Number(d.price) }
          } else {
            return { ...i }
          }
        })
      })
    }
    else {
      // setKeywordListSaved(pre => {
      //   return pre.map(i => {
      //     if (i.checked) {
      //       return { ...i, shopee_price: Number(d.price) }
      //     } else {
      //       return { ...i }
      //     }
      //   })
      // })
    }
  }

  const onSubmitUpdateKeywordMulti = (d) => {
    setKeywordListSaved(pre => {
      return pre.map(i => {
        if (i.checked) {
          return { ...i, shopee_price: Number(d.price), checked: false }
        } else {
          return { ...i }
        }
      })
    })
    setIsCheckAll(false)
  }

  const handleCheck = (keyword, value) => {
    const newData = keywordListSaved?.map(i => {
      if (i.keyword === keyword) {
        return { ...i, checked: value };
      }
      return { ...i };
    });
    setKeywordListSaved([...newData]);

  };

  const handleCheckAll = () => {
    if (isCheckAll) {
      const newData = keywordListSaved?.map(i => {
        return { ...i, checked: false };
      });
      setKeywordListSaved([...newData]);
      setIsCheckAll(!isCheckAll)
    } else {
      const newData = keywordListSaved?.map(i => {
        return { ...i, checked: true };
      });
      setKeywordListSaved([...newData]);
      setIsCheckAll(!isCheckAll)
    }

  };
  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Danh sách từ khóa đã chọn"
        navigation={navigation}
      />
      <Content>
        <View style={[styles.boxSection, { flex: 1 }]}>
          <Text
            style={{
              fontSize: 16,
              color: COLOR.primary,
              marginBottom: 10,
              fontWeight: 'bold',
            }}>
            Có {keywordListSaved.length} từ khóa
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <CheckBox
              style={{
                width: 22,
                height: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginRight: 20,
                marginLeft: 0,
                margin: 0,
              }}
              checked={isCheckAll}
              color={COLOR.primary}
              onPress={handleCheckAll}
            />
            <View style={{ flex: 1, padding: 3 }}>
              <TouchableOpacity
                disabled={!keywordListSaved.some(i => i.checked)}
                onPress={() => setModalKeywordPriceMulti(!modalKeywordPriceMulti)}
                style={{
                  backgroundColor: !keywordListSaved.some(i => i.checked) ? COLOR.greyLight : COLOR.primary,
                  padding: 5,
                  borderRadius: 3,
                  flex: 1,
                }}>
                <Text style={{ color: COLOR.white, textAlign: 'center' }}>
                  Chỉnh sửa hàng loạt
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <KeywordSaveList
            data={keywordListSaved}
            removeKeyword={removeKeyword}
            ToggleModalKeywordPrice={(item) => ToggleModalKeywordPrice(item)}
            handleCheck={handleCheck}
          />
          {/* <ListView data={productAdsList}/> */}
        </View>
      </Content>
      {keywordListSaved.length > 0 ? renderAction() : null}
      {showModelSaveFile && (
        <ModalSaveFile
          createKeywordFile={createKeywordFile}
          toggleModelSaveFile={toggleModelSaveFile}
        />
      )}
      <ModalUpdatePrice onSubmit={onSubmitUpdateKeyword} showModal={modalKeywordPrice} setShowModal={setModalKeywordPrice} />
      <ModalUpdatePrice onSubmit={onSubmitUpdateKeywordMulti} showModal={modalKeywordPriceMulti} setShowModal={() => setModalKeywordPriceMulti(!modalKeywordPriceMulti)} />
    </Container>
  );
};

export default DanhSachTuKhoaDaChonScreen;
