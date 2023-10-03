import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  BottomModalScrollable,
  BottomModalScrollableRef,
} from 'react-native-bottom-modal-scrollable';
import {Modalize} from 'react-native-modalize';

import Icon from 'react-native-vector-icons/FontAwesome';
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
import {COLOR} from '../../../theme';

const ModalSelectScrollBottom = prop => {
  const {modalizeRef, title} = prop;

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
    <Modalize
      handlePosition="inside"
      scrollViewProps={{showsVerticalScrollIndicator: true}}
      snapPoint={300}
      ref={modalizeRef}>
      <View style={styles.modalBox}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.primary,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        {/* <List>{renderListPicker}</List> */}
      </View>
    </Modalize>
  );
};

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

export default ModalSelectScrollBottom;
