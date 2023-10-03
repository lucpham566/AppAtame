import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  BottomModalScrollable,
  BottomModalScrollableRef,
} from 'react-native-bottom-modal-scrollable';
import {Modalize} from 'react-native-modalize';

const ModalScrollBottom = prop => {
  const {modalizeRef} = prop;
    // const modalizeRef = useRef(null);
    // useEffect(() => {
    //   modalizeRef.current?.open();
    // }, []);

    // const onOpen = () => {
    //   modalizeRef.current?.open();
    // };

  return (
    <Modalize
      handlePosition="inside"
      scrollViewProps={{showsVerticalScrollIndicator: true}}
      snapPoint={300}
      ref={modalizeRef}>
      <Text>adfs</Text>
    </Modalize>
  );
};

export default ModalScrollBottom;
