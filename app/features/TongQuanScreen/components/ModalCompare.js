import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getShopReportCompare, removeShopReportCompare} from '../actions';
import RNPickerSelect from 'react-native-picker-select';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Button,
  ListItem,
  Left,
  Body,
  List,
} from 'native-base';

function ModalCompare(props) {
  const currentShop = useSelector(store => store.account.currentShop);
  const {optionFilterCompare, setOptionFilterCompare} = props;
  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const listOptionFilter = [
    {name: 'Hôm nay', value: 'real_time'},
    {name: 'Hôm qua', value: 'yesterday'},
    {name: '7 ngày vừa qua', value: 'past7days'},
    {name: '30 ngày vừa qua', value: 'past30days'},
  ];

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmit = time => {
    const data = {
      id: currentShop?._id,
      optionFilter: 'day',
      date: time.getDay(),
      month: time.getMonth(),
      year: time.getFullYear(),
    };
    dispatch(getShopReportCompare(data));
  };

  useEffect(() => {
    if (optionFilterCompare) {
      const data = {
        id: currentShop?._id,
        optionFilter: optionFilterCompare,
        date: null,
        month: null,
        year: null,
      };
      dispatch(getShopReportCompare(data));
    } else {
      dispatch(removeShopReportCompare());
    }
  }, [optionFilterCompare]);

  const renderListPicker = listOptionFilter.map((i, index) => {
    const srcImage = `../../../assets/image/calendar_` + 1 + `.png`;
    return (
      <ListItem
        key={index}
        style={{borderBottomColor: 'white'}}
        onPress={() => {
          setOptionFilterCompare(i.value);
          toggleModal();
        }}
        icon>
        <Left>
          <Button style={{backgroundColor: '#FF9501'}}>
            <Image
              style={{width: 20, height: 20, tintColor: COLOR.white}}
              source={require(srcImage)}
            />
          </Button>
        </Left>
        <Body>
          <Text>{i.name}</Text>
        </Body>
      </ListItem>
    );
  });

  return (
    <View>
      <Button
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 6,
          backgroundColor: optionFilterCompare ? COLOR.light : COLOR.primary,
          width: 160,
        }}
        block
        onPress={toggleModal}>
        {optionFilterCompare ? (
          <Image
            style={{width: 24, height: 24, marginRight: 10}}
            source={require('../../../assets/image/Compare.png')}
          />
        ) : null}
        <Text style={{color: optionFilterCompare ? COLOR.black : COLOR.white}}>
          Đối chiếu dữ liệu
        </Text>
      </Button>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalBox}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOR.primary,
              textAlign: 'center',
            }}>
            Đối chiếu dữ liệu
          </Text>
          <List>{renderListPicker}</List>

          <View style={{flexDirection: 'row'}}>
            <Button
              style={{
                flex: 1,
                margin: 10,
                padding: 10,
                borderRadius: 6,
                backgroundColor: '#DCDCDC',
              }}
              block
              onPress={toggleModal}>
              <Text style={{color: COLOR.black, fontWeight: 'bold'}}>Hủy</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );

  // return (
  //   <View style={{flex: 1}}>
  //     <Form>
  //       <View
  //         style={{
  //           padding: 0,
  //           borderRadius: 3,
  //         }}>
  //         <Picker
  //           style={{
  //             borderColor: COLOR.secondary,
  //             borderRadius: 3,
  //           }}
  //           mode="dialog"
  //           selectedValue={optionFilterCompare}
  //           onValueChange={setOptionFilterCompare}
  //           placeholder="Đối chiếu dữ liệu"
  //           placeholderStyle={{color: '#bfc6ea', fontSize: 20}}
  //           placeholderIconColor="#007aff">
  //           <Picker.Item
  //             style={{fontSize: 13, color: COLOR.grey}}
  //             label="Đối chiếu dữ liệu"
  //             value=""
  //           />
  //           <Picker.Item
  //             style={{fontSize: 13, color: COLOR.grey}}
  //             label="Ngày hôm qua"
  //             value="yesterday"
  //           />
  //           <Picker.Item
  //             style={{fontSize: 13, color: COLOR.grey}}
  //             label="7 ngày vừa qua"
  //             value="past7days"
  //           />
  //           <Picker.Item
  //             style={{fontSize: 13, color: COLOR.grey}}
  //             label="30 ngày vừa qua"
  //             value="past30days"
  //           />
  //         </Picker>
  //       </View>
  //     </Form>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 20,
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

export default ModalCompare;
