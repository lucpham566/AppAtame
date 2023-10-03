import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { COLOR } from './../../../theme/color';
import { Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import OptionItem from './OptionItem';
import Icon from 'react-native-vector-icons/FontAwesome';

function ModalFilterKeyword({
  toggleModalFilter,
  dataKeyword,
  setKeywordList,
  showModalFilter,
}) {
  const initData = [
    {
      name: 'Lượt tìm kiếm',
      value: 'results',
    },
    {
      name: 'Tìm kiếm shopee',
      value: 'shopee_volume',
    },
    {
      name: 'Chi phí shopee',
      value: 'shopee_price',
    },
  ];
  const [data, setData] = useState([...initData]);

  var operator_table = {
    '>': function (a, b) {
      return a > b;
    },
    '<': function (a, b) {
      return a < b;
    },
    '=': function (a, b) {
      return a == b;
    },
  };

  const dispatch = useDispatch();

  const renderListOption = () => {
    return data?.map((item, index) => {
      return (
        <OptionItem
          item={item}
          key={index}
          toggleFilterList={toggleFilterList}
        />
      );
    });
  };

  const toggleModal = () => {
    toggleModalFilter();
  };

  const toggleFilterList = item => {
    setData(pre => {
      return pre.map(o => {
        if (o.value == item.value) {
          return { ...item };
        } else {
          return o;
        }
      });
    });
    // setFilterList(pre => {
    //   if (pre.find(i => i.value == item.value)) {
    //     return pre.map(o => {
    //       if (o.value == item.value) {
    //         return {...item};
    //       } else {
    //         return o;
    //       }
    //     });
    //   } else {
    //     return [...pre, item];
    //   }
    // });
  };

  const onSubmitFilter = () => {
    const filterList = data.filter(i => i.data);
    const checkFilter = keyword => {
      for (var i = 0; i < filterList.length; ++i) {
        if (
          !operator_table[filterList[i].bieuThuc](
            keyword[filterList[i].value],
            filterList[i].data,
          )
        ) {
          return false;
        }
      }
      return true;
    };

    let dataF = dataKeyword.filter(i => {
      return checkFilter(i);
    });

    setKeywordList([...dataF]);
    toggleModalFilter();
  };

  const onReset = () => {
    setData([...initData]);
    toggleModal();
    setKeywordList([...dataKeyword]);
  };

  return (
    <Modal
      isVisible={showModalFilter}
      onBackdropPress={() => {
        toggleModal();
      }}>
      <View style={styles.modalBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLOR.primary,
              textAlign: 'center',
              marginBottom: 5,
            }}>
            Bộ lọc
          </Text>
          <TouchableOpacity
            onPress={toggleModal}
            style={{ color: COLOR.secondary, flexDirection: 'row', backgroundColor: COLOR.primary, alignItems: 'center', paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={{ marginRight: 5, color: COLOR.white }}>Đóng</Text>
            <Icon name="times-circle" color={COLOR.white} size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView>{renderListOption()}</ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              borderRadius: 6,
              backgroundColor: '#DCDCDC',
            }}
            block
            onPress={onReset}>
            <Text style={{ color: COLOR.black, fontWeight: 'bold' }}>
              Reset dữ liệu
            </Text>
          </Button>
          <Button
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              borderRadius: 6,
              backgroundColor: COLOR.primary,
            }}
            block
            onPress={onSubmitFilter}>
            <Text style={{ color: COLOR.white, fontWeight: 'bold' }}>
              Xác nhận
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  shopItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: COLOR.greyLight,
    borderWidth: 1,
    borderRadius: 5,
  },
  shopActive: {
    borderColor: COLOR.success,
  },
});

export default ModalFilterKeyword;
